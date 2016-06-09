'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'administration', {
                abstract    : true,
                parent      : 'dashboard',
                url         : 'administration',
                views       : {
                    'main-container'    : {
                        templateUrl     : 'partials/admin/base.html'
                    }
                }
            })
            .state( 'administration.users', {
                url         : '/users'
            });
    };
});