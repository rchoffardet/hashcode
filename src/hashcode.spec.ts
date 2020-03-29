import { expect } from "chai";
import { given } from "mocha-testdata";
import Hashcode from "./hashcode";

describe("Hashcode", () => 
{
    const boundaries = {start:-2147483648, finish:2147483647};

    function assert(value: any, duplicate: any, hash:(a: any) => number)
    {
        const a = hash(value);
        const b = hash(duplicate);

        expect(a)
            .to.be.within(boundaries.start, boundaries.finish)
            .and.to.be.equal(b);
    }

    given([true, true], [false, false]).test("hashes boolean", (...[a, b]) => 
    {
        assert(a, b, Hashcode.boolean);
        assert(a, b, Hashcode.value);
    });

    given([0, 0], [1,1],[-42e6, -42e6], [2e71,2e71]).test("hashes number", (...[a, b]) => 
    {
        assert(a, b, Hashcode.number);
        assert(a, b, Hashcode.value);
    });

    given([NaN, NaN], [Infinity, Infinity]).test("hashes special number", (...[a, b]) => 
    {
        assert(a, b, Hashcode.number);
        assert(a, b, Hashcode.value);
    });
    
    given(
        ["a", "a"], 
        ["Lorem ipsum dolor sit amet, consectetur adipiscing elit", "Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    ).test("hashes string", (...[a, b]) => 
    {
        assert(a, b, Hashcode.number);
        assert(a, b, Hashcode.value);
    });

    given([{a:1}, {a:1}], [[1,"ae", {a:1}],[1,"ae", {a:1}]]).test("hashes object", (...[a, b]) => 
    {
        assert(a, b, Hashcode.object);
        assert(a, b, Hashcode.value);
    });

    var time = new Date().valueOf(); // number of milliseconds
    given([new Date(time), new Date(time)], [new Date(0), new Date(0)]).test("hashes date", (...[a, b]) => 
    {
        assert(a, b, Hashcode.object);
        assert(a, b, Hashcode.value);
    });
})