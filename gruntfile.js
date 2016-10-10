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
        dest: './dist/vendor/vendor.min.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './dist/vendor/vendor.min.css': ['./bower_components/material-design-lite/material.min.css'],
          './dist/assets/styles.min.css': ['./assets/styles.css']
        }
      }
    },
    imagemin: {
       dist: {
          options: {
            optimizationLevel: 7
          },
          files: [{
             expand: true,
             cwd: 'assets/images/',
             src: ['**/*.{png,jpg}'],
             dest: './dist/assets/images/'
          }]
       }
    },
    imageEmbed: {
      dist: {
        src: './dist/assets/styles.min.css',
        dest: './dist/assets/styles.min.css',
        options: {
          deleteAfterEncoding : true
        }
      }
    },
    inline: {
      dist: {
        src: './dist/index.html'
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
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          './dist/index.html': './index.html'
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
          { src: 'bower_components/angular-route/angular-route.min.js', dest: 'dist/vendor/angular-route.min.js' },
          { cwd: 'bower_components/font-awesome/', src: 'css/**', dest: 'dist/vendor/font-awesome/', expand: true},
          { cwd: 'bower_components/font-awesome/', src: 'fonts/**', dest: 'dist/vendor/font-awesome/', expand: true},
        ]
      }
    },
    watch: {
      index: {
        files: ['index.html'],
        tasks: ['htmlmin', 'imagemin', 'imageEmbed', 'inline']
      },
      ngtemplates: {
        files: ['<%= ngtemplates.dist.src %>'],
        tasks: ['ngtemplates', 'htmlmin', 'imagemin', 'imageEmbed', 'inline']
      },
      js: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['concat', 'uglify']
      },
      css: {
        files: ['./bower_components/material-design-lite/material.min.css', './assets/styles.css'],
        tasks: ['cssmin', 'htmlmin', 'imagemin', 'imageEmbed', 'inline']
      },
      images: {
        files: [
          'assets/images/**/*.{png,jpg}'
        ],
        tasks: ['imagemin', 'cssmin', 'htmlmin', 'imageEmbed', 'inline']
      },
      copy: {
        files: [
          'assets/app.js',
          'assets/files/**/*',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/font-awesome/css/**',
          'bower_components/font-awesome/fonts/**',
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-image-embed');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['ngtemplates', 'concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin', 'imageEmbed', 'inline', 'copy', 'connect', 'watch']);
  grunt.registerTask('deploy', ['ngtemplates', 'concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin', 'imageEmbed', 'inline', 'copy']);
};
