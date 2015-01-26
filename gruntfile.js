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
    // Watches for changes to the specified files and executes the build task below 
    watch: {
      files: ['<%= jshint.files %>', 'src/**/*.html'],
      tasks: ['build']
    }, 
    // Concatenates all the .js files into one for the /dist
    concat: {
      build: {
        src: ['src/app.js', 'src/**/*.js'],
        dest: 'dist/debt-calculator.js'
      }
    },
    // Move all the .html files from /src to /dist
    copy: {
      build: {
        src: '**/*.html',
        dest: 'dist/',
        expand: true,
        cwd: 'src/'
      }
    },
    express: {
      server: {
        options: {
          port: 1337,
          bases: ['dist']
        }
      }
    }
  }); 

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-express'); 

  grunt.registerTask('build', ['jshint', 'concat:build', 'copy:build']);
  grunt.registerTask('startup', ['express', 'express-keepalive']);
};
