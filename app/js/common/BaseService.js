'use strict';

define( function ( require ) {
    return function ( $rootScope, $resource, config, events ) {
        function BaseService( model ) {
            this._model     = '';
            this._total     = 0;
            this._resource  = null;

            return this._init( model );
        };

        BaseService.prototype   = {
            _init       : function ( model ) {
                var that        = this;
                this._model     = model;
                this._resource  = $resource( config.api_url + model + '/:id', null, {
                    query   : {
                        method              : 'GET',
                        isArray             : true,
                        transformResponse   : function ( data, headers ) {
                            var response    = angular.fromJson( data );

                            if ( !response.error ) {
                                that._total     = response.pagination.total;
                                that._page      = response.pagination.page;
                                that._per_page  = response.pagination.per_page;

                                return response.results;
                            } else {
                                return [];
                            }
                        }
                    },
                    update  : {
                        method              : 'PUT'
                    }
                });
            },

            create      : function ( object ) {
                var that    = this;
                return this._resource.save( object,
                    function ( data ) {
                        while ( !data.$resolved );

                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_CREATED' ], data );
                    },
                    function ( err ) {
                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_ERROR' ], err );
                    });
            },

            get         : function ( id, expand ) {
                var that    = this;

                return this._resource.get({
                    id          : id,
                    expanded    : expand
                },
                    function ( data ) {
                        while ( !data.$resolved );

                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_RETRIEVED' ], data );
                    },
                    function ( err ) {
                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_ERROR' ], err );
                    }
                );
            },

            getEvent    : function ( type ) {
                switch ( type ) {
                    case 'CREATED' :
                        return events[ this._model.toUpperCase() + '_CREATED' ];
                        break;
                    case 'DELETED' :
                        return events[ this._model.toUpperCase() + '_DELETED' ];
                        break;
                    case 'ERROR' :
                        return events[ this._model.toUpperCase() + '_ERROR' ];
                        break;
                    case 'QUERIED' :
                        return events[ this._model.toUpperCase() + '_QUERIED' ];
                        break;
                    case 'RETRIEVED' :
                        return events[ this._model.toUpperCase() + '_RETRIEVED' ];
                        break;
                    case 'UPDATED' :
                        return events[ this._model.toUpperCase() + '_UPDATED' ];
                        break;
                    default :
                        return '';
                }
            },

            getTotal    : function () {
                return this._total;
            },

            query       : function ( q ) {
                var that    = this;

                return this._resource.query( q,
                    function ( data ) {
                        while ( !data.$resolved );

                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_QUERIED' ], data );
                    },
                    function ( err ) {
                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_ERROR' ], err );
                    }
                );
            },

            remove      : function ( id ) {
                var that    = this;

                return this._resource.delete({
                    id  : id
                },
                    function ( data ) {
                        while ( !data.$resolved );

                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_DELETED' ], data );
                    },
                    /* istanbul ignore else */
                    function ( err ) {
                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_ERROR' ], err );
                    }
                );
            },

            update      : function ( id, data ) {
                var that    = this;

                return this._resource.update({
                    id          : id,
                }, data,
                    function ( data ) {
                        while ( !data.$resolved );

                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_UPDATED' ], data );
                    },
                    function ( err ) {
                        $rootScope.$broadcast( events[ that._model.toUpperCase() + '_ERROR' ], err );
                    }
                );
            }
        };

        return BaseService;
    };
});