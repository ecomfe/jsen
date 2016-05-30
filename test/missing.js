define(function (require) {
    var assert = require('./assert');
    var jsen = require('../index');

    describe('missing $ref', function () {
        it('passes validation with ignore missing $ref', function () {
            var schema = {
                type: 'object',
                properties: {
                    test1: {
                        $ref: '#external1'
                    },
                    test2: {
                        type: 'number'
                    },
                    test3: {
                        $ref: '#external3'
                    } // missing
                },
                additionalProperties: false
            };
            var external1 = {
                type: 'object',
                properties: {
                    test11: {
                        $ref: '#external11'
                    }, // missing
                    test12: {
                        type: 'number'
                    },
                    test13: {
                        $ref: '#external11'
                    } // duplicate
                }
            };
            var validate = jsen(schema, {
                schemas: {
                    external1: external1
                },
                missing$Ref: true
            });
            var missingTest = {
                test1: {
                    test11: 'missing',
                    test12: 5,
                    test13: 'missing too'
                },
                test2: 2,
                test3: 3
            };
            var invalidTest = {
                test1: {
                    test11: 'missing',
                    test12: 5,
                    test13: 'missing too'
                },
                test2: 'fail',
                test3: 3
            };
            var ret;

            ret = validate(missingTest);
            assert(ret); // true
            ret = validate(invalidTest);
            assert(!ret); // !false
        });
    });

});
