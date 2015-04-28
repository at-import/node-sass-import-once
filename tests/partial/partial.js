'use strict';

var assert = require('assert'),
    sass = require('node-sass'),
    path = require('path'),
    fs = require('fs'),
    importer = require(path.join(__dirname, '..', '..', 'index'));

describe('partial', function () {
    var mydir = path.join(__dirname);
    it('should import files only once with partials', function (done) {
        var file = path.join(mydir, 'app.scss');
        var expected = fs.readFileSync(path.join(mydir, 'expected.css')).toString().trim();
        sass.render({
            'file': file,
            'importer': importer
        }, function (err, result) {
            if (err) {
                throw err;
            }
            assert.strictEqual(result.css.toString().trim(), expected);
            done();
        });
    });

    it('should import files only once without partials', function (done) {
        var file = path.join(mydir, 'app_wo_p.scss');
        var expected = fs.readFileSync(path.join(mydir, 'expected.css')).toString().trim();
        sass.render({
            'file': file,
            'importer': importer
        }, function (err, result) {
            if (err) {
                throw err;
            }
            assert.strictEqual(result.css.toString().trim(), expected);
            done();
        });
    });
});
