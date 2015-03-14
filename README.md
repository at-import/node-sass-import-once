# Import Once

[Eyeglass](https://github.com/sass-eyeglass/eyeglass) importer for generally working with Node Sass.

## Installation

```bash
$ npm install node-sass-import-once --save-dev
```

**Requires [Node Sass](https://github.com/sass/node-sass) >= v2.0.0**

## Usage

```javascript
var sass = require('node-sass');,
    importOnce = require('node-sass-import-once');

sass.render({
  file: scss_filename,
  importer: importOnce
});
```

If you are using Gulp or Grunt to compile (or similiar), require `node-sass-import-once` as normal and pass it as the `importer` option in to your task.

## Features

* All imports will only be imported once (this means everything can declare its own dependencies! Yay!)
* Folders can contain an index file (`index.scss`, `index.sass`, `_index.scss`, `_index.sass`) that will automatically be imported if just the folder name is imported. For instance, `@import 'partials';` will try and import `(_)partials.s(c|a)ss` first, then `partials/(_)index.s(c|a)ss`.
