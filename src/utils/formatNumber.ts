export const formatNumber = (numString: string | undefined): string => {
  if (!numString) return "";
  const num = Number(numString);
  const absNum = Math.abs(num);

  if (absNum < 1000) {
    return num.toString();
  } else if (absNum < 1000000) {
    return (num / 1000).toFixed(absNum < 10000 ? 2 : absNum < 100000 ? 1 : 0) + "K";
  } else if (absNum < 1000000000) {
    return (num / 1000000).toFixed(absNum < 10000000 ? 2 : absNum < 100000000 ? 1 : 0) + "M";
  } else {
    return (num / 1000000000).toFixed(2) + "G";
  }
};
