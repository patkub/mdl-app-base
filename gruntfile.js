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
        dest: './dist/assets/vendor.min.js'
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
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>'],
          '<%= ngtemplates.dist.dest %>': ['<%= ngtemplates.dist.dest %>']
        }
      }
    },
    targethtml: {
      dist: {
        files: {
          './dist/index.html': 'index.html'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          './dist/index.html': './dist/index.html'
        }
      }
    },
    ngtemplates: {
        dist: {
            src: [
              'assets/templates/*.html',
              'assets/pages/*.html'
            ],
            dest: './dist/assets/templates.min.js',
            options: {
                module: 'ngTemplates',
                htmlmin: {
                  collapseBooleanAttributes: true,
                  collapseWhitespace: true,
                  removeAttributeQuotes: true,
                  removeComments: true,
                  removeEmptyAttributes: true,
                  removeRedundantAttributes: true,
                  removeScriptTypeAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                },
                standalone: true
            }
        }
    },
    copy: {
      main: {
        files: [
          { src: 'assets/app.js', dest: 'dist/' },
          { src: 'assets/images/**/*', dest: 'dist/' },
          { src: 'bower_components/angular-route/angular-route.min.js', dest: 'dist/' },
          { src: 'bower_components/font-awesome/**/*', dest: 'dist/' },
        ]
      }
    },
    watch: {
      html: {
        files: ['index.html'],
        tasks: ['targethtml']
      },
      code: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['concat', 'cssmin', 'uglify']
      },
      templates: {
        files: ['<%= ngtemplates.dist.src %>'],
        tasks: ['ngtemplates']
      },
      files: {
        files: [
          'assets/app.js',
          'assets/images/**/*',
        ],
        tasks: ['copy']
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
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['targethtml', 'htmlmin', 'ngtemplates', 'concat', 'cssmin', 'uglify', 'copy', 'connect', 'watch']);
  grunt.registerTask('deploy', ['targethtml', 'htmlmin', 'ngtemplates', 'concat', 'cssmin', 'uglify', 'copy']);
};
