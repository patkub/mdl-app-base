module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          './bower_components/material-design-lite/material.min.js',
          './bower_components/angular/angular.min.js'
        ],
        dest: 'dist/assets/vendor.min.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './dist/assets/vendor.min.css': ['./bower_components/material-design-lite/material.min.css'],
          './dist/assets/styles.min.css': ['./assets/styles.css']
        }
      }
    },
    uglify: {
      dist: {
        files: {
          './dist/assets/vendor.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      code: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['concat', 'cssmin', 'uglify']
      },
      files: {
        files: [
          'index.html.build',
          'assets/app.js',
          'assets/images/**/*',
          'assets/templates/*.*',
        ],
        tasks: ['copy']
      }
    },
    copy: {
      main: {
        files: [
          { src: 'index.html.build', dest: 'dist/index.html' },
          { src: 'assets/app.js', dest: 'dist/' },
          { src: 'assets/files/*.*', dest: 'dist/' },
          { src: 'assets/images/**/*', dest: 'dist/' },
          { src: 'assets/pages/*.*', dest: 'dist/' },
          { src: 'assets/templates/*.*', dest: 'dist/' },
          { src: 'bower_components/angular-route/angular-route.min.js', dest: 'dist/' },
          { src: 'bower_components/font-awesome/**/*', dest: 'dist/' },
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist/',
          hostname: '*'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'copy', 'connect', 'watch']);
  grunt.registerTask('deploy', ['concat', 'cssmin', 'uglify', 'copy']);
};
