import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';


function buildTemplate() {
  const templates = [
    'src/**/*.html'
  ];
  return gulp.src(templates)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('dist'));
}

gulp.task('template:build', buildTemplate);
