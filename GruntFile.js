module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
        all: [
            'Gruntfile.js',
            'test/**/*.js',
            'app.js'
        ],
        options: {
            jshintrc: true
        }
    },
    jscs: {
        all: [
            'Gruntfile.js',
            'test/**/*.js',
            'app.js'
        ],
        options: {
            config: '.jscs.json'
        }
    }
  });

  
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jscs']);

};