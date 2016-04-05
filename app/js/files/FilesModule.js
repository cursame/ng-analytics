'use strict';

define( function ( require ) {
    var FilesService        = require( 'files/FilesService' );

    var FilesModule         = angular.module( 'FilesModule', []);

    FilesModule.factory( 'FilesService', [ 'BaseService', FilesService ] );
});