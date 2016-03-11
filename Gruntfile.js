var _ = require('lodash');
module.exports = function(grunt) {
  var distLibPath = 'dist/lib/';
  var defaultFilesObj = {expand: true, dest: distLibPath, filter: 'isFile'};
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distInfo: grunt.file.readJSON('distInfo.json'),
    concurrent: {
      default: {
        tasks: ['watch:css', 'watch:bootstrap', 'connect'],
        options: {
            logConcurrentOutput: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3030,
          keepalive: true
        }
      }
    },
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
        files: ['static/**/*.scss'],
        tasks: ['sass']
      },
      bootstrap: {
        files: ['static/css/_variables.scss'],
        tasks: ['compileBootstrap']
      }
    },
    copy: {
      bootstrapIn: {
        files: [
          {expand: true, cwd:'static/css/', src: ['_variables.scss'], dest: 'node_modules/bootstrap/scss/', filter: 'isFile'}
        ]
      },
      bootstrapOut: {
        files: [
          {expand: true, cwd:'node_modules/bootstrap/dist/', src: ['**/*'], dest: 'lib/bootstrap/dist/', filter: 'isFile'}
        ]
      },
      dist: {
        files: [
          {expand: true, cwd:'node_modules/', src: [], dest: 'dist/lib', filter: 'isFile'},
          {expand: true, cwd:'', src: ['components/**/*','static/**/*','lib/**/*', 'index.html', 'favicon.ico'], dest: 'dist/', filter: 'isFile'}
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
    },
    sshexec: {
      fixPermission: {
        command: 'cd <%= distInfo.destination %>; npm install --production',
        options: {
          host: '<%= distInfo.host %>',
          username: '<%= distInfo.username %>',
          agent: process.env.SSH_AUTH_SOCK
        }
      }
    },
    rsync: {
      options: {
        args: ["-avz"],
        exclude: [".*","*.scss","spec","node_modules","Gruntfile.js","karma.config.js"],
        recursive: true
      },
      deploy: {
        options: {
          src: "./",
          dest: "<%= distInfo.destination %>",
          host: "<%= distInfo.username %>@<%= distInfo.host %>"
          //delete: true // Careful this option could cause data loss, read the docs!
        }
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  /*
  grunt.registerTask('findDependencies', 'A task for finding dependencies', function() {
    var text = grunt.file.read('index.html');
    var filePaths = text.match(/\"(node_modules\/.+)\"/g);
    var files = [];
    for (var i in filePaths) {
      var file = filePaths[i];
      files.push(file.replace(/\"/g,"").replace("node_modules/",""));
    }
    grunt.config.set('copy.dist.files.src',files);
  });
  */
  grunt.registerTask('dist',['rsync','sshexec']);
  grunt.registerTask('compileBootstrap',['auto_install:bootstrap','copy:bootstrapIn','grunt:bootstrap','copy:bootstrapOut'])
  grunt.registerTask('default',['concurrent:default']);
}
