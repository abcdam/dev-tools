import type { Expect, Identity } from "../types.ts";
import type { isRecordLike } from "./guard.ts";

/*
 * Quick tests
 */
type MyRecord = { id: number; label: string };
declare class Person {
  lastName: string;
}
type GetErrorFn = () => Error;
type UnionBag =
  | MyRecord
  | null
  | undefined
  | number
  | GetErrorFn
  | string[]
  | readonly number[]
  | [string, number]
  | Date
  | Person;

type InferGuard<T> = T extends (input: any) => input is infer R ? R : never;

type Got = InferGuard<typeof isRecordLike<UnionBag>>;
type Expected = MyRecord | Date | Person;
type _TestRecordOrClass = Expect<Identity<Got, Expected>>;
