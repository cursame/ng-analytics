'use strict';

define( function () {
    return function ( BaseService ) {
        var QuestionariesService    = new BaseService( 'questionaries' );

        return QuestionariesService;
    };
});