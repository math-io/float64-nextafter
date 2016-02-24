'use strict';

// MODULES //

var tape = require( 'tape' );
var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
var SMALLEST_SUBNORMAL = require( 'const-smallest-float64' ).DENORMALIZED;
var MAX_FLOAT64 = require( 'const-max-float64' );
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

tape( 'if `x` is `0` and `y` is positive, the function returns the minimum positive subnormal number', function test( t ) {
	var z = nextafter( 0.0, 1.0 );
	t.equal( z, SMALLEST_SUBNORMAL, 'returns min positive subnormal' );
	t.end();
});

tape( 'if `x` is `0` and `y` is negative, the function returns the minimum negative subnormal number', function test( t ) {
	var z = nextafter( 0.0, -1.0 );
	t.equal( z, -SMALLEST_SUBNORMAL, 'returns min negative subnormal' );
	t.end();
});

tape( 'if `x` is the maximum positive double and `y` is `+infinity`, the function overflows and returns `+infinity`', function test( t ) {
	var z = nextafter( MAX_FLOAT64, PINF );
	t.equal( z, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if `x` is the maximum negative double and `y` is `-infinity`, the function overflows and returns `-infinity`', function test( t ) {
	var z = nextafter( -MAX_FLOAT64, NINF );
	t.equal( z, NINF, 'returns -infinity' );
	t.end();
});
