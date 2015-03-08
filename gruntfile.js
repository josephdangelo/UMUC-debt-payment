/*
  gruntfile.js

  Purpose: Registers the grunt tasks used on this project 
*/
module.exports = function(grunt) {

  grunt.initConfig({
    // Lint all the .js files, plus this one
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      // Watches for changes to any .js or .html file and runs the build task
      files: ['<%= jshint.files %>', 'src/**/*.html', 'src/**/*.css'],
      tasks: ['build']
    }, 
    concat: {
      options: {
        banner: "(function () {\n'use strict';\n",
        footer: "\n})();",
        stripBanners: true
      },
      // Concatenates all the .js files into one for the /dist
      build: {
        src: ['src/app.js', 'src/**/*.js'],
        dest: 'dist/debt-calculator.js'
      }
    },
    copy: {
      // Move all the non .js files from /src to /dist
      build: {
        src: ['!**/*.js','**/*'],
        dest: 'dist/',
        expand: true,
        cwd: 'src/'
      }
    },
    // Spawns a NodeJS Express webserver on port 1337 using /dist as the context
    express: {
      server: {
        options: {
          port: 1337,
          bases: ['dist']
        }
      }
    },
    // Removes all contents of the /dist for a clean build
    clean: {
      build: [ 'dist/ ']
    },
    // Generates application documentation
    ngdocs: {
      options: {
        dest: 'dist/docs',
        html5Mode: true,
        startPage: '/api',
        title: "Debt Repayment Calculator",
        titleLink: "/docs/api",
        bestMatch: true,
        editLink: false,
        sourceLink: false
      },
      api: {
        src: ['src/**/*.js', '!src/**/*.spec.js'],
        title: 'API Documentation'
      }
    }
  }); 

  // Register the required grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-clean'); 
  grunt.loadNpmTasks('grunt-express'); 
  grunt.loadNpmTasks('grunt-ngdocs'); 

  // Used to build the app
  grunt.registerTask('build', ['jshint', 'clean:build', 'copy:build', 'concat:build', 'ngdocs']);
  // Starts the webserver
  grunt.registerTask('startup', ['express', 'express-keepalive']);
};
