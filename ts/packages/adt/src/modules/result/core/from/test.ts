import {
  type Err,
  err,
  type InferOks,
  ok,
  type Result,
} from "#result/primitive.js";
import { collect } from "./collection.js";

type Expect<T extends true> = T;
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

type Error1 = Err<Error>;
type Error2 = Err<string>;

type Error3 = Err<{ msg: string; ctxt: Record<string, unknown> }>;

interface User {
  id: number;
}
interface Config {
  optA: string;
  optB: "x" | "y";
  optC?: Array<User>;
  optD: [{ id: string }];
}

type ResString = Result<string, Error1>;
type ResUser = Result<User, Error2>;
type ResConfig = Result<Config, Error3>;

type ResNumber = Result<number, Error2>;
type ResUnion = Result<User | "anon", Error3>;

declare const resString: ResString;
declare const resUser: ResUser;
declare const resConfig: ResConfig;
declare const resNumber: ResNumber;
declare const resUnion: ResUnion;

const res = collect([]);

const tupleSimple = [resString] as const;
type TupleSimpleOks = InferOks<typeof tupleSimple>;

const tupleSimpleProcessed = collect(tupleSimple);

const tuple1 = collect([resString, resUser]);
type TestTuple1 = Expect<
  Equal<typeof tuple1, Result<[string, User], Error1 | Error2>>
>;

const tuple2 = collect([resConfig, resNumber, resUnion]);
type TestTuple2 = Expect<
  Equal<typeof tuple2, Result<[Config, number, User | "anon"], Error3 | Error2>>
>;

declare const dynamicArray: ResString[];
const arr1 = collect(dynamicArray);
type TestArr1 = Expect<Equal<typeof arr1, Result<string[], Error1>>>;

declare const mixedArray: Array<ResString | ResNumber>;
const arr2 = collect(mixedArray);
type TestArr2 = Expect<
  Equal<typeof arr2, Result<Array<string | number>, Error1 | Error2>>
>;

declare const setOfResults: Set<ResNumber | ResUnion>;
const iter1 = collect(setOfResults);
type TestIter1 = Expect<
  Equal<typeof iter1, Result<(number | User | "anon")[], Error2 | Error3>>
>;

const emptyTuple = collect([] as const);
type TestEmpty = Expect<Equal<typeof emptyTuple, Result<[], never>>>;

declare const guaranteedFail: Result<never, Error1>;
const neverTuple = collect([resString, guaranteedFail] as const);
type TestNever = Expect<
  Equal<typeof neverTuple, Result<[string, never], Error1>>
>;

declare const readonlyDynamic: readonly ResString[];
const arr3 = collect(readonlyDynamic);
