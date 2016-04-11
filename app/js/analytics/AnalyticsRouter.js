'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'analytics', {
                abstract    : true,
                parent      : 'dashboard',
                url         : 'analytics',
                views       : {
                    'main-container'    : {
                        templateUrl     : 'partials/analytics/base.html'
                    }
                }
            })
            .state( 'analytics.general', {
                url     : '/general'
            });
    };
});