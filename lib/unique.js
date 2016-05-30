/**
 * @file lib/unique.js
 * @author leeight
 */

define(function (require) {
    var equal = require('./equal');

    function findIndex(arr, value, comparator) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (comparator(arr[i], value)) {
                return i;
            }

        }

        return -1;
    }

    function unique(arr) {
        return arr.filter(function uniqueOnly(value, index, self) {
            return findIndex(self, value, equal) === index;
        });
    }

    unique.findIndex = findIndex;

    return unique;
});
