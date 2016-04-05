'use strict';

define( function () {
    return function ( BaseService ) {
        var DiscussionsService  = new BaseService( 'discussions' );

        return DiscussionsService;
    };
});