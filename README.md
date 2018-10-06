# FileExplorer

A file-explorer for windows with many great extensions (coming soon...) and an Linux/Mac like experience.

**Note**: This program is currently only for Windows since I'm using Windows related commands like `wmic` etc.

## Setup

Simply run `npm install` or `yarn`

## Development

I'd recommend to run `yarn start` or `npm start` and then run electron via `yarn electron` or `npm run electron`
so you can restart electron independently from Angular and use the hot-module replacement from Angular.

`client` contains all the electron/browser related files
`src` contains all the Angular/renderer related files
`shared` contains some models etc. that needs to be shared between browser/renderer

## Building

Just run `yarn build-electron` or `npm run build-electron`.

## Todo

* Create context menu for files
* Add search bar to search folders / files
* Add a terminal (Git Bash / Powershell / Windows Shell)
* Add SFTP option to copy files from / to remote servers

Maybe in some later version: Add support for other OS

## Credits

I'm currently using the file icons made by [Honza Dousek](https://www.iconfinder.com/iconsets/lexter-flat-colorfull-file-formats).
