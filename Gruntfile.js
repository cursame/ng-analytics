'use strict';

module.exports  = function ( grunt ) {

    var appConfig   = {
            app         : 'app',
            dist        : 'dist',
            livereload  : 35729
        },
        serveStatic = require( 'serve-static' );

    require( 'load-grunt-tasks' )( grunt );
    require( 'time-grunt' )( grunt );

    grunt.initConfig({
        config                  : appConfig,
        cdnify                  : {
            dist    : {
                html    : '<%= config.dist %>/*.html'
            }
        },
        concurrent              : {
            dist    : [
                'less',
                'imagemin',
                'svgmin'
            ],
            server  : [
                'less'
            ]
        },
        connect                 : {
            options : {
                port            : 9000,
                hostname        : 'localhost',
                livereload      : '<%= config.livereload %>'
            },
            dev     : {
                options         : {
                    open        : true,
                    middleware  : function ( connect ) {
                        return [
                            connect().use( '/bower_components', serveStatic( './bower_components' ) ),
                            connect().use( '/fonts', serveStatic( './bower_components/bootstrap/fonts' ) ),
                            serveStatic( appConfig.app )
                        ];
                    }
                }
            },
            test    : {
                options         : {
                    port        : 9001,
                    middleware  : function ( connect ) {
                        return [
                            connect().use( '/bower_components', serveStatic( './bower_components' ) ),
                            connect().use( '/js', serveStatic( 'instrumented/app/js' ) ),
                            serveStatic( appConfig.app )
                        ];
                    }
                }
            }
        },
        copy                    : {
            dist    : {
                files   : [{
                    expand  : true,
                    dot     : true,
                    cwd     : '<%= config.app %>',
                    dest    : '<%= config.dist %>',
                    src     : [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'partials/{,*/}*.html',
                        'resources/{,*/}*.json',
                        'img/{,*/}*.{webp}',
                        'css/{,*/}*.css',
                        'js/crypto.js',
                        'data/{,*/}*.*',
                        'CNAME'
                    ]
                }, {
                    expand  : true,
                    flatten : true,
                    cwd     : '.',
                    src     : 'bower_components/bootstrap/fonts/*',
                    dest    : '<%= config.dist %>/fonts'
                }, {
                    expand  : true,
                    cwd     : '.',
                    src     : 'bower_components/requirejs/require.js',
                    dest    : '<%= config.dist %>'
                }, {
                    expand  : true,
                    cwd     : '.',
                    src     : [
                        'bower_components/angular-i18n/angular-locale_en-us.js',
                        'bower_components/angular-i18n/angular-locale_es-mx.js'
                    ],
                    dest    : '<%= config.dist %>'
                }]
            }
        },
        coveralls               : {
            options : {
                force   : true
            },
            target  : {
                src     : 'test/reports/lcov.info'
            }
        },
        clean                   : {
            dist: {
                files: [{
                    dot : true,
                    src : [
                        '.tmp',
                        '<%= config.dist %>/{,*/}*',
                        '!<%= config.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server  : [
                '.tmp',
                '<%= config.app %>/css',
                'instrumented',
                'test/coverage',
                'test/reports'
            ]
        },
        eslint                  : {
            src     : [
                'Gruntfile.js',
                '<%= config.app %>/js/{,*/}*.js',
                '!<%= config.app %>/js/lib/*.js'
            ]
        },
        filerev                 : {
            dist    : {
                src : [
                    '<%= config.dist %>/js/crypto.js',
                    '<%= config.dist %>/js/vendor.js',
                    '<%= config.dist %>/css/{,*/}*.css',
                    '<%= config.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        htmlmin                 : {
            dist    : {
                options: {
                    collapseWhitespace          : true,
                    conservativeCollapse        : true,
                    collapseBooleanAttributes   : true,
                    removeCommentsFromCDATA     : true,
                    removeOptionalTags          : true
                },
                files   : [{
                    expand  : true,
                    cwd     : '<%= config.dist %>',
                    src     : [
                        '*.html',
                        'partials/{,*/}*.html'
                    ],
                    dest    : '<%= config.dist %>'
                }]
            }
        },
        imagemin                : {
            dist    : {
                files   : [{
                    expand  : true,
                    cwd     : '<%= config.app %>/img',
                    src     : '{,*/}*.{png,jpg,jpeg,gif}',
                    dest    : '<%= config.dist %>/img'
                }]
            }
        },
        instrument              : {
            files   : [
                '<%= config.app %>/js/**/*.js',
                '!<%= config.app %>/js/lib/*.js'
            ],
            options : {
                lazy        : true,
                basePath    : 'instrumented'
            }
        },
        less                    : {
            development : {
                options : {
                    compress        : true,
                    yuicompress     : true,
                    optimization    : 2
                },
                files   : {
                    '<%= config.app %>/css/style.css'   : '<%= config.app %>/less/style.less'
                }
            }
        },
        makeReport              : {
            src     : 'test/coverage/**/*.json',
            options : {
                type    : 'lcov',
                dir     : 'test/reports',
                print   : 'detail'
            }
        },
        ngAnnotate              : {
            dist    : {
                files   : [{
                    expand  : true,
                    cwd     : '.tmp/concat/scripts',
                    src     : ['*.js', '!oldieshim.js'],
                    dest    : '.tmp/concat/scripts'
                }]
            }
        },
        postcss                 : {
            options : {
                map         : false,
                processors  : [
                    require( 'autoprefixer' )({
                        browsers    : 'last 8 versions'
                    })
                ]
            },
            dist    : {
                src : '<%= config.app %>/css/*.css'
            }
        },
        protractorCoverage      : {
            options     : {
                configFile  : 'test/protractor.conf.js',
                noColor     : false,
                coverageDir : 'test/coverage',
                args        : {
                    browser : 'firefox'
                }
            },
            test        : {
                options : {
                    configFile  : 'test/protractor.conf.js',
                    args        : {}
                }
            }
        },
        protractorWebdriver     : {
            test    : {
                path    : 'node_modules/protractor/bin/',
                command : 'webdriver-manager start'
            }
        },
        requirejs               : {
            compile : {
                options : {
                    baseUrl                 : '<%= config.app %>/js',
                    mainConfigFile          : '<%= config.app %>/js/main.js',
                    name                    : 'main',
                    out                     : '<%= config.dist %>/js/main.js',
                    preserveLicenseComments : false,
                    removeCombined          : true
                }
            }
        },
        svgmin                  : {
            dist    : {
                files   : [{
                    expand  : true,
                    cwd     : '<%= config.app %>/img',
                    src     : '{,*/}*.svg',
                    dest    : '<%= config.dist %>/img'
                }]
            }
        },
        usemin                  : {
            html    : [
                '<%= config.dist %>/{,*/}*.html',
                '<%= config.dist %>/partials/{,*/}*.html'
            ],
            css     : [
                '<%= config.dist %>/css/{,*/}*.css'
            ],
            options : {
                assetsDirs  : [
                    '<%= config.dist %>',
                    '<%= config.dist %>/img',
                    '<%= config.dist %>/css'
                ]
            }
        },
        useminPrepare           : {
            html    : '<%= config.app %>/index.html',
            options : {
                dest    : '<%= config.dist %>',
                flow    : {
                    html: {
                        steps   : {
                            js  : ['concat', 'uglify'],
                            css : ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        watch                   : {
            styles      : {
                files   : [ '<%= config.app %>/less/**/*.less' ],
                tasks   : [ 'less', 'postcss' ],
                options : {
                    spawn       : false,
                    livereload  : '<%= config.livereload %>'
                }
            },
            js          : {
                files   : [ '<%= config.app %>/js/**/*.js' ],
                options : {
                    spawn       : false,
                    livereload  : '<%= config.livereload %>'
                }
            },
            livereload  : {
                options : {
                    livereload  : '<%= config.livereload %>'
                },
                files   : [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/partials/{,*/}*.html',
                    '<%= config.app %>/resources/{,*/}*.json'
                ]
            }
        },
        wiredep                 : {
            app : {
                src         : [ '<%= config.app %>/index.html' ],
                exclude     : [ 'require.js' ],
                ignorePath  :  /\.\.\//
            }
        }
    });

    grunt.task.renameTask( 'protractor_coverage', 'protractorCoverage' );
    grunt.task.renameTask( 'protractor_webdriver', 'protractorWebdriver' );
    grunt.loadNpmTasks( 'gruntify-eslint' );

    grunt.registerTask( 'build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'concat',
        'ngAnnotate',
        'requirejs',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
    grunt.registerTask( 'report', [
        'coveralls'
    ]);
    grunt.registerTask( 'serve', [
        'clean:server',
        'wiredep',
        'concurrent:server',
        'postcss',
        'connect:dev',
        'watch'
    ]);
    grunt.registerTask( 'test', [
        'clean:server',
        'eslint',
        'wiredep',
        'concurrent:server',
        'postcss',
        'instrument',
        'connect:test',
        'protractorWebdriver:test',
        'protractorCoverage:test',
        'makeReport'
    ]);
};