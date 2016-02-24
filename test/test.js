'use strict';

// MODULES //

var tape = require( 'tape' );
var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
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

tape( 'if `x` equals `y`, the function returns `y`', function test( t ) {
	var z;

	z = nextafter( 1.0, 1.0 );
	t.equal( z, 1.0, 'returns 1.0' );

	z = nextafter( -0.0, +0.0 );
	t.equal( z, 0, 'returns 0' );
	t.equal( 1/z, PINF, 'returns +0' );

	z = nextafter( +0.0, -0.0 );
	t.equal( z, 0, 'returns 0' );
	t.equal( 1/z, NINF, 'returns -0' );

	t.end();
});
