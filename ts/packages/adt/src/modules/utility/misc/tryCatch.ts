export const tryCatch = <T, C>(
  tryFn: () => T,
  catchFn: (cause: unknown) => C,
): T | C => {
  try {
    return tryFn();
  } catch (cause) {
    return catchFn(cause);
  }
};
export const tryCatchAsync = async <T, C>(
  tryFn: () => Promise<T>,
  catchFn: (cause: unknown) => C,
): Promise<T | C> => {
  try {
    return await tryFn();
  } catch (cause) {
    return catchFn(cause);
  }
};
