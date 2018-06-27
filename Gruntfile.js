let banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

module.exports = function(grunt) {
  grunt.initConfig({
    // Package
    pkg: grunt.file.readJSON('package.json'),

    // Compass
    compass: {
      build: {
        options: {
          sassDir: 'assets/scss',
          cssDir: 'assets/css',
          outputStyle: 'expanded'
        }
      }
    },

    // Clean
    clean: {
      pre: ['styleguide', 'assets/css'],
      post: ['.sass-cache']
    },

    // Watch
    watch: {
      sass: {
        files: ['assets/scss/**/*.{sass,scss}'],
        tasks: ['compass', 'postcss'],
        options: {
          livereload: true
        }
      },
      javascript: {
        files: ['assets/js/**/*.js', 'assets/js/**/*.jsx', '!assets/js/**/*.min.js'],
        tasks: ['jshint', 'browserify:dist', 'uglify'],
        options: {
          livereload: true
        }
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      }
    },

    // PostCSS (autoprefixer, etc.)
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'assets/css/maps/'
        },

        processors: [require('pixrem')(), require('autoprefixer')({ browsers: 'last 2 versions' }), require('cssnano')({ zindex: false })]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    },

    uglify: {
      options: {
        banner: banner,
        compress: true,
        mangle: true,
        sourceMap: true
      },
      dist: {
        files: {
          // Example: 'assets/js/core.min.js': ['assets/js/core.js'],
          'assets/js/declaration.min.js': ['assets/js/declaration.js']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        esversion: 6
      },
      target: {
        src: ['assets/js/*.jsx', 'assets/js/*.js', '!assets/js/*.min.js', '!assets/js/vendors/*']
      }
    },

    browserify: {
      dist: {
        files: {
          // Example 'assets/js/core.js': 'assets/js/core.jsx',
        },
        options: {
          transform: [['babelify', { presets: ['es2015'] }]],
          browserifyOptions: {
            debug: true
          }
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register Grunt tasks
  grunt.registerTask('default', ['clean:pre', 'compass', 'postcss', 'jshint', 'browserify:dist', 'uglify', 'clean:post']);
};
