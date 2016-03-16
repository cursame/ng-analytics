'use strict';

define( function () {
    return function ( $rootScope, Session ) {
        $rootScope.me   = Session.getUser();
    };
});