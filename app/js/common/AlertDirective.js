'use strict';

define( function ( require ) {
    return function ( $rootScope, $timeout, events ) {
        return {
            restrict    : 'EA',
            templateUrl : 'partials/alert.html',
            link        : function ( scope, elm, attrs ) {
                scope.dismiss   = function () {
                    elm.slideUp();
                    scope.msg   = '';
                };
                scope.$watch( 'msg', function ( value ) {
                    if ( value ) {
                        elm.slideDown();

                        $timeout( function () {
                            scope.dismiss();
                        }, 5000 );
                    }
                });

                $rootScope.$on( events.SYSTEM_MESSAGE, function ( e, data ) {
                    scope.msg_type = data.type;
                    scope.msg      = data.msg;
                });
            }
        }
    };
});