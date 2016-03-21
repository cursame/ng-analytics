'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'users', {
                parent  : 'dashboard',
                url     : 'users',
                views   : {
                    'main-container'    : {
                        templateUrl     : 'partials/users/base.html'
                    }
                }
            });
    };
});