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
            .state( 'administration.create', {
                url         : '/create',
                views       : {
                    'admin-content' : {
                        templateUrl : 'partials/admin/create.html',
                        controller  : 'AdminCreateCtrl'
                    }
                }
            })
            .state( 'administration.users', {
                url         : '/users',
                views       : {
                    'admin-content' : {
                        templateUrl : 'partials/admin/users.html',
                        controller  : 'AdminUsersCtrl'
                    }
                }
            });
    };
});