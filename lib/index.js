'use strict';

// MODULES //

var toWords = require( 'math-float64-to-words' );


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
} // end FUNCTION nextafter()


// EXPORTS //

module.exports = nextafter;
