/* jscs:disable maximumLineLength */
/* eslint key-spacing: 0 */

module.exports = {
  paths: {
    src:          'src',
    dst:          'dst',
    build:        'build'
  },
  globs: {
    assets: {
      all:        'src/_assets/**',
      css:        'src/_assets/styles/**',
      img:        'src/_assets/images/**',
      js: [
                  'src/_assets/scripts/**',
                  '!src/_assets/scripts/**/__tests__/**'
      ],
      fonts:      'src/_assets/fonts/**'
    },
    vendor:       'src/_vendor/**',
    fixtures: {
      json:       'src/_fixtures/**/*.json',
      misc:       'src/_fixtures/**/!(*.json)'
    },
    msc: {
      all:        'src/**/+(*.xml|*.txt|*.ico|*.png)'
    },
    templates: {
      swig:       'src/**/*.swig',
      hbs:        'src/**/*.hbs'
    },
    build: {
      origin: {
        all:      'dst/**',
        MD5:      'dst/**/+(*.js|*.css|*.jpg|*.jpeg|*.png|*.gif|*.svg)',
        nonMD5:   'dst/**/!(*.js|*.css|*.jpg|*.jpeg|*.png|*.gif|*.svg)'
      },
      destination: {
        all:        'build/**',
        shortCache: 'build/**/+(*.html|favicon.ico|apple-touch-icon.png|apple-touch-icon-precomposed.png|robots.txt|sitemap.xml)',
        longCache:  'build/**/!(*.html|favicon.ico|apple-touch-icon.png|apple-touch-icon-precomposed.png|robots.txt|sitemap.xml)'
      }
    }
  }
};
