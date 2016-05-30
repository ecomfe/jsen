define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');

    describe('multi schema', function () {
        it('allOf', function () {
            var schema = {
                allOf: [
                    {
                        type: 'number'
                    },
                    {
                        type: 'integer'
                    }
                ]
            };
            var validate = jsen(schema);

            assert(!validate(null));
            assert(!validate(Math.PI));

            assert(validate(0));
            assert(validate(777));
            assert(validate(-9));
        });

        it('anyOf', function () {
            var schema = {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'number'
                    }
                ]
            };
            var validate = jsen(schema);

            assert(!validate(null));
            assert(!validate(true));
            assert(!validate({}));
            assert(!validate([]));

            assert(validate('abc'));
            assert(validate(123));
            assert(validate(''));
            assert(validate(0));
        });

        it('oneOf', function () {
            var schema = {
                oneOf: [
                    {
                        type: 'number',
                        maximum: 5
                    },
                    {
                        type: 'number',
                        minimum: 3
                    }
                ]
            };
            var validate = jsen(schema);

            assert(!validate(null));
            assert(!validate(true));
            assert(!validate({}));
            assert(!validate([]));
            // matches both validators
            assert(!validate(3));

            assert(validate(0));
            assert(validate(1));
            assert(validate(2));
            assert(validate(6));
            assert(validate(17));
        });

        it('not', function () {
            var schema = {
                not: {
                    type: 'array'
                }
            };
            var validate = jsen(schema);

            assert(!validate([]));

            assert(validate(0));
            assert(validate(false));
            assert(validate('abc'));
            assert(validate({}));
            assert(validate(null));
            assert(validate());
        });
    });

});
