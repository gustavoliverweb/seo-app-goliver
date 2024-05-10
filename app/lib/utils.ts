export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("es-VE", {
    style: "currency",
    currency: "VES",
  });
};

export const formatDollarCurrency = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function getBsPrice(buyPriceDollar: number, currentDollarPrice: number) {
  return buyPriceDollar * currentDollarPrice;
}
export function getDollarPrice(pvp: number, currentDollarPrice: number) {
  const amount = pvp / currentDollarPrice;
  const format = formatDollarCurrency(amount);
  return format;
}

export function getPvpPrice(
  buyPriceDollar: number,
  currentDollarPrice: number,
  quantity: number
) {
  // const pvp = Number(
  //   ((buyPriceDollar * currentDollarPrice) / quantity).toFixed(2)
  // );
  // const format = formatCurrency(pvp);
  return Number(((buyPriceDollar * currentDollarPrice) / quantity).toFixed(2));
}

export function getSellPrice(
  buyPriceDollar: number,
  currentDollarPrice: number,
  quantity: number,
  revenue: number
) {
  const pvp = getPvpPrice(buyPriceDollar, currentDollarPrice, quantity);
  const revenueAmount = pvp * revenue;
  const total = Number((revenueAmount + pvp).toFixed(2));
  // const format = formatCurrency(total);
  // console.log(format);
  // console.log(revenueAmount);
  // console.log(pvp);
  // console.log((buyPriceDollar * currentDollarPrice) / quantity);
  return total;
}

export function ramdomSecureId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

// export function debounce(func: Function, delay: number) {
//   let timeoutId: NodeJS.Timeout;

//   return function (...args: any[]) {
//     clearTimeout(timeoutId);

//     timeoutId = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }
