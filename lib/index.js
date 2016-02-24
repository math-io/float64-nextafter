'use strict';

// MODULES //

var toWords = require( 'math-float64-to-words' );
var SMALLEST_SUBNORMAL = require( 'const-smallest-float64' ).DENORMALIZED;


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
	var wy;

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
			return -SMALLEST_SUBNORMAL;
		}
		return SMALLEST_SUBNORMAL;
	}
} // end FUNCTION nextafter()


// EXPORTS //

module.exports = nextafter;
