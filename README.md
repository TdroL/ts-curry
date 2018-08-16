# ts-curry
Expecrimental TypeScript currying

```ts
function test(a: number, b: string, c: number[]): boolean {
	return a > 0 && b !== "" && c.length > 0;
}

const fn = curry(test);      // => (arg: number) => (arg: string) => (arg: number[]) => boolean
const fn0 = fn(1);           // => (arg: string) => (arg: number[]) => boolean
const fn1 = fn(1)("2");      // => (arg: number[]) => boolean
const fn2 = fn(1)("2")([3]); // => boolean
```