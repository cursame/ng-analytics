'use strict';

define( function () {
    return function ( BaseService ) {
        var ActivitiesService   = new BaseService( 'activities' );

        return ActivitiesService;
    };
});