export function getDateMonths() {
  const today = new Date();
  const currentMoth = today.getMonth(); // (0 - 11)
  const currentYear = today.getFullYear();

  const firstDayCurrentMoth = new Date(currentYear, currentMoth, 1);
  const lastDayCurrentMoth = new Date(currentYear, currentMoth + 1, 0);

  const firstDayLastMonth = new Date(currentYear, currentMoth - 1, 1);
  const lastDayLastMonth = new Date(currentYear, currentMoth, 0);

  return {
    firstDayCurrentMoth,
    lastDayCurrentMoth,
    firstDayLastMonth,
    lastDayLastMonth,
  };
}
