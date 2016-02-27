module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'static/css/app.css' : 'static/css/app.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    copy: {
      bootstrap: {
        files: [
          {expand: true, src: ['_variables.scss'], dest: 'node_modules/bootstrap/scss/', filter: 'isFile'}
        ]
      }
    },
    auto_install: {
      bootstrap: {
        options: {
          cwd: 'node_modules/bootstrap',
          stdout: true,
          stderr: true,
          failOnError: true,
          npm: ''
        }
      }
    },
    grunt: {
      bootstrap: {
        gruntfile: 'node_modules/bootstrap/Gruntfile.js',
        task: 'dist-css'
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('compileBootstrap',['auto_install:bootstrap','copy:bootstrap','grunt:bootstrap'])
  grunt.registerTask('default',['watch']);
}