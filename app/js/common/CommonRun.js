'use strict';

define( function () {
    return function ( $rootScope, $location, LocaleService ) {
        $rootScope.$translation     = LocaleService;

        $rootScope.$on( '$locationChangeStart', function () {
            var search  = $location.search();

            if ( search.lang && ( search.lang == 'es' || search.lang == 'en' ) ) {
                LocaleService.set( search.lang );
            }
        });
    };
});