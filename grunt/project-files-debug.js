
var _ = require('lodash');

var files = {

  addArea: function(name) {
    var area = {};

    area[name] = {
      js: [
        name + '/' + name + '.js',
        name + '/**/*.js',
        '!' + name + '/**/*.test.js'
      ],
      css: [
        name + '/' + name + '.css',
        name + '/**/*.css'
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
      'vendor/angular/angular.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-route/angular-route.js',
      'vendor/lodash/dist/lodash.compat.js'
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
      'vendor/bootstrap-css/css/bootstrap.css',
      'vendor/bootstrap-css/css/bootstrap-responsive.css'
    ],
    other: [
      'vendor/**/*.png',
      'vendor/**/*.jpg'
    ]
  }
};

module.exports = files;