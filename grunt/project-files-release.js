
var _ = require('lodash');

var files = {

  addArea: function(name) {
    var area = {};

    area[name] = {
      js: name + '/' + name + '.min.js',
      jsSrc: [
        'src/' + name + '/' + name + '.js',
        'src/' + name + '/**/*.js',
        '!src/' + name + '/**/*.test.js'
      ],
      css: name + '/' + name + '.min.css',
      cssSrc: [
        'src/' + name + '/' + name + '.css',
        'src/' + name + '/**/*.css'
      ],
      test: [
        name + '/**/*.test.js'
      ],
      other: [
        name + '/**/*.png',
        name + '/**/*.jpg'
      ],
      html2js: [
        name + '/templates-' + name + '.js'
      ]
    };

    return _.extend(this, area);
  },

  vendor: {
    js: [
      'vendor/angular/angular.min.js',
      'vendor/angular-resource/angular-resource.min.js',
      'vendor/angular-route/angular-route.min.js',
      'vendor/lodash/dist/lodash.compat.min.js'
    ],
    test: [
      'vendor/jquery/jquery.js',
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-route/angular-route.js',
      'vendor/lodash/dist/lodash.compat.js',
      'vendor/angular-mocks/angular-mocks.js'
    ],
    css: [
      'vendor/bootstrap-css/css/bootstrap.min.css',
      'vendor/bootstrap-css/css/bootstrap-responsive.min.css'
    ],
    other: [
      'vendor/**/*.png',
      'vendor/**/*.jpg'
    ]
  }
};

module.exports = files;
