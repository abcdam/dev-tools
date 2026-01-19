export type Awaitable<T> = T | Promise<T>;

export type PolicyBranch<M1, M2> =
  | { branch: "left"; value: M1 }
  | { branch: "right"; value: M2 };
