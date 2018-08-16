export type Head<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
export type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

export type Curry<H, T extends any[], R> = T extends [infer U, ...any[]]
  ? (arg: H) => Curry<Head<T>, Tail<T>, R>
  : (H extends any
     ? (arg: H) => R
     : () => R);

function isNullary<T extends any[], R>(f: (...args: T) => R, arity: number): f is () => R {
  return arity <= 0;
}

function isUnary<T extends any[], R>(f: (...args: T) => R, arity: number): f is (arg: Head<T>) => R {
  return arity === 1;
}

export function curry<T extends any[], R>(f: (...args: T) => R, arity?: number): Curry<Head<T>, Tail<T>, R> {
  const c = arity == null ? f.length : arity;

  if (isNullary(f, c)) {
    return (() => f()) as Curry<never, never, R>;
  } else if (isUnary(f, c)) {
    return ((arg: Head<T>) => f(arg)) as Curry<Head<T>, never, R>;
  } else {
    return ((arg: Head<T>) => curry((...args: Tail<T>) => {
      return f(...([arg as any, ...args as any[]] as T));
    }, c - 1)) as Curry<Head<T>, Tail<T>, R>;
  }
}
