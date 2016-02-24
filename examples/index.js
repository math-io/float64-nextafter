'use strict';

var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
var nextafter = require( './../lib' );

var x;
var y;
var z;
var i;

for ( i = 0; i < 100; i++ ) {
	x = Math.random()*1e6 - 5e5;
	if ( Math.random() < 0.5 ) {
		y = NINF;
	} else {
		y = PINF;
	}
	z = nextafter( x, y );
	console.log( 'x = %d, y = %d. nextafter(x,y) => %d', x, y, z );
}
