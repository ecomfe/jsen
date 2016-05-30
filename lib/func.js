/**
 * @file lib/func.js
 * @author leeight
 */

define(function (require) {
    return function () {
        var name = arguments[0] || '';
        var args = [].join.call([].slice.call(arguments, 1), ', ');
        var lines = '';
        var vars = '';
        var ind = 1;
        var tab = '  ';
        var bs = '{['; // block start
        var be = '}]'; // block end
        var space = function () {
            return new Array(ind + 1).join(tab);
        };
        var push = function (line) {
            lines += space() + line + '\n';
        };
        var builder = function (line) {
            var first = line[0];
            var last = line[line.length - 1];

            if (be.indexOf(first) > -1 && bs.indexOf(last) > -1) {
                ind--;
                push(line);
                ind++;
            }
            else if (bs.indexOf(last) > -1) {
                push(line);
                ind++;
            }
            else if (be.indexOf(first) > -1) {
                ind--;
                push(line);
            }
            else {
                push(line);
            }

            return builder;
        };

        builder.def = function (id, def) {
            vars += space() + 'var ' + id + (def !== undefined ? ' = ' + def : '') + '\n';

            return builder;
        };

        builder.toSource = function () {
            return 'function ' + name + '(' + args + ') {\n' + vars + '\n' + lines + '\n}';
        };

        builder.compile = function (scope) {
            var src = 'return (' + builder.toSource() + ')';
            var scp = scope || {};
            var keys = Object.keys(scp);
            var vals = keys.map(function (key) {
                return scp[key];
            });

            return Function.apply(null, keys.concat(src)).apply(null, vals);
        };

        return builder;
    };
});
