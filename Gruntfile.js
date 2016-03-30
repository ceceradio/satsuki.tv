var _ = require('lodash');
var serveStatic = require('serve-static');
var buildtime = Date.now();
if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}
module.exports = function(grunt) {
  var distLibPath = 'dist/lib/';
  var defaultFilesObj = {expand: true, dest: distLibPath, filter: 'isFile'};
  var distInfo = {};
  if (grunt.file.exists('distInfo.json')) {
    distInfo = grunt.file.readJSON('distInfo.json');
  }
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distInfo: distInfo,
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
          keepalive: true,
          middleware: function (connect, options) {
            var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
            return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
              optBase.map(function(path){ return serveStatic(path); }));
          }
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
          {expand: true, cwd:'', src: ["components/**/*", "static/**/*", "lib/**/*", "index.html", "package.json", ".htaccess" ], dest: 'dist/', filter: 'isFile'},
        ],
        options: {
          noProcess: ['**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}'],
          process: function (content, srcpath) {
            if (srcpath.endsWith(".html") || srcpath.endsWith(".js")) {
              return content.replace(/\@\@buildtime/g,buildtime);
            }
            return content;
          }
        }
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
        exclude: [".git*",".sass*",".travis*","*.DS_Store","*.scss","spec","node_modules","Gruntfile.js","karma.config.js"],
        recursive: true
      },
      deploy: {
        options: {
          src: "./dist/",
          dest: "<%= distInfo.destination %>",
          host: "<%= distInfo.username %>@<%= distInfo.host %>"
          //delete: true // Careful this option could cause data loss, read the docs!
        }
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('dist',['copy:dist','rsync','sshexec']);
  grunt.registerTask('compileBootstrap',['auto_install:bootstrap','copy:bootstrapIn','grunt:bootstrap','copy:bootstrapOut'])
  grunt.registerTask('default',['concurrent:default']);
}
