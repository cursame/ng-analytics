'use strict';

define( function () {
    return function ( $q, Courses, Assignments, Discussions, Questionaries, Logins ) {
        function StudentsStats ( user, course ) {
            this._course    = course;
            this._courses   = [];
            this._data      = {
                assignmentsSolved   : false,
                assignmentsTotal    : false,
                coursesCurrent      : false,
                coursesLast         : false,
                discussionsSolved   : false,
                discussionsTotal    : false,
                loginsCurrent       : false,
                loginsLast          : false,
                questionariesSolved : false,
                questionariesTotal  : false
            };
            this._deferred  = $q.defer();
            this._filters   = [];
            this._response  = {};
            this._user      = user;
        };

        StudentsStats.prototype._check                  = function () {
            var that    = this;
            if ( this._data.assignmentsTotal !== false && this._data.assignmentsSolved !== false &&
                this._data.coursesCurrent !== false && this._data.coursesLast !== false &&
                 this._data.discussionsTotal !== false && this._data.discussionsSolved !== false &&
                 this._data.loginsCurrent !== false && this._data.loginsLast !== false &&
                 this._data.questionariesTotal !== false && this._data.questionariesSolved !== false ) {
                this._deferred.resolve( this._data );
            }
        };

        StudentsStats.prototype._getAssignmentsSolved   = function () {
            var that    = this;

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
                        $or         : this._courses
                    }
                ],
                $or         : this._courses,
                per_page    : 1
            }).$promise.then( function ( data ) {
                that._data.assignmentsTotal     = Assignments.getTotal();
                that._check();
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
                        $or         : this._filters
                    }
                ],
                per_page    : 1
            }).$promise.then( function ( data ) {
                that._data.assignmentsSolved    = Assignments.getTotal();
                that._check();
            });
        };

        StudentsStats.prototype._getCourses             = function () {
            var that            = this;

            Courses.query({
                $and    : [
                    {
                        start       : {
                            $lte    : moment().endOf( 'month' ).toDate()
                        }
                    },
                    {
                        students    : this._user
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
                        students    : this._user
                    }
                ]
            }).$promise.then( function ( data ) {
                that._data.coursesLast      = Courses.getTotal();
                that._check();
            });
        };

        StudentsStats.prototype._getDiscussionsSolved   = function () {
            var that    = this;

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
                        $or         : this._courses
                    }
                ],
                $or         : this._courses,
                per_page    : 1
            }).$promise.then( function ( data ) {
                that._data.discussionsTotal     = Discussions.getTotal();
                that._check();
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
                        $or         : this._filters
                    }
                ],
                per_page    : 1
            }).$promise.then( function ( data ) {
                that._data.discussionsSolved    = Discussions.getTotal();
                that._check();
            });
        };

        StudentsStats.prototype._getLogins              = function () {
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

        StudentsStats.prototype._getQuestionariesSolved = function () {
            var that    = this;

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
                        $or         : this._courses
                    }
                ],
                $or         : this._courses,
                per_page    : 1
            }).$promise.then( function ( data ) {
                that._data.questionariesTotal   = Questionaries.getTotal();
                that._check();
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
                        $or         : this._filters
                    }
                ],
                per_page    : 1
            }).$promise.then( function ( data ) {
                that._data.questionariesSolved  = Questionaries.getTotal();
                that._check();
            });
        };

        StudentsStats.prototype.getResponse             = function () {
            var that        = this;

            Courses.query({
                limit       : 99999,
                students    : this._user
            }).$promise.then( function ( data ) {
                for ( var i = 0; i < data.length; i++ ) {
                    that._courses.push({
                        course  : data[i]._id
                    });

                    that._filters.push({
                        $and    : [
                            {
                                course      : data[i]._id
                            },
                            {
                                students    : that._user
                            }
                        ]
                    });
                }

                that._getAssignmentsSolved();
                that._getCourses();
                that._getDiscussionsSolved();
                that._getLogins();
                that._getQuestionariesSolved();
            });

            this._response.promise      = this._deferred.promise;

            this._response.promise.then( function ( data ) {
                for ( var key in data ) {
                    that._response[key] = data[key];
                }
            });

            return this._response;
        };

        return {
            getStats            : function ( user, course ) {
                return new StudentsStats( user, course ).getResponse();
            }
        };
    };
});