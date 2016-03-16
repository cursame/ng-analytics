'use strict';

define( function () {
    var config  = angular.module( 'config', []);

    config.constant( 'config', {
        api_url     : 'ANALYTICS_API_URL',
        consumer    : 'ANALYTICS_WEB_APPLICATION_ID',
        secret      : 'ANALYTICS_WEB_APPLICATION_SECRET'
    });
});