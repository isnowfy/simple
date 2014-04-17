'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),  
    cssmin: {
      minify: {
        src: 'src/template/*.css',
        dest: 'src/bin/main.min.css'
      }
    },

    concat: {
      dist: {
        src: ['src/template/prism.js', 'src/lib/jquery.js'],
        dest: 'src/bin/main.js'
      }
    },

    uglify: {
      build: {
        src: 'src/bin/main.js',
        dest: 'src/bin/main.min.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);

};
