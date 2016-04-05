'use strict';

define( function () {
    return function ( $scope, $stateParams, $translate, events, Users, Logins, Activities, Courses, Assignments, Discussions, Comments, Questionaries, Files ) {
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

        $scope.options          = {
            responsive          : true,
            barValueSpacing     : 7,
            barStrokeWidth      : 1
        };
        $scope.user             = Users.get( $stateParams.id );
        $scope.dateOpts         = {
            showWeeks   : false
        };
        $scope.page             = 1;
        $scope.per_page         = 10;

        $scope.$watch( 'date', function ( date ) {
            if ( date ) {
                start   = moment( $scope.date ).startOf( 'week' ).toDate();
                end     = moment( $scope.date ).endOf( 'week' ).toDate();
            }

            graph();
        });

        $scope.$on( Activities.getEvent( 'QUERIED' ), function () {
            $scope.totalActivities  = Activities.getTotal();
        });
        $scope.$on( Courses.getEvent( 'QUERIED' ), function () {
            if ( $scope.user.$resolved && $scope.user.type == 2 ) {
                var courses     = [],
                    filters     = [];

                for ( var i = 0; i < $scope.courses.length; i++ ) {
                    courses.push({
                        course  : $scope.courses[i]._id
                    });

                    filters.push({
                        $and    : [
                            {
                                course      : $scope.courses[i]._id
                            },
                            {
                                students    : $scope.user._id
                            }
                        ]
                    });
                }

                Assignments.query({
                    $and        : [
                        {
                            date        : {
                                $lte    : moment().endOf( 'month' ).toDate()
                            }
                        },
                        {
                            date        : {
                                $gte    : moment().startOf( 'month' ).toDate()
                            }
                        },
                        {
                            $or         : courses
                        }
                    ],
                    $or         : courses,
                    per_page    : 1
                }).$promise.then( function ( data ) {
                    $scope.assignments          = Assignments.getTotal();
                });
                Assignments.query({
                    $and        : [
                        {
                            date        : {
                                $lte    : moment().endOf( 'month' ).toDate()
                            }
                        },
                        {
                            date        : {
                                $gte    : moment().startOf( 'month' ).toDate()
                            }
                        },
                        {
                            $or         : filters
                        }
                    ],
                    per_page    : 1
                }).$promise.then( function ( data ) {
                    $scope.assignmentsSolved    = Assignments.getTotal();
                });
                Discussions.query({
                    $and        : [
                        {
                            date        : {
                                $lte    : moment().endOf( 'month' ).toDate()
                            }
                        },
                        {
                            date        : {
                                $gte    : moment().startOf( 'month' ).toDate()
                            }
                        },
                        {
                            $or         : courses
                        }
                    ],
                    $or         : courses,
                    per_page    : 1
                }).$promise.then( function ( data ) {
                    $scope.discussions          = Discussions.getTotal();
                });
                Discussions.query({
                    $and        : [
                        {
                            date        : {
                                $lte    : moment().endOf( 'month' ).toDate()
                            }
                        },
                        {
                            date        : {
                                $gte    : moment().startOf( 'month' ).toDate()
                            }
                        },
                        {
                            $or         : filters
                        }
                    ],
                    per_page    : 1
                }).$promise.then( function ( data ) {
                    $scope.discussionsSolved    = Discussions.getTotal();
                });
                Questionaries.query({
                    $and        : [
                        {
                            date        : {
                                $lte    : moment().endOf( 'month' ).toDate()
                            }
                        },
                        {
                            date        : {
                                $gte    : moment().startOf( 'month' ).toDate()
                            }
                        },
                        {
                            $or         : courses
                        }
                    ],
                    $or         : courses,
                    per_page    : 1
                }).$promise.then( function ( data ) {
                    $scope.questionaries        = Questionaries.getTotal();
                });
                Questionaries.query({
                    $and        : [
                        {
                            date        : {
                                $lte    : moment().endOf( 'month' ).toDate()
                            }
                        },
                        {
                            date        : {
                                $gte    : moment().startOf( 'month' ).toDate()
                            }
                        },
                        {
                            $or         : filters
                        }
                    ],
                    per_page    : 1
                }).$promise.then( function ( data ) {
                    $scope.questionariesSolved  = Questionaries.getTotal();
                });
            }
        });
        $scope.$on( Users.getEvent('RETRIEVED' ), function () {
            switch ( $scope.user.type ) {
                case 1 :
                    $scope.queryActivities  = function () {
                        $scope.activities   = Activities.query({
                            expanded    : true,
                            page        : $scope.page,
                            per_page    : $scope.per_page,
                            teacher     : $scope.user._id
                        });
                    };

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
                    Assignments.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.assignments      = Assignments.getTotal();
                    });
                    Assignments.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().subtract( 1, 'months' ).startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.assignmentsLast  = Assignments.getTotal();
                    });
                    Discussions.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.discussions  = Discussions.getTotal();
                    });
                    Discussions.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().subtract( 1, 'months' ).startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.discussionsLast  = Discussions.getTotal();
                    });
                    Comments.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.comments     = Comments.getTotal();
                    });
                    Comments.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().subtract( 1, 'months' ).startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.commentsLast = Comments.getTotal();
                    });
                    Questionaries.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.questionaries        = Questionaries.getTotal();
                    });
                    Questionaries.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().subtract( 1, 'months' ).startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.questionariesLast    = Questionaries.getTotal();
                    });
                    Files.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.files        = Files.getTotal();
                    });
                    Files.query({
                        $and    : [
                            {
                                date        : {
                                    $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                                }
                            },
                            {
                                date        : {
                                    $gte    : moment().subtract( 1, 'months' ).startOf( 'month' ).toDate()
                                }
                            },
                            {
                                teacher     : $scope.user._id
                            }
                        ]
                    }).$promise.then( function ( data ) {
                        $scope.filesLast    = Files.getTotal();
                    });
                    break;
                case 2 :
                    $scope.queryActivities  = function () {
                        $scope.activities   = Activities.query({
                            expanded    : true,
                            page        : $scope.page,
                            per_page    : $scope.per_page,
                            user        : $scope.user._id
                        });
                    };

                    $scope.courses          = Courses.query({
                        limit       : 99999,
                        students    : $scope.user._id
                    });
                    break;
            }

            if ( $scope.user.$resolved ) {
                $scope.queryActivities();
            }
        });
    };
});