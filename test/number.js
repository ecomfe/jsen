define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');

    describe('type: number', function () {
        it('required', function () {
            var schema = {
                type: 'number'
            };
            var validate = jsen(schema);

            assert(!validate());
            assert(!validate(null));

            assert(validate(Math.PI));
            assert(validate(123));
        });

        it('nullable', function () {
            var schema = {
                type: [
                    'number',
                    'null'
                ]
            };
            var validate = jsen(schema);

            assert(!validate(undefined));

            assert(validate(null));
            assert(validate(Math.PI));
        });

        it('type', function () {
            var schema = {
                type: 'number'
            };
            var validate = jsen(schema);

            assert(!validate('123'));
            assert(!validate(true));
            assert(!validate(false));
            assert(!validate([]));
            assert(!validate({}));

            assert(validate(13));
            assert(validate(17.8));
            assert(validate(Math.PI));
        });

        it('enum', function () {
            var schema = {
                type: 'number',
                enum: [
                    1,
                    Math.E,
                    3,
                    5,
                    7
                ]
            };
            var validate = jsen(schema);

            assert(!validate(4));
            assert(!validate(Math.PI));

            assert(validate(5));
            assert(validate(Math.E));
        });

        it('minimum', function () {
            var schema = {
                type: 'number',
                minimum: 7
            };
            var validate = jsen(schema);

            assert(!validate(6));
            assert(!validate(Math.PI));

            assert(validate(7));
            assert(validate(999));
        });

        it('exclusiveMinimum', function () {
            var schema = {
                type: 'number',
                minimum: 7,
                exclusiveMinimum: true
            };
            var validate = jsen(schema);

            assert(!validate(6));
            assert(!validate(7));
            assert(!validate(Math.PI));

            assert(validate(8));
            assert(validate(999));
        });

        it('maximum', function () {
            var schema = {
                type: 'number',
                maximum: 77
            };
            var validate = jsen(schema);

            assert(!validate(77.000001));
            assert(!validate(78));

            assert(validate(-12));
            assert(validate(76));
            assert(validate(77));
            assert(validate(Math.PI));
        });

        it('exclusiveMaximum', function () {
            var schema = {
                type: 'number',
                maximum: 77,
                exclusiveMaximum: true
            };
            var validate = jsen(schema);

            assert(!validate(77));
            assert(!validate(78));

            assert(validate(-12));
            assert(validate(75));
            assert(validate(76));
            assert(validate(76.99999));
        });

        it('multipleOf', function () {
            var schema = {
                type: 'number',
                multipleOf: 7
            };
            var validate = jsen(schema);

            assert(!validate(8));

            assert(validate(14));
            assert(validate(-49));
            assert(validate(77));

            schema = {
                type: 'number',
                multipleOf: 3.14 // Math.PI
            };

            validate = jsen(schema);

            assert(!validate(2.5));

            assert(validate(9.42)); // 3 * Math.PI
        });

        it('fix multipleOf doesn\'t validate data for decimal point (#1)', function () {
            var schema = {
                type: 'number',
                multipleOf: 0.01
            };
            var validate = jsen(schema);

            assert(validate(18.15));
        });
    });

});
