'use strict';

define( function () {
    return function ( $q, Courses, Assignments, Discussions, Questionaries ) {
        return {
            _courses            : [],

            _data               : {
                assignments         : false,
                assignmentsSolved   : false,
                discussions         : false,
                discussionsSolved   : false,
                questionaries       : false,
                questionariesSolved : false
            },

            _deferred           : null,

            _filters            : [],

            _response           : {},

            _user               : null,

            _check              : function () {
                var that    = this;
                if ( this._data.assignments !== false && this._data.assignmentsSolved !== false &&
                     this._data.discussions !== false && this._data.discussionsSolved !== false &&
                     this._data.questionaries !== false && this._data.questionariesSolved !== false ) {
                    this._deferred.resolve( this._data );
                }
            },

            _getAssignments     : function () {
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
                    that._data.assignments          = Assignments.getTotal();
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
            },

            _getDiscussions     : function () {
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
                    that._data.discussions          = Discussions.getTotal();
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
            },

            _getQuestionaries   : function () {
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
                    that._data.questionaries        = Questionaries.getTotal();
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
            },

            getStats            : function ( user ) {
                var that        = this;

                this._deferred  = $q.defer();
                this._user      = user;

                Courses.query({
                    limit       : 99999,
                    students    : user
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
                                    students    : user
                                }
                            ]
                        });
                    }

                    that._getAssignments();
                    that._getDiscussions();
                    that._getQuestionaries();
                });

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