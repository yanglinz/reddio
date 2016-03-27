import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';


const templates = [
  'src/**/*.html'
];

function buildTemplate() {
  return gulp.src(templates)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('dist'));
}

function watchTemplate() {
  return gulp.watch(templates, buildTemplate);
}

gulp.task('template:build', buildTemplate);
gulp.task('template:watch', watchTemplate);
