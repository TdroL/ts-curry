export type Head<T extends any[]> = T extends [infer U, ...any[]] ? U : never;
export type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

export type Curry<H, T extends any[], R> = T extends [infer U, ...any[]]
    ? (arg: H) => Curry<Head<T>, Tail<T>, R>
    : (H extends any
       ? (arg: H) => R
       : () => R);

function isHeadCallable<T extends any[], R>(f: (...args: T) => R): f is Curry<Head<T>, never, R> {
  return f.length === 0 || f.length === 1;
}

export function curry<T extends any[], R>(f: (...args: T) => R): Curry<Head<T>, Tail<T>, R> {
  if (isHeadCallable(f)) {
    return f;
  } else {
    return ((arg: Head<T>) => curry((...args: Tail<T>) => {
      return f(...([arg as any, ...args as any[]] as T));
    })) as Curry<Head<T>, Tail<T>, R>;
  }
}
