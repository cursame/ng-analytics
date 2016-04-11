'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'analytics', {
                parent  : 'dashboard',
                url     : 'analytics',
                views   : {
                    'main-container'    : {
                        templateUrl     : 'partials/analytics/base.html'
                    }
                }
            });
    };
});