'use strict';

define( function () {
    return function ( $scope, $stateParams, Users ) {
        var start       = moment().startOf( 'week' ).toDate(),
            end         = moment().endOf( 'week' ).toDate(),
            graph       = function () {
                
            };

        $scope.user     = Users.get( $stateParams.id );
        $scope.dateOpts = {
            showWeeks   : false
        };

        $scope.$watch( 'date', function ( date ) {
            if ( date ) {
                start   = moment( $scope.date ).startOf( 'week' ).toDate();
                end     = moment( $scope.date ).endOf( 'week' ).toDate();
            }

            graph();
        });
    };
});