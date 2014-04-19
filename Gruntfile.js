'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),  
    cssmin: {
      minify: {
        src: 'src/template/css/*.css',
        dest: 'src/template/main.css'
      }
    },

    concat: {
      dist: {
        src: ['src/lib/jquery.js', "src/template/js/prism.js", "src/template/js/hogan.min.js", 'src/lib/spine.js', 'src/lib/route.js', 'src/lib/manager.js'],
        dest: 'src/template/main.js'
      }
    },

    uglify: {
      build: {
        src: 'src/template/main.js',
        dest: 'src/template/main.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);

};
