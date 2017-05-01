"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2017/5/1 0001.
 */
var myEvent = exports.myEvent = function () {
    function myEvent() {
        _classCallCheck(this, myEvent);

        this.events = {};
    }

    _createClass(myEvent, [{
        key: "on",
        value: function on(attr, callback) {
            if (this.events[attr]) {
                this.events[attr].push(callback);
            } else {
                this.events[attr] = [callback];
            }
        }
    }, {
        key: "off",
        value: function off(attr) {
            if (this.events.hasOwnProperty(attr)) {
                delete this.events(attr);
            }
        }
    }, {
        key: "emit",
        value: function emit(attr) {
            for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                arg[_key - 1] = arguments[_key];
            }

            this.events[attr] && this.events[attr].forEach(function (item) {
                item.apply(undefined, arg);
            });
        }
    }]);

    return myEvent;
}();
