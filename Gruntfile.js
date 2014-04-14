'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),  
    cssmin: {
      minify: {
        src: ['src/template/*.css'],
        dest: 'src/bin/main.min.css'
      }
    },

    uglify: {
      build: {
        src: 'src/template/*.js',
        dest: 'src/bin/main.min.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['cssmin', 'uglify']);

};
