'use strict';

define( function () {
    return function ( Auth ) {
        return {
            link    : function ( scope, elm, attrs ) {
                var makeVisible = function() {
                        elm.removeClass( 'hidden' );
                    },
                    makeHidden  = function() {
                        elm.addClass( 'hidden' );
                    },
                    determine   = function( reset ) {
                        var result;
                        makeVisible();

                        result  = Auth.authorize( roles );
                        if ( result ) {
                            makeVisible();
                        } else {
                            makeHidden();
                        }
                    },
                    roles       = attrs.userAccess.split( ',' );

                if ( roles.length > 0 ) {
                    determine();
                }
            }
        };
    };
});