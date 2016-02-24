nextafter
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns the next representable [double-precision floating-point number][ieee754] after `x` toward `y`.


## Installation

``` bash
$ npm install math-float64-nextafter
```


## Usage

``` javascript
var nextafter = require( 'math-float64-nextafter' );
```

#### nextafter( x, y )

Returns the next representable [double-precision floating-point number][ieee754] after `x` toward `y`.

``` javascript
var z = nextafter()
// returns 
```


## Examples

``` javascript
var nextafter = require( 'math-float64-nextafter' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float64-nextafter.svg
[npm-url]: https://npmjs.org/package/math-float64-nextafter

[build-image]: http://img.shields.io/travis/math-io/float64-nextafter/master.svg
[build-url]: https://travis-ci.org/math-io/float64-nextafter

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float64-nextafter/master.svg
[coverage-url]: https://codecov.io/github/math-io/float64-nextafter?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float64-nextafter.svg
[dependencies-url]: https://david-dm.org/math-io/float64-nextafter

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float64-nextafter.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float64-nextafter

[github-issues-image]: http://img.shields.io/github/issues/math-io/float64-nextafter.svg
[github-issues-url]: https://github.com/math-io/float64-nextafter/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
