import type {
  Oper,
  OperAThink,
  OperThink,
  OperThunk,
} from "#utility/types/oper.js";
import type { Result } from "../../primitive.js";

type TapOk<in out T> = <E>(r: Result<T, E>) => Result<T, E>;
type TapErr<in out E> = <T>(r: Result<T, E>) => Result<T, E>;

type TapOkAsync<in out T> = <E>(r: Result<T, E>) => Promise<Result<T, E>>;
type TapErrAsync<in out E> = <T>(r: Result<T, E>) => Promise<Result<T, E>>;

export const tap: <T>(think: OperThink<T>) => TapOk<T> = think => r => {
  if (r.ok === true) think(r.val);
  return r;
};

export const tapErr: <E>(think: OperThink<E>) => TapErr<E> = think => r => {
  if (r.ok === false) think(r.err);
  return r;
};
export const tapAsync: <T>(thinkA: OperAThink<T>) => TapOkAsync<T> =
  thinkA => async r => {
    if (r.ok === true) await thinkA(r.val);
    return r;
  };

export const tapErrAsync: <E>(thinkA: OperAThink<E>) => TapErrAsync<E> =
  thinkA => async r => {
    if (r.ok === false) await thinkA(r.err);
    return r;
  };

// const levels = ["trace", "debug", "info", "warn", "error", "none"] as const;
export const createResultTap =
  <Ctxt, SinkIn>() =>
  (
    middleware: OperThunk<Oper<Ctxt, SinkIn> | false>,
    sink: OperThink<SinkIn>,
  ) =>
  <T>(provider: Oper<T, Ctxt>): TapOk<T> =>
    tap(value => {
      const run = middleware();
      if (run) {
        sink(run(provider(value)));
      }
    });

export const createResultTapErr =
  <Ctxt, SinkIn, Err>() =>
  (
    middleware: Oper<Err, Oper<Ctxt, SinkIn> | false>,
    sink: OperThink<SinkIn>,
  ): (<E extends Err>(provider: Oper<void, Ctxt>) => TapErr<E>) =>
  provider =>
    tapErr(value => {
      const run = middleware(value);
      if (run) sink(run(provider()));
    });
