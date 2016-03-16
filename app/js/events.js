'use strict';

define( function () {
    var events  = angular.module( 'events', []);

    events.constant( 'events', {
        USERS_CREATED       : 'users.created',
        USERS_DELETED       : 'users.deleted',
        USERS_ERROR         : 'users.error',
        USERS_QUERIED       : 'users.queried',
        USERS_RETRIEVED     : 'users.retrieved'
    });
});