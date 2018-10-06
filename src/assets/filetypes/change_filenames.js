const fs = require('fs');
const path = require('path');

const iconfinderRegex = /if_([a-z0-9]+)_[0-9]+(\.svg)/;

fs.readdir(__dirname, (err, files) => {
  if (err) {
    return;
  }

  const fileTypes = [];

  for (let file of files) {
    if (!/\.svg$/.test(file)) {
      continue;
    }
    if (iconfinderRegex.test(file)) {
      const newName = file.replace(iconfinderRegex, '$1$2');
      fs.rename(path.join(__dirname, file), path.join(__dirname, newName), err1 => err1 && console.log('Error while renaming file: ' + file, err1));
      file = newName;
    }
    fileTypes.push(file.replace(/^(.*)\.svg$/, '$1'));
  }

  fs.writeFileSync(path.join(__dirname, 'filetypes.json'), JSON.stringify(fileTypes));
});
