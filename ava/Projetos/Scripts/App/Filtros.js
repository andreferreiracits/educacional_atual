/**
* Usage:
*   {{some_text | cut:true:100:' ...'}}
* Options:
*   - wordwise (boolean) - if true, cut only by words bounds,
*   - max (integer) - max length of the text, cut to this number of chars,
*   - tail (string, default: '&nbsp;&hellip;') - add this string to the input
*     string if the string was cut.
*/
''
//(function () {
    var app = angular.module('filtros', [])
    app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    });

    app.filter('jDate', function () {
        return function (value) {
            if (typeof value != 'object') return '';
            return value.toLocaleDateString();
        };
    });

    app.filter('ctime', function () {
        return function (jsonDate) {
            var date = new Date(parseInt(jsonDate.substr(6)));
            return date;
        };

    });

    app.filter('newlines', function (text) {
        return text.replace(/\n/g, '<br/>');
    });

    // filters js
    app.filter("nl2br", function ($filter) {
        return function (data) {
            if (!data) return data;
            return data.replace(/\n\r?/g, '<br />');
        };
    });
    app.filter("strip", function () {
        return function (html) {
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        }
    });

    app.filter("urlRedirect", function () {
        return function (link) {
            var result;
            var startingUrl = "http://";
            var httpsStartingUrl = "https://";
            var relativeUrl = "/";

            if (link.startWith(startingUrl) || link.startWith(httpsStartingUrl) || link.startWith(relativeUrl)) {
                result = link;
            }
            else {
                result = startingUrl + link;
            }
            return result;
        }
    });
        String.prototype.startWith = function (str) {
        return this.indexOf(str) == 0;
    };
//})();