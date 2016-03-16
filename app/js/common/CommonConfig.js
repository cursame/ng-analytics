'use strict';

define( function () {
    return function ( $translateProvider, tmhDynamicLocaleProvider ) {
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useStaticFilesLoader({
            prefix  : 'resources/locale-',
            suffix  : '.json'
        });
        $translateProvider.preferredLanguage( 'en_us' );
        $translateProvider.useLocalStorage();

        tmhDynamicLocaleProvider.localeLocationPattern( 'bower_components/angular-i18n/angular-locale_{{locale}}.js' );
    };
});