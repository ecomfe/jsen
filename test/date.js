define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');

    describe('type: date', function () {
        it('required', function () {
            var schema = {
                type: 'date'
            };
            var validate = jsen(schema);

            assert(!validate());
            assert(!validate(null));

            assert(validate(new Date()));
        });

        it('nullable', function () {
            var schema = {
                type: [
                    'date',
                    'null'
                ]
            };
            var validate = jsen(schema);

            assert(!validate(undefined));

            assert(validate(new Date()));
            assert(validate(null));
        });

        it('type', function () {
            var schema = {
                type: 'date'
            };
            var validate = jsen(schema);

            assert(!validate('123'));
            assert(!validate([]));
            assert(!validate({}));
            assert(!validate(Math.PI));

            assert(validate(new Date()));
        });
    });

});
