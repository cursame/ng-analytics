'use strict';

define( function ( require ) {
    var AlertDirective          = require( 'common/AlertDirective' );
    var BaseService             = require( 'common/BaseService' );
    var CommonConfig            = require( 'common/CommonConfig' );
    var CommonRun               = require( 'common/CommonRun' );
    var LocaleService           = require( 'common/LocaleService' );
    var RelativeDate            = require( 'common/RelativeDate' );
    var SignService             = require( 'common/SignService' );
    var StatsStudentsService    = require( 'common/StatsStudentsService' );
    var StatsTeachersService    = require( 'common/StatsTeachersService' );

    var CommonModule            = angular.module( 'CommonModule', [
            'pascalprecht.translate',
            'tmh.dynamicLocale',
        ]);

    CommonModule.config([ '$translateProvider', 'tmhDynamicLocaleProvider', CommonConfig ]);

    CommonModule.directive( 'alert', [ '$rootScope', '$timeout', 'events', AlertDirective ] );

    CommonModule.factory( 'BaseService', [ '$rootScope', '$resource', 'config', 'events', BaseService ] );

    CommonModule.factory( 'SignService', [ 'config', SignService ] );

    CommonModule.factory( 'StatsStudentsService', [ '$q', 'CoursesService', 'AssignmentsService', 'DiscussionsService', 'QuestionariesService', StatsStudentsService ] );

    CommonModule.factory( 'StatsTeachersService', [ '$q', 'CoursesService', 'AssignmentsService', 'DiscussionsService', 'CommentsService', 'QuestionariesService', 'FilesService', 'LoginsService', StatsTeachersService ] );

    CommonModule.filter( 'relativeDate', [ '$translate', RelativeDate ] );

    CommonModule.run([ '$rootScope', '$location', 'LocaleService', CommonRun ]);

    CommonModule.service( 'LocaleService', [ '$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale', LocaleService ] );

    CommonModule.constant( 'LOCALES', {
        'locales'           : {
            'en_us' : 'en',
            'es_mx' : 'es'
        },
        'preferredLocale'   : 'en_us'
    });
});