'use strict';

// MODULES //

var toWords = require( 'math-float64-to-words' );
var fromWords = require( 'math-float64-from-words' );
var SMALLEST_SUBNORMAL = require( 'const-smallest-float64' ).DENORMALIZED;
var MAX_UINT32 = require( 'const-max-uint32' );


// VARIABLES //

// +infinity => exponent all 1s => 0 11111111111 00000000000000000000 => 2146435072
var INF_EXP_MASK = 0x7ff00000;

// min normal biased exponent = -1022 => 0 00000000001 00000000000000000000 => 1048576
var MIN_NORMAL_EXP_MASK = 0x00100000;


// NEXTAFTER //

/**
* FUNCTION: nextafter( x, y )
*	Returns the next representable double-precision floating-point number after `x` toward `y`.
*
* @param {Number} x - "from" input value
* @param {Number} y - "to" input value
* @returns {Number} next representable double-precision floating-point number
*/
function nextafter( x, y ) {
	var wx;
	var hx;
	var lx;
	var hi;

	// Special case: NaNs
	if ( x !== x || y !== y ) {
		return NaN;
	}
	// Special case: x == y
	if ( x === y ) {
		// Return `y` to ensure consistent behavior around zero => nextafter( -0.0, +0.0 ) = +0.0, nextafter( +0.0, -0.0 ) = -0.0
		return y;
	}
	if ( x === 0 ) {
		if ( y < 0 ) {
			x = -SMALLEST_SUBNORMAL;
		} else {
			x = SMALLEST_SUBNORMAL;
		}
		y = x * x; // raise underflow/inexact flags
		return x;
	}
	wx = toWords( x );
	hx = wx[ 0 ];
	lx = wx[ 1 ];

	// |y| > |x| => x += ulp
	if ( (y > x) === (x > 0) ) {
		if ( lx === MAX_UINT32 ) {
			// Carry a '1' from the low word to the high word:
			hx += 1;
			lx = 0;
		} else {
			lx += 1;
		}
	}
	// |x| > |y| => x -= ulp
	else {
		if ( lx === 0 ) {
			// Need to borrow a '1' from the high word:
			hx -= 1;
			lx = MAX_UINT32;
		} else {
			lx -= 1;
		}
	}
	// Check for overflow (i.e., an exponent of all 1s => +-infinity):
	hi = hx & INF_EXP_MASK; // keep only exponent bits
	if ( hi === INF_EXP_MASK ) {
		return x + x; // raise overflow/inexact flags and return +-infinity
	}
	// Check for inexact/underflow (i.e., an exponent of all 0s):
	if ( hi < MIN_NORMAL_EXP_MASK ) {
		y = x * x; // raise underflow/ inexact flags
	}
	return fromWords( hx, lx );
} // end FUNCTION nextafter()


// EXPORTS //

module.exports = nextafter;
