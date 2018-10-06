import { lstat, readdir } from 'fs';
import { join } from 'path';
import { File } from '@shared/models';
import * as prettyBytes from 'pretty-bytes';

const BLACKLISTED_FILES = ['Boot', '$RECYCLE.BIN', 'BOOTNXT'];

export function getDirContents(path: string): Promise<File[]> {
  return new Promise<File[]>((resolve, reject) => {
    readdir(path, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      if (files.length === 0) {
        resolve([]);
        return;
      }

      const filesWithStats: File[] = [];
      let counter = 0;
      files.forEach(file => {
        getFileWithStats(file, join(path, file)).then(fileStats => {
          filesWithStats.push(fileStats);
          if (++counter === files.length) {
            resolve(filesWithStats);
          }
        }).catch(() => {
          if (++counter === files.length) {
            resolve(filesWithStats);
          }
        });
      });
    });
  });
}

function getFileWithStats(fileName: string, fullPath: string): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    lstat(fullPath, ((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      // check if file has other permissions by windows (non 266 perms get excluded)
      if (/*(stats.mode & 0xb6) !== 0xb6 || */BLACKLISTED_FILES.some(blacklisted => fileName === blacklisted) || fileName.startsWith('$')) {
        reject(err);
        return;
      }

      // TODO add support for symbolic links
      if (stats.isSymbolicLink()) {
        reject(err);
        return;
      }

      const fileExtension = stats.isDirectory() ? '' : fileName.replace(/^.*\.([a-zA-Z0-9]+)$/, '$1');

      resolve({
        name: fileName,
        isDirectory: stats.isDirectory(),
        size: prettyBytes(stats.size),
        lastModified: stats.mtime,
        fileExtension,
        fullPath,
      });
    }));
  });
}
