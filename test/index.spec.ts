import { expect } from 'chai';
import { curry } from "../src";

describe("curry", () => {
  it("should curry unary function", () => {
    const test = (a: number) => a > 0;

    const t = curry(test);

    expect(t).to.be.a("function");
    expect(t(1)).to.equal(true);
  });

  it("should curry n-ary function (2 arguments)", () => {
    const test = (a: number, b: string) => a > 0 && b !== "";

    const t = curry(test);

    expect(t).to.be.a("function");
    expect(t(1)).to.be.a("function");
    expect(t(1)("a")).to.equal(true);
  });

  it("should curry n-ary function (3 arguments)", () => {
    const test = (a: number, b: string, c: number[]) => a > 0 && b !== "" && c.length > 0;

    const t = curry(test);

    expect(t).to.be.a("function");
    expect(t(1)).to.be.a("function");
    expect(t(1)("a")).to.be.a("function");
    expect(t(1)("a")([3])).to.equal(true);
  });

  it("should curry async function", async () => {
    const test = async (a: number, b: string) => a > 0 && b !== "";

    const t = curry(test);

    expect(t).to.be.a("function");
    expect(t(1)).to.be.a("function");
    expect(t(1)("a")).to.be.a("promise");
    expect(await t(1)("a")).to.equal(true);
  });
});
