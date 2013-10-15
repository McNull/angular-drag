var _ = require('lodash');

module.exports = function (grunt) {

  var gruntCommon = require('./grunt-common')(grunt);

  var gruntConfig = {
    html2js: {},
    ngmin: {},
    uglify: {},
    cssmin: {},
    copy: {
      vendor: {
        src: [
          '<%= files.vendor.js %>', '<%= files.vendor.css %>', '<%= files.vendor.other %>'
        ],
        dest: 'dist/'
      }
    }
  };

  var areas = [];

  return {
    addArea: function(name) {

      gruntCommon.addArea(name);
      areas.push(name);

      gruntConfig.html2js[name] = {
        src: ['src/' + name + '/**/*.tmpl.html'],
        dest: 'tmp/' + name + '/templates-app.js'
      };

      gruntConfig.ngmin[name] = {
        src: [ '<%= files.' + name + '.jsSrc %>' ],
        dest: 'tmp/' + name + '/' + name + '.ngmin.js'
      };

      gruntConfig.uglify[name] = {
        src: [ '<%= ngmin.' + name + '.dest %>', '<%= html2js.' + name + '.dest %>' ],
        dest: 'dist/<%= files.' + name + '.js %>'
      };

      gruntConfig.cssmin[name] = {
        src: [ '<%= files.' + name + '.cssSrc %>' ],
        dest: 'dist/<%= files.' + name + '.css %>'
      };
    
      gruntConfig.copy[name] = {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [ '<%= files.' + name + '.other %>' ],
            dest: 'dist/'
          }
        ]
      };

      return this;
    },

    registerTasks: function() {
      gruntCommon.registerTasks();

      grunt.loadNpmTasks('grunt-html2js');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-ngmin');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-cssmin');

      grunt.registerTask('vendor', [ 'clean:vendor', 'copy:vendor' ]);

      _.forEach(areas, function(area) {
        grunt.registerTask(area, [ 'clean:' + area, 'html2js:' + area, 'ngmin:' + area, 'uglify:' + area, 'cssmin:' + area, 'copy:' + area ]);
      });

      var buildTasks = [ 'clean:tmp', 'vendor', /* areas */ 'ejs', 'clean:postBuild', 'test' ];
      var args = [2, 0].concat(areas);
      Array.prototype.splice.apply(buildTasks, args);

      grunt.registerTask('build', buildTasks);
      grunt.registerTask('default', 'build');
    },

    getConfig: function() {
      var commonConfig = gruntCommon.getConfig();
      var result  = _.merge({}, commonConfig, gruntConfig);

      return result;
    },

    initConfig: function() {
      this.registerTasks();
      var config = this.getConfig();

      grunt.log.writeln('Applying grunt configuration ...');
      grunt.initConfig(config);
    }
  };
};