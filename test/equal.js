define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');
    var equal = jsen.equal;

    describe('equal', function () {
        it('string', function () {
            assert(equal('a', 'a'));
            assert(!equal('a', 'b'));
        });

        it('number', function () {
            assert(equal(123, 123));
            assert(equal(Math.PI, Math.PI));
            assert(!equal(Math.PI, Math.E));
        });

        it('boolean', function () {
            assert(equal(true, true));
            assert(!equal(true, false));
        });

        it('null', function () {
            assert(equal(null, null));
            assert(!equal(null, undefined));
        });

        it('undefined', function () {
            assert(equal(undefined, undefined));
            assert(!equal(null, undefined));
        });

        it('function', function () {
            var f1 = function () {};
            var f2 = function () {};
            var f3 = f1;

            // two functions are only equal if they
            // reference the same function object
            assert(equal(f1, f3));
            assert(!equal(f1, f2));
        });

        it('array', function () {
            var f = function () {};
            var obj1 = {
                a: 123,
                b: 'abc',
                c: f
            };
            var obj2 = {
                a: 123,
                b: 'abc',
                c: f
            };
            var arr1 = [
                1,
                'a',
                f,
                obj1
            ];
            var arr2 = [
                1,
                'a',
                f,
                obj1
            ];
            var arr3 = [
                1,
                'a',
                f
            ];
            var arr4 = [
                1,
                'a',
                f,
                obj2
            ];

            assert(equal(arr1, arr2));
            assert(equal(arr1, arr4));

            assert(!equal(arr1, arr3));
        });

        it('object', function () {
            var a = {
                a: 123,
                b: [
                    'abc'
                ],
                c: {}
            };
            var b = {
                b: [
                    'abc'
                ],
                c: {},
                a: 123
            };
            var c = a;
            var d = {
                a: 123,
                b: [
                    'abc'
                ],
                c: {
                    d: undefined
                }
            };

            assert(equal(a, b));
            assert(equal(a, c));

            assert(!equal(a, d));
        });

        it('regexp', function () {
            var a = /a+/gim;
            var b = new RegExp('a+', 'gim');
            var c = /a/gim;
            var d = a;

            assert(equal(a, b));
            assert(equal(a, d));

            assert(!equal(a, c));
        });
    });

});
