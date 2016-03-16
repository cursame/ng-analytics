'use strict';

define( function ( require ) {
    return function ( config ) {
        return {
            sign    : function () {
                var timestamp   = new Date().getTime();

                return {
                    consumer    : config.consumer,
                    timestamp   : timestamp,
                    signature   : CryptoJS.SHA1( timestamp + config.secret ).toString( CryptoJS.enc.Hex )
                };
            }
        };
    };
});