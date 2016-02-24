'use strict';

// MODULES //

var tape = require( 'tape' );
var nextafter = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof nextafter, 'function', 'main export is a function' );
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z = nextafter( NaN, 5.0 );
	t.ok( z !== z, 'returns NaN' );
	t.end();
});

tape( 'if `y` is `NaN`, the function returns `NaN`', function test( t ) {
	var z = nextafter( 5.0, NaN );
	t.ok( z !== z, 'returns NaN' );
	t.end();
});
