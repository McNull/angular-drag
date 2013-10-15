var _ = require('lodash');

module.exports = function (grunt) {

  var gruntCommon = require('./grunt-common')(grunt);

  var gruntConfig = {
    copy: {
      vendor: {
        src: [
          '<%= files.vendor.js %>',
          '<%= files.vendor.css %>',
          '<%= files.vendor.other %>'
        ],
        dest: 'dist/'
      }
    },
    html2js: {}
  };

  var areas = [];

  return {
    addArea: function(name) {

      gruntCommon.addArea(name);

      areas.push(name);

      gruntConfig.html2js[name] = {
        src: ['src/' + name + '/**/*.tmpl.html'],
        dest: 'dist/' + name + '/templates-app.js'
      };

      gruntConfig.copy[name] = {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              '<%= files.' + name + '.js %>',
              '<%= files.' + name + '.css %>',
              '<%= files.' + name + '.other %>',
              '!<%= files.' + name + '.test %>'
            ],
            dest: 'dist/'
          }
        ]
      };

      return this;
    },
    registerTasks: function() {

      gruntCommon.registerTasks();

      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-html2js');    

      grunt.registerTask('vendor', [ 'clean:vendor', 'copy:vendor' ]);

      _.forEach(areas, function(area) {
        grunt.registerTask(area, [ 'clean:' + area, 'html2js:' + area, 'copy:' + area ]);
      });

      var buildTasks = [ 'vendor', 'ejs', 'clean:postBuild' ];
      var args = [1, 0].concat(areas);
      Array.prototype.splice.apply(buildTasks, args);

      grunt.registerTask('build', buildTasks);
      grunt.registerTask('default', 'build');

      return this;
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