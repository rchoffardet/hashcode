"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_testdata_1 = require("mocha-testdata");
var hashcode_1 = require("./hashcode");
describe("Hashcode", function () {
    var boundaries = { start: -2147483648, finish: 2147483647 };
    function assert(value, duplicate, hash) {
        var a = hash(value);
        var b = hash(duplicate);
        chai_1.expect(a)
            .to.be.within(boundaries.start, boundaries.finish)
            .and.to.be.equal(b);
    }
    mocha_testdata_1.given([true, true], [false, false]).test("hashes boolean", function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var a = _a[0], b = _a[1];
        assert(a, b, hashcode_1.default.boolean);
        assert(a, b, hashcode_1.default.value);
    });
    mocha_testdata_1.given([0, 0], [1, 1], [-42e6, -42e6], [2e71, 2e71]).test("hashes number", function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var a = _a[0], b = _a[1];
        assert(a, b, hashcode_1.default.number);
        assert(a, b, hashcode_1.default.value);
    });
    mocha_testdata_1.given([NaN, NaN], [Infinity, Infinity]).test("hashes special number", function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var a = _a[0], b = _a[1];
        assert(a, b, hashcode_1.default.number);
        assert(a, b, hashcode_1.default.value);
    });
    mocha_testdata_1.given(["a", "a"], ["Lorem ipsum dolor sit amet, consectetur adipiscing elit", "Lorem ipsum dolor sit amet, consectetur adipiscing elit"]).test("hashes string", function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var a = _a[0], b = _a[1];
        assert(a, b, hashcode_1.default.number);
        assert(a, b, hashcode_1.default.value);
    });
    mocha_testdata_1.given([{ a: 1 }, { a: 1 }], [[1, "ae", { a: 1 }], [1, "ae", { a: 1 }]]).test("hashes object", function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var a = _a[0], b = _a[1];
        assert(a, b, hashcode_1.default.object);
        assert(a, b, hashcode_1.default.value);
    });
    var time = new Date().valueOf(); // number of milliseconds
    mocha_testdata_1.given([new Date(time), new Date(time)], [new Date(0), new Date(0)]).test("hashes date", function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var a = _a[0], b = _a[1];
        assert(a, b, hashcode_1.default.object);
        assert(a, b, hashcode_1.default.value);
    });
});
