const getIndex = (value: string, subtractions: number[]) => {
  const num = Number(value);

  return !Number.isNaN(num)
    ? subtractions.reduce(
        // eslint-disable-next-line no-param-reassign
        (index, sub) => (sub < index ? index - 1 : index),
        num
      )
    : undefined;
};

export const omit = (obj: object | [] | undefined, paths: string[] | undefined = []) => {
  if (!obj || !paths) {
    return undefined;
  }

  const subtractions: number[] = [];

  return paths.reduce((acc, path) => {
    const deepIndex = path.indexOf('.');
    const isArray = Array.isArray(acc);

    if (deepIndex !== -1) {
      const rawKey = path.slice(0, deepIndex);
      const key = (isArray ? getIndex(rawKey, subtractions) : rawKey) as keyof typeof acc;
      const nestedKeys = path.slice(deepIndex + 1);

      if (key) {
        acc[key] = omit(acc[key], [nestedKeys]) as never;
      }
    } else {
      if (Array.isArray(acc)) {
        const idx = getIndex(path, subtractions);

        if (idx === undefined) {
          return acc;
        }

        // eslint-disable-next-line no-param-reassign
        acc = acc.slice(0, idx).concat(acc.slice(idx + 1));
        subtractions.push(idx);
      } else {
        if (path in acc) {
          delete acc[path as keyof typeof acc];
        }
      }
    }

    return acc;
  }, obj);
};
