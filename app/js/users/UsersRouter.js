'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'users', {
                abstract    : true,
                parent      : 'dashboard',
                url         : 'users',
                views       : {
                    'main-container'    : {
                        templateUrl     : 'partials/users/base.html'
                    }
                }
            })
            .state( 'users.teachers', {
                url         : '/teachers',
                params      : {
                    type    : 1
                },
                views       : {
                    'users-content' : {
                        templateUrl : 'partials/users/list.html',
                        controller  : 'UsersListCtrl'
                    }
                }
            });
    };
});