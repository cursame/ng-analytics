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
            .state( 'users.admins', {
                url         : '/admins',
                params      : {
                    type    : 3
                },
                views       : {
                    'users-content' : {
                        templateUrl : 'partials/users/list.html',
                        controller  : 'UsersListCtrl'
                    }
                }
            })
            .state( 'users.remove', {
                url         : '/remove/:id',
                views       : {
                    'users-content' : {
                        templateUrl : 'partials/users/remove.html',
                        controller  : 'UsersRemoveCtrl'
                    }
                }
            })
            .state( 'users.students', {
                url         : '/students',
                params      : {
                    type    : 2
                },
                views       : {
                    'users-content' : {
                        templateUrl : 'partials/users/list.html',
                        controller  : 'UsersListCtrl'
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