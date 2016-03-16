'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'dashboard', {
                resolve     : {
                    loginRequired   : [ '$q', '$state', '$timeout', 'SessionsService', function ( $q, $state, $timeout, Sessions ) {
                        if ( !Sessions.isLoggedIn() ) {
                            $timeout( function () {
                                $state.go( 'login' );
                            });
                            return $q.reject( 'User not logged in!' );
                        }
                    }]
                },
                url         : '/',
                views       : {
                    'main-view'     : {
                        templateUrl : 'partials/base.html',
                        controller  : 'DashboardBaseCtrl'
                    }
                }
            });
    };
});