export const tryCatch = <T = void, C = T>(
  tryFn: () => T,
  catchFn: (cause: unknown) => C,
): T | C => {
  try {
    return tryFn();
  } catch (cause) {
    return catchFn(cause);
  }
};
export const tryCatchAsync = async <T = void, C = T>(
  tryFn: () => Promise<T>,
  catchFn: (cause: unknown) => Promise<C> | C,
): Promise<T | C> => {
  try {
    return await tryFn();
  } catch (cause) {
    return await catchFn(cause);
  }
};
