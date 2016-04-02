import path from 'path';

import _ from 'lodash';
import FS from 'q-io/fs';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import RevAll from 'gulp-rev-all';

const MANIFEST = 'manifest.json';

function fingerprintAssets() {
  const dontHash = [
    'favicon.ico',
    'sitemap.xml',
    '.html',
    '.txt'
  ];
  const revAll = new RevAll({
    dontRenameFile: dontHash,
    dontUpdateReference: dontHash,
    fileNameManifest: MANIFEST
  });
  return gulp.src('dist/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('dist'));
}

function deleteOriginals(done) {
  const projectRoot = path.resolve(__dirname, '../..');
  const manifestPath = path.resolve(projectRoot, `dist/${MANIFEST}`);
  return FS.read(manifestPath)
    .then(JSON.parse)
    .then(manifest => {
      const revPaths = _.chain(manifest)
        .toPairs()
        .filter(([original, rev]) => original !== rev)
        .map(_.head)
        .map(original => path.join('dist', original))
        .value();
      return del(revPaths).then(deletedPaths => {
        _.each(deletedPaths, (deletedPath) => {
          gutil.log(gutil.colors.red('Deleted'), deletedPath);
        });
      });
    })
    .then(done);
}

gulp.task('fingerprint:rev', fingerprintAssets);
gulp.task('fingerprint:clean', deleteOriginals);
