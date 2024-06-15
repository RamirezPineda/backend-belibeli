export function calculatePercentageDifferent(amountA: number, amountB: number) {
  const divider = amountB !== 0 ? amountB : 1;
  return ((amountA - amountB) / divider) * 100;
}
