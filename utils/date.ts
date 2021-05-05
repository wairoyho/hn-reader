// in miliseconds
const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

// @ts-ignore
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const getRelativeTime = (d1: any, d2 = new Date()) => {
  // @ts-ignore
  const elapsed = d1 - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios

  for (const u in units) {
    // @ts-ignore
    if (Math.abs(elapsed) > units[u] || u == "second")
      // @ts-ignore
      return rtf.format(Math.round(elapsed / units[u]), u);
  }
};
