
module.exports = function(grunt) {

  var target = grunt.option('target') || 'debug';
  var gruntTarget = require('./grunt/grunt-' + target);
  
  gruntTarget(grunt).addArea('app').initConfig();

};