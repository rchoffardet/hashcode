"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hashcode = /** @class */ (function () {
    function Hashcode() {
    }
    Hashcode.value = function (value) {
        if (value === null || value === undefined) {
            return 0;
        }
        var type = typeof value;
        switch (type) {
            case "boolean":
                return Hashcode.boolean(value);
            case "number":
                return Hashcode.number(value);
            case "string":
                return Hashcode.string(value);
            case "object":
                return Hashcode.object(value);
            default:
                throw new Error(type + " is not yet supported.");
        }
    };
    Hashcode.boolean = function (value) {
        return Hashcode.number(value ? 1 : 0);
    };
    Hashcode.number = function (value) {
        var buffer = new ArrayBuffer(8);
        var bufferAsF64 = new Float64Array(buffer);
        var bufferAsI32 = new Int32Array(buffer);
        if (~~value === value) {
            return ~~value;
        }
        bufferAsF64[0] = value;
        return bufferAsI32[0] ^ bufferAsI32[1];
    };
    Hashcode.string = function (value) {
        var hash = 37;
        for (var i = 0; i < value.length; i++) {
            var charCode = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + charCode;
            hash |= 0;
        }
        return hash;
    };
    Hashcode.date = function (value) {
        var typeName = Hashcode.string(value.constructor.name);
        var content = Hashcode.number(value.valueOf());
        return Hashcode.combine(typeName, content);
    };
    Hashcode.array = function (value) {
        return Hashcode.object(value);
    };
    Hashcode.object = function (value) {
        var typeName = Hashcode.string(value.constructor.name);
        var entries = Object.entries(value);
        if (entries.length == 0) {
            return Hashcode.combine(typeName, 0);
        }
        return Hashcode.combine.apply(Hashcode, __spreadArrays([typeName], entries.map(function (_a) {
            var key = _a[0], value = _a[1];
            return Hashcode.combine(Hashcode.value(key), Hashcode.value(value));
        })));
    };
    Hashcode.combine = function () {
        var hashcodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            hashcodes[_i] = arguments[_i];
        }
        if (hashcodes.length == 0) {
            return 0;
        }
        return hashcodes.reduce(function (a, b) { return ((a << 5) + a) ^ b; });
    };
    return Hashcode;
}());
exports.default = Hashcode;
