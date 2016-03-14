// Karma configuration
// Generated on Fri Mar 11 2016 09:23:45 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'es6-shim'],


    // list of files / patterns to load in the browser
    files: [
        "node_modules/es6-collections/es6-collections.js",
        "node_modules/angular/angular.js",
        "node_modules/angular-mocks/angular-mocks.js",
        "node_modules/angular-sanitize/angular-sanitize.js",
        "lib/angular_1_router.js",
        "components/**/*.js",
        "components/**/*.html",
        "spec/**/*.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "components/**/*.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
        // the name of the Angular module to create
        moduleName: "templates",
        cacheIdFromPath: function(filepath) {
            // example strips 'public/' from anywhere in the path
            // module(app/templates/template.html) => app/public/templates/template.html
            var cacheId = filepath + "?@@buildtime";
            return cacheId;
        },
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
