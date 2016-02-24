'use strict';

// MODULES //

var tape = require( 'tape' );
var nextafter = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof nextafter, 'function', 'main export is a function' );
	t.end();
});
