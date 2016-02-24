'use strict';

// MODULES //

var tape = require( 'tape' );
var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
var SMALLEST_SUBNORMAL = require( 'const-smallest-float64' ).DENORMALIZED;
var SMALLEST_FLOAT64 = require( 'const-smallest-float64' ).VALUE;
var MAX_FLOAT64 = require( 'const-max-float64' );
var fromBits = require( 'math-float64-from-bits' );
var repeat = require( 'utils-repeat-string' );
var nextafter = require( './../lib' );


// FIXTURES //

var normal = require( './fixtures/normal.json' );
var negativeSubnormal = require( './fixtures/negative_subnormal.json' );
var positiveSubnormal = require( './fixtures/positive_subnormal.json' );
var negativeVeryLarge = require( './fixtures/negative_very_large.json' );
var positiveVeryLarge = require( './fixtures/positive_very_large.json' );
var positiveLarge = require( './fixtures/positive_large.json' );


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

tape( 'if `x` is the minimum positive normal double and `y < x`, the function returns the largest subnormal double', function test( t ) {
	var expected;
	var sign;
	var frac;
	var exp;
	var z;


	sign = '0';
	exp = repeat( '0', 11 );
	frac = repeat( '1', 52 );

	expected = fromBits( sign+exp+frac );
	z = nextafter( SMALLEST_FLOAT64, 0 );

	t.equal( z, expected, 'returns largest subnormal' );
	t.end();
});

tape( 'if `x` is the minimum negative normal double and `y > x`, the function returns the largest subnormal double', function test( t ) {
	var expected;
	var sign;
	var frac;
	var exp;
	var z;


	sign = '1';
	exp = repeat( '0', 11 );
	frac = repeat( '1', 52 );

	expected = fromBits( sign+exp+frac );
	z = nextafter( -SMALLEST_FLOAT64, 0 );

	t.equal( z, expected, 'returns largest subnormal' );
	t.end();
});

tape( 'if `x` is the maximum positive subnormal double and `y > x`, the function returns the smallest positive normal double', function test( t ) {
	var expected;
	var sign;
	var frac;
	var exp;
	var x;
	var z;


	sign = '0';
	exp = repeat( '0', 11 );
	frac = repeat( '1', 52 );

	x = fromBits( sign+exp+frac );
	expected = SMALLEST_FLOAT64;

	z = nextafter( x, 1 );

	t.equal( z, expected, 'returns minimum normal' );
	t.end();
});

tape( 'if `x` is the maximum negative subnormal double and `y < x`, the function returns the smallest negative subnormal double', function test( t ) {
	var expected;
	var sign;
	var frac;
	var exp;
	var x;
	var z;


	sign = '1';
	exp = repeat( '0', 11 );
	frac = repeat( '1', 52 );

	x = fromBits( sign+exp+frac );
	expected = -SMALLEST_FLOAT64;

	z = nextafter( x, -1 );

	t.equal( z, expected, 'returns minimum normal' );
	t.end();
});

tape( 'the function returns the next representable double-precision floating-point number', function test( t ) {
	var expected;
	var x;
	var y;
	var z;
	var i;

	x = normal.x;
	y = normal.y;
	expected = normal.expected;

	for ( i = 0; i < x.length; i++ ) {
		z = nextafter( x[i], y[i] );
		t.equal( z, expected[i], 'returns '+expected[i]+' when provided '+x[i]+' and '+y[i] );
	}
	t.end();
});

tape( 'the function returns the next representable double-precision floating-point number (negative subnormal)', function test( t ) {
	var expected;
	var x;
	var y;
	var z;
	var i;

	x = negativeSubnormal.x;
	y = negativeSubnormal.y;
	expected = negativeSubnormal.expected;

	for ( i = 0; i < x.length; i++ ) {
		z = nextafter( x[i], y[i] );
		t.equal( z, expected[i], 'returns '+expected[i]+' when provided '+x[i]+' and '+y[i] );
	}
	t.end();
});

tape( 'the function returns the next representable double-precision floating-point number (positive subnormal)', function test( t ) {
	var expected;
	var x;
	var y;
	var z;
	var i;

	x = positiveSubnormal.x;
	y = positiveSubnormal.y;
	expected = positiveSubnormal.expected;

	for ( i = 0; i < x.length; i++ ) {
		z = nextafter( x[i], y[i] );
		t.equal( z, expected[i], 'returns '+expected[i]+' when provided '+x[i]+' and '+y[i] );
	}
	t.end();
});

tape( 'the function returns the next representable double-precision floating-point number (negative very large)', function test( t ) {
	var expected;
	var x;
	var y;
	var z;
	var i;

	x = negativeVeryLarge.x;
	y = negativeVeryLarge.y;
	expected = negativeVeryLarge.expected;

	for ( i = 0; i < x.length; i++ ) {
		z = nextafter( x[i], y[i] );
		t.equal( z, expected[i], 'returns '+expected[i]+' when provided '+x[i]+' and '+y[i] );
	}
	t.end();
});

tape( 'the function returns the next representable double-precision floating-point number (positive very large)', function test( t ) {
	var expected;
	var x;
	var y;
	var z;
	var i;

	x = positiveVeryLarge.x;
	y = positiveVeryLarge.y;
	expected = positiveVeryLarge.expected;

	for ( i = 0; i < x.length; i++ ) {
		z = nextafter( x[i], y[i] );
		t.equal( z, expected[i], 'returns '+expected[i]+' when provided '+x[i]+' and '+y[i] );
	}
	t.end();
});

tape( 'the function returns the next representable double-precision floating-point number (positive large)', function test( t ) {
	var expected;
	var x;
	var y;
	var z;
	var i;

	x = positiveLarge.x;
	y = positiveLarge.y;
	expected = positiveLarge.expected;

	for ( i = 0; i < x.length; i++ ) {
		z = nextafter( x[i], y[i] );
		t.equal( z, expected[i], 'returns '+expected[i]+' when provided '+x[i]+' and '+y[i] );
	}
	t.end();
});
