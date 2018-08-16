import { expect } from 'chai';
import { curry } from "../src";

describe("curry", () => {
  it("should curry unary function", () => {
    const test = (a: number) => a > 0;

    const t = curry(test);

    expect(t).to.be.a("function");
    expect(t(1)).to.equal(true);
  });

  it("should curry nary function", () => {
    const test = (a: number, b: string) => a > 0 && b !== "";

    const t = curry(test);

    expect(t).to.be.a("function");
    expect(t(1)).to.be.a("function");
    expect(t(1)("a")).to.equal(true);
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
