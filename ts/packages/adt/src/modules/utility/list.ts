export const map_: <T, U>(
  cb: (item: T, idx: number) => U,
) => (list: T[]) => U[] = cb => list => list.map(cb);
