'use strict';

define( function () {
    return function ( $translate ) {
        return function ( date ) {
            var calculateDelta  = function ( now, ref ) {
                    return Math.round( Math.abs( now - ref ) / 1000 );
                };

            var now             = new Date(),
                reference       = date instanceof Date ? date : new Date( date ),
                minute          = 60,
                hour            = minute * 60,
                day             = hour * 24,
                week            = day * 7,
                month           = day * 30,
                year            = day * 365,
                delta           = calculateDelta( now, reference ),
                translate       = function( translatePhrase, timeValue ) {
                    var translateKey;
                    if ( translatePhrase === 'date.just_now' ) {
                        translateKey    = translatePhrase;
                    } else if ( now >= reference ) {
                        translateKey    = '' + translatePhrase + '_ago';
                    } else {
                        translateKey    = '' + translatePhrase + '_from_now';
                    }

                    return $translate.instant( translateKey, {
                        time    : timeValue
                    });
                };

            if ( delta > day && delta < week ) {
                reference   = new Date( reference.getFullYear(), reference.getMonth(), reference.getDate(), 0, 0, 0 );
                delta       = calculateDelta( now, reference );
            }

            switch ( false ) {
                case !( delta < 30 ) :
                    return translate( 'date.just_now' );
                case !( delta < minute ) :
                    return translate( 'date.seconds', delta );
                case !( delta < 2 * minute ):
                    return translate( 'date.a_minute' );
                case !( delta < hour ):
                    return translate( 'date.minutes', Math.floor( delta / minute ) );
                case Math.floor( delta / hour ) !== 1 :
                    return translate( 'date.an_hour' );
                case !( delta < day ) :
                    return translate( 'date.hours', Math.floor( delta / hour ) );
                case !( delta < day * 2 ) :
                    return translate( 'date.a_day' );
                case !( delta < week ) :
                    return translate( 'date.days', Math.floor( delta / day ) );
                case Math.floor( delta / week ) !== 1 :
                    return translate( 'date.a_week' );
                case !( delta < month ) :
                    return translate( 'date.weeks', Math.floor( delta / week ) );
                case Math.floor( delta / month ) !== 1 :
                    return translate( 'date.a_month' );
                case !( delta < year ) :
                    return translate( 'date.months', Math.floor( delta / month ) );
                case Math.floor( delta / year ) !== 1 :
                    return translate( 'date.a_year' );
                default :
                    return translate( 'date.over_a_year' );
            }
        };
    };
});