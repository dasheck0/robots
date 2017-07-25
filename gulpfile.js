/**
 * Created by s.neidig on 11/07/17.
 */

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const getFolderSize = require('get-folder-size');
const imagemin = require('gulp-imagemin');

gulp.task('minifyAssets', () =>
    gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets2'))
);

gulp.task('copy', ['minify', 'transpile'], () => {
    const destination = '/Applications/MAMP/htdocs/dasheck-hackathon-phaser';
    const sources = ['dist', 'assets'].reverse();

    sources.forEach(source => copyFolderRecursiveSync(path.join(process.cwd(), source), destination));
    copyFileSync(path.join(process.cwd(), 'index.html'), destination);
});

gulp.task('open', () => {
    opn('http://localhost:8888/dasheck-hackathon-phaser');
});

gulp.task('minify', ['transpile'], (done) => {
    gulp.src('dist/**/*.js')
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true,
            preserveComments: () => false,
            ignoreFiles: ['phaser.js']
        }))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('calculateSize', ['minify', 'transpile'], (done) => {
    getFolderSize(path.join(process.cwd(), 'dist'), /phaser.js/g, (error, distSize) => {
        getFolderSize(path.join(process.cwd(), 'assets'), (error, assetsSize) => {
            console.log('Size:', ((distSize + assetsSize) / 1024.0).toFixed(2), 'KB');
            done();
        });
    });
});

gulp.task('transpile', () => {
    deleteFolderRecursive(path.join(process.cwd(), 'dist'));
    return gulp.src('js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('linkPhaser', ['minify'], () => {
    fs.mkdirSync(path.join(process.cwd(), 'dist/libs'));
    copyFileSync(path.join(process.cwd(), 'libs/phaser.js'), path.join(process.cwd(), 'dist/libs/phaser.js'));
});

function copyFileSync(source, target) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    //copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};