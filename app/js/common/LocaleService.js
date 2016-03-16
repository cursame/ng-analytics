'use strict';

define( function () {
    return function ( $translate, LOCALES, $rootScope, tmhDynamicLocale ) {
        var localesObj  = LOCALES.locales;

        var _LOCALES    = Object.keys( localesObj );
        if ( !_LOCALES || _LOCALES.length === 0 ) {
            console.error( 'There are no _LOCALES provided' );
        }
        var _LOCALES_DISPLAY_NAMES  = [];
        _LOCALES.forEach( function ( locale ) {
            _LOCALES_DISPLAY_NAMES.push( localesObj[ locale ] );
        });

        var currentLocale           = $translate.proposedLanguage();

        var checkLocaleIsValid      = function ( locale ) {
                return _LOCALES.indexOf( locale ) !== -1;
            },
            setLocale               = function ( locale ) {
                if ( !checkLocaleIsValid( locale ) ) {
                    console.error( 'Locale name "' + locale + '" is invalid' );
                    return;
                }
                currentLocale = locale;

                $translate.use( locale );
            };

        $rootScope.$on( '$translateChangeSuccess', function ( event, data ) {
            document.documentElement.setAttribute( 'lang', data.language );

            tmhDynamicLocale.set( data.language.toLowerCase().replace( /_/g, '-' ) );
        });

        return {
            getCurrent  : function () {
                return localesObj[ currentLocale ];
            },
            set         : function ( localeDisplayName ) {
                setLocale( _LOCALES[ _LOCALES_DISPLAY_NAMES.indexOf( localeDisplayName ) ] );
            },
            getLocales  : function () {
                return _LOCALES_DISPLAY_NAMES;
            }
        };
    };
});