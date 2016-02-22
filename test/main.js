'use strict';

var should = require('should'),
    sass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    importer = require('../index');

var filePath = function (file) {
  return path.join(__dirname, 'sass', file);
};
var bowerPath = function (file) {
  return path.join(__dirname, '../bower_components', file);
};

describe('import-once', function () {
  it('should import files only once', function (done) {
    var file = filePath('basic-import-once.scss'),
        expectedIncludes = [
          file,
          filePath('_partial-with-selectors.scss'),
          'partial-with-selectors'
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/basic-import-once.css'), 'utf8')
      );
      done();
    });
  });

  it('should resolve import with Sass extensions', function(done) {
    var file = filePath('import-scss.scss'),
        expectedIncludes = [
          file,
          filePath('foo/_index.scss')
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-scss.css'), 'utf8')
      );
      done();
    });
  });

  it('should import `index` files from a folder', function (done) {
    var file = filePath('import-index.scss'),
        expectedIncludes = [
          file,
          filePath('foo/_index.scss')
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'index': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-index.css'), 'utf8')
      );
      done();
    });
  });

  it('should import `css` files as Sass from a folder', function (done) {
    var file = filePath('import-css.scss'),
        expectedIncludes = [
          file,
          filePath('imported-css.css')
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'css': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-css.css'), 'utf8')
      );
      done();
    });
  });

  it('should import `bower` files as Sass from a folder', function (done) {
    var file = filePath('import-bower.scss'),
        expectedIncludes = [
          file,
          bowerPath('breakpoint-sass/stylesheets/_breakpoint.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/_context.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/_helpers.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/_no-query.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/_parsers.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/_respond-to.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/_double.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/_query.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/_resolution.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/_single.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/_triple.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/double/_default-pair.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/double/_default.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/double/_double-string.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/resolution/_resolution.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/single/_default.scss'),
          bowerPath('breakpoint-sass/stylesheets/breakpoint/parsers/triple/_default.scss'),
          bowerPath('sass-toolkit/stylesheets/toolkit/_kickstart.scss')
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'bower': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-bower.css'), 'utf8')
      );
      done();
    });
  });

  it('should import JSON files as a Sass map', function (done) {
    var file = filePath('import-json.scss'),
        expectedIncludes = [
          file,
          filePath('colors.json')
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      // console.log(result.stats.includedFiles);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-json.css'), 'utf8')
      );
      done();
    });
  });

  it('should import YAML files as a Sass map', function (done) {
    var file = filePath('import-yaml.scss'),
        expectedIncludes = [
          file,
          filePath('colors.yaml')
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      // console.log(result.stats.includedFiles);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-json.css'), 'utf8')
      );
      done();
    });
  });

  it('should support custom include paths', function (done) {
    var file = filePath('import-custom.scss'),
        expectedIncludes = [
          file,
          filePath('../custom/_custom-import.scss'),
          'custom-import'
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'includePaths': [
        'test/custom'
      ]
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      // console.log(result.stats.includedFiles);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-custom.css'), 'utf8')
      );
      done();
    });
  });

  it('should import Bootstrap as Sass', function (done) {
    var file = filePath('import-bootstrap.scss'),
        expectedIncludes = [
          file,
          bowerPath('bootstrap/dist/css/bootstrap.css')
        ];

    sass.render({
      'file': file,
      'importer': importer,
      'importOnce': {
        'css': true,
        'bower': true
      }
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      // console.log(result.css.toString());
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/imported-bootstrap.css'), 'utf8')
      );
      done();
    });
  });

  it('should fall back to import paths and bower if data is passed in instead of a file name', function (done) {
    var file = filePath('basic-import-once.scss'),
        expectedIncludes = [
          filePath('_partial-with-selectors.scss'),
          'partial-with-selectors'
        ];

    sass.render({
      'data': fs.readFileSync(file, 'utf-8'),
      'importer': importer,
      'includePaths': [
        path.dirname(file)
      ]
    }, function (err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/basic-import-once.css'), 'utf8')
      );
      done();
    });
  });

  it('should import a file with dots in its name', function(done) {
    var file = filePath('import-with-dot.scss'),
        expectedIncludes = [
          file,
          filePath('file.with.dot.scss')
        ];

    sass.render({
      'file': file,
      'importer': importer
    }, function(err, result) {
      if (err) {
        throw err;
      }
      should.exist(result);
      result.stats.includedFiles.should.eql(expectedIncludes);
      String(result.css).should.equal(
        fs.readFileSync(path.join(__dirname, 'css/import-with-dot.css'), 'utf8')
      );
      done();
    });
  });
});
