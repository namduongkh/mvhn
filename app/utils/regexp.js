'use strict';
const _ = require("lodash");

exports.RegExp = function(string, match) {
    // let now = new Date();
    var result;
    let split = string.split(" ");
    let join = _.map(split, function(char) {
        let flag = true;
        try {
            new RegExp(char, 'i');
        } catch (e) {
            flag = false;
        }
        if (!flag) {
            let split = char.split("");
            let join = _.map(split, function(char) {
                let flag = true;
                try {
                    new RegExp(char, 'i');
                } catch (e) {
                    flag = false;
                }
                if (!flag) {
                    return "\\" + char;
                } else {
                    return char;
                }
            });
            return join.join("");
        } else {
            return char;
        }
    });

    result = new RegExp(join.join(" "), match);
    // console.log("Result: ", result, " time: ", new Date() - now);
    return result;
}