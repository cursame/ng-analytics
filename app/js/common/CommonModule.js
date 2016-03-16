'use strict';

define( function ( require ) {
    var CommonConfig    = require( 'common/CommonConfig' );
    var CommonRun       = require( 'common/CommonRun' );
    var LocaleService   = require( 'common/LocaleService' );

    var CommonModule    = angular.module( 'CommonModule', [
            'pascalprecht.translate',
            'tmh.dynamicLocale',
        ]);

    CommonModule.config([ '$translateProvider', 'tmhDynamicLocaleProvider', CommonConfig ]);

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