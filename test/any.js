define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');

    describe('any', function () {
        it('passes validation on any type', function () {
            var schema = {
                type: 'any'
            };
            var validate = jsen(schema);

            assert(validate(null));
            assert(validate(undefined));
            assert(validate(0));
            assert(validate(''));
            assert(validate(Math.PI));
            assert(validate('abc'));
            assert(validate(77));
            assert(validate(false));
            assert(validate(true));
            assert(validate({}));
            assert(validate([]));
        });
    });
});
