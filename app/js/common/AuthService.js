'use strict';

define( function () {
    return function ( Session ) {
        return {
            authorize   : function( required ) {
                var access  = Session.getAccess();

                switch ( access ) {
                    case 0 :
                    case '0' :
                        if ( required.indexOf( 'Super' ) == -1 ) {
                            return false;
                        }
                        break;
                    case -1 :
                    case '-1' :
                        if ( required.indexOf( 'Admin' ) == -1 ) {
                            return false;
                        }
                        break;
                    default :
                        return false;
                }

                return true;
            }
        };
    };
});