'use strict';

define( function () {
    return function ( $q, Courses, Assignments, Discussions, Comments, Questionaries, Files, Logins ) {
        function TeachersStats ( user, course ) {
            this._course    = course;
            this._data      = {
                assignmentsCurrent      : false,
                assignmentsLast         : false,
                commentsCurrent         : false,
                commentsLast            : false,
                coursesCurrent          : false,
                coursesLast             : false,
                discussionsCurrent      : false,
                discussionsLast         : false,
                filesCurrent            : false,
                filesLast               : false,
                loginsCurrent           : false,
                loginsLast              : false,
                questionariesCurrent    : false,
                questionariesLast       : false
            };
            this._deferred  = $q.defer();
            this._response  = {};
            this._user      = user;
        };

        TeachersStats.prototype._check              = function () {
            if ( this._data.assignmentsCurrent !== false && this._data.assignmentsLast !== false &&
                 this._data.commentsCurrent !== false && this._data.commentsLast !== false &&
                 this._data.coursesCurrent !== false && this._data.coursesLast !== false &&
                 this._data.discussionsCurrent !== false && this._data.discussionsLast !== false &&
                 this._data.filesCurrent !== false && this._data.filesLast !== false &&
                 this._data.loginsCurrent !== false && this._data.loginsLast !== false &&
                 this._data.questionariesCurrent !== false && this._data.questionariesLast !== false ) {
                this._deferred.resolve( this._data );
            }
        };

        TeachersStats.prototype._getAssignments     = function () {
            var that            = this;

            Assignments.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.assignmentsCurrent   = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
            Assignments.query({
                $and    : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.assignmentsLast      = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
        };

        TeachersStats.prototype._getComments        = function () {
            var that            = this;

            Comments.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.commentsCurrent      = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
            Comments.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.commentsLast         = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
        };

        TeachersStats.prototype._getCourses         = function () {
            var that            = this;

            Courses.query({
                $and    : [
                    {
                        start       : {
                            $lte    : moment().endOf( 'month' ).toDate()
                        }
                    },
                    {
                        teacher     : this._user
                    }
                ]
            }).$promise.then( function ( data ) {
                that._data.coursesCurrent   = Courses.getTotal();
                that._check();
            });
            Courses.query({
                $and    : [
                    {
                        start       : {
                            $lte    : moment().subtract( 1, 'months' ).endOf( 'month' ).toDate()
                        }
                    },
                    {
                        teacher     : this._user
                    }
                ]
            }).$promise.then( function ( data ) {
                that._data.coursesLast      = Courses.getTotal();
                that._check();
            });
        };

        TeachersStats.prototype._getDiscussions     = function () {
            var that            = this;

            Discussions.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.discussionsCurrent   = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
            Discussions.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.discussionsLast      = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
        };

        TeachersStats.prototype._getFiles           = function () {
            var that            = this;

            Files.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.filesCurrent         = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
            Files.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.filesLast            = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
        };

        TeachersStats.prototype._getLogins          = function () {
            var that            = this;

            Logins.query({
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
                        user        : this._user
                    }
                ]
            }).$promise.then( function ( data ) {
                that._data.loginsCurrent        = Logins.getTotal();
                that._check();
            });
            Logins.query({
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
                        user        : this._user
                    }
                ]
            }).$promise.then( function ( data ) {
                that._data.loginsLast           = Logins.getTotal();
                that._check();
            });
        };

        TeachersStats.prototype._getQuestionaries   = function () {
            var that            = this;

            Questionaries.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.questionariesCurrent = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
            Questionaries.query({
                $and        : [
                    {
                        course      : this._course
                    },
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
                        teacher     : this._user
                    }
                ],
                aggregate   : 'course_avg'
            }).$promise.then( function ( data ) {
                that._data.questionariesLast    = ( data[0] ) ? data[0].avg : 0;
                that._check();
            });
        };

        TeachersStats.prototype.getResponse         = function () {
            var that    = this;
            this._response.promise      = this._deferred.promise;

            this._getAssignments();
            this._getComments();
            this._getCourses();
            this._getDiscussions();
            this._getFiles();
            this._getLogins();
            this._getQuestionaries();

            this._response.promise.then( function ( data ) {
                for ( var key in data ) {
                    that._response[key] = data[key];
                }
            });

            return this._response;
        };

        return {
            getStats    : function ( user, course ) {
                return new TeachersStats( user, course ).getResponse();
            }
        };
    };
});