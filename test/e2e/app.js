'use strict';

describe( 'App', function () {
    it ( 'should have correctly boostraped AngularJS', function () {
        browser.get( '/' );

        expect( element.all( by.css( 'html.ng-scope' ) ).count() ).toBe( 1 );
    });
});