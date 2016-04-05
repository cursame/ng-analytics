'use strict';

define( function ( require ) {
    var QuestionariesService    = require( 'questionaries/QuestionariesService' );

    var QuestionariesModule     = angular.module( 'QuestionariesModule', []);

    QuestionariesModule.factory( 'QuestionariesService', [ 'BaseService', QuestionariesService ] );
});