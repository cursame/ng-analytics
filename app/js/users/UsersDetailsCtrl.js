'use strict';

define( function () {
    return function ( $scope, $stateParams, $translate, Users, Logins, Courses ) {
        var start       = moment().startOf( 'week' ).toDate(),
            end         = moment().endOf( 'week' ).toDate(),
            months      = [
                $translate.instant( 'month.january' ),
                $translate.instant( 'month.february' ),
                $translate.instant( 'month.march' ),
                $translate.instant( 'month.april' ),
                $translate.instant( 'month.may' ),
                $translate.instant( 'month.june' ),
                $translate.instant( 'month.july' ),
                $translate.instant( 'month.august' ),
                $translate.instant( 'month.september' ),
                $translate.instant( 'month.october' ),
                $translate.instant( 'month.november' ),
                $translate.instant( 'month.december' )
            ],
            graph       = function () {
                Logins.query({
                    $and        : [
                        {
                            date        : {
                                $gte    : start
                            }
                        },
                        {
                            date        : {
                                $lte    : end
                            }
                        }
                    ],
                    aggregate   : 'date:day',
                    user        : $stateParams.id
                }).$promise.then( function ( data ) {
                    var date        = start,
                        k           = 1;
                    $scope.labels   = [];
                    $scope.data     = [ [] ];

                    for ( var  i = 0; i < 7; i++ ) {
                        var label   = ( i == 0 ) ? new Date( date.setDate( start.getDate() ) ) : new Date( date.setDate( start.getDate() + 1 ) ),
                            day     = label.getDate();
                        $scope.labels.push( day + ' ' + months[ label.getMonth() ] );

                        $scope.data[0][i]   = 0;
                        for ( var j = 0; j < data.length; j++ ) {
                            if ( day == data[j]._id ) {
                                $scope.data[0][i]   = data[j].count;
                                break;
                            }
                        }
                    }
                });
            };

        $scope.options  = {
            responsive          : true,
            barValueSpacing     : 7,
            barStrokeWidth      : 1
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

        $scope.$on( Users.getEvent( 'RETRIEVED' ), function () {
            switch ( $scope.user.type ) {
                case 1 :
                    $scope.courses      = Courses.query({
                        $and    : [
                            {
                                start       : {
                                    $lte    : moment().endOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    });
                    $scope.coursesLast  = Courses.query({
                        $and    : [
                            {
                                start       : {
                                    $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    });
                    break;
            }
        });
    };
});