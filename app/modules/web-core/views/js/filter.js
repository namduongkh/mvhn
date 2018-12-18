(function() {
    'use strict';

    angular.module("Core")
        .filter("vndCurrency", vndCurrency);

    function vndCurrency() {
        return function(data, kStep, short) {

            if (kStep) {
                data = parseFloat(data) + parseFloat(kStep);
                if (short) {
                    data /= 1000;
                }
            }

            if (data == 0) return "0 đ";

            if (data) {

                data = data.toString().split('').reverse();

                var output = '';
                for (var i = 1; i <= data.length; i++) {
                    if (i % 3 == 0 && i != 0) {
                        output += (data[i - 1] + '.');
                    } else {
                        output += data[i - 1];
                    }
                }

                var outputTmp = output.split('').reverse();

                if (outputTmp[0] == '.') {
                    outputTmp.splice(0, 1);
                }

                if (!short) {
                    return outputTmp.join('') + ' đ';
                } else {
                    return outputTmp.join('').toString();
                }
            }
        };
    }
})();