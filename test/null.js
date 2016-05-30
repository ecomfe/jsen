define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');

    describe('type: null', function () {
        it('required', function () {
            var schema = {
                type: 'null'
            };
            var validate = jsen(schema);

            assert(!validate(undefined));
            assert(validate(null));
        });

        it('type', function () {
            var schema = {
                type: 'null'
            };
            var validate = jsen(schema);

            assert(!validate('123'));
            assert(!validate([]));
            assert(!validate({}));
            assert(!validate(Math.PI));

            assert(validate(null));
        });
    });

});
