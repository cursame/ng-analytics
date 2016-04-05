'use strict';

define( function () {
    return function ( BaseService ) {
        var FilesService    = new BaseService( 'files' );

        return FilesService;
    };
});