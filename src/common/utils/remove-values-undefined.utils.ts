export const removeValuesUndefined = <T extends Record<string, any>>(
  data: T,
) => {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );
};
