'use strict';

define( function () {
    return function ( $q, Courses, Assignments, Discussions, Comments, Questionaries, Files ) {
        return {
            _data               : {
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
                questionariesCurrent    : false,
                questionariesLast       : false
            },

            _deferred           : null,

            _response           : {},

            _user               : null,

            _check              : function () {
                if ( this._data.assignmentsCurrent !== false && this._data.assignmentsLast !== false &&
                     this._data.commentsCurrent !== false && this._data.commentsLast !== false &&
                     this._data.coursesCurrent !== false && this._data.coursesLast !== false &&
                     this._data.discussionsCurrent !== false && this._data.discussionsLast !== false &&
                     this._data.filesCurrent !== false && this._data.filesLast !== false &&
                     this._data.questionariesCurrent !== false && this._data.questionariesLast !== false ) {
                    this._deferred.resolve( this._data );
                }
            },

            _getAssignments     : function () {
                var that            = this;

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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.assignmentsCurrent   = Assignments.getTotal();
                    that._check();
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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.assignmentsLast      = Assignments.getTotal();
                    that._check();
                });
            },

            _getComments        : function () {
                var that            = this;

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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.commentsCurrent      = Comments.getTotal();
                    that._check();
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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.commentsLast         = Comments.getTotal();
                    that._check();
                });
            },

            _getCourses         : function () {
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
            },

            _getDiscussions     : function () {
                var that            = this;

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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.discussionsCurrent   = Discussions.getTotal();
                    that._check();
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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.discussionsLast      = Discussions.getTotal();
                    that._check();
                });
            },

            _getFiles           : function () {
                var that            = this;

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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.filesCurrent         = Files.getTotal();
                    that._check();
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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.filesLast            = Files.getTotal();
                    that._check();
                });
            },

            _getQuestionaries   : function () {
                var that            = this;

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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.questionariesCurrent = Questionaries.getTotal();
                    that._check();
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
                            teacher     : this._user
                        }
                    ]
                }).$promise.then( function ( data ) {
                    that._data.questionariesLast    = Questionaries.getTotal();
                    that._check();
                });
            },

            getStats            : function ( user ) {
                var that        = this;
                this._deferred  = $q.defer();
                this._user      = user;

                this._getAssignments();
                this._getComments();
                this._getCourses();
                this._getDiscussions();
                this._getFiles();
                this._getQuestionaries();

                this._response.promise      = this._deferred.promise;

                this._response.promise.then( function ( data ) {
                    for ( var key in data ) {
                        that._response[key] = data[key];
                    }
                });

                return this._response;
            }
        };
    };
});