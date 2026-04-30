import type {
  Oper,
  OperAThink,
  OperAThonk,
  OperEcho,
  OperThink,
  OperThonk,
  OperThunk,
} from "#utility/types/oper.js";
import type { Option } from "../../primitive.js";

type TapNone = <T>(o: Option<T>) => Option<T>;
type TapNoneAsync = <T>(o: Option<T>) => Promise<Option<T>>;
type TapSomeAsync<in out T> = (o: Option<T>) => Promise<Option<T>>;
type TapSome<in out T> = OperEcho<Option<T>>;

export const tap: <T>(think: OperThink<T>) => TapSome<T> = think => opt => {
  if (opt.exists === true) think(opt.val);
  return opt;
};
export const tapNone: (thonk: OperThonk) => TapNone = thonk => opt => {
  if (opt.exists === false) thonk();
  return opt;
};

export const tapAsync: <T>(thinkA: OperAThink<T>) => TapSomeAsync<T> =
  thinkA => async opt => {
    if (opt.exists === true) await thinkA(opt.val);
    return opt;
  };
export const tapNoneAsync: (thonkA: OperAThonk) => TapNoneAsync =
  thonkA => async opt => {
    if (opt.exists === false) await thonkA();
    return opt;
  };

type CtxtProviderTap<Ctxt> = <T>(provider: Oper<T, Ctxt>) => TapSome<T>;
type CtxtProviderTapNone<Ctxt> = (provider: OperThunk<Ctxt>) => TapNone;
type Middleware<Ctxt, SinkIn> = OperThunk<Oper<Ctxt, SinkIn> | false>;

export const serviceTap =
  <Ctxt>() =>
  <SinkIn>(
    middleware: Middleware<Ctxt, SinkIn>,
    sink: OperThink<SinkIn>,
  ): CtxtProviderTap<Ctxt> =>
  provider =>
    tap(value => {
      const run = middleware();
      if (run) sink(run(provider(value)));
    });

export const serviceTapNone =
  <Ctxt>() =>
  <SinkIn>(
    middleware: Middleware<Ctxt, SinkIn>,
    sink: OperThink<SinkIn>,
  ): CtxtProviderTapNone<Ctxt> =>
  provider =>
    tapNone(_ => {
      const run = middleware();
      if (run) sink(run(provider()));
    });
