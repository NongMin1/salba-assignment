export type CurrencyCode = "USD" | "GBP" | "EUR";
export type DateString = string & { readonly __brand: "DateString" };
export type ExchangeRate = number & { readonly __brand: "ExchangeRate" };

export interface CurrencyRate {
  currencyCode: CurrencyCode;
  rate: ExchangeRate;
  date: DateString;
  baseCurrency: CurrencyCode;
}

export interface TestData {
  targetCurrency: CurrencyCode;
  expectedRate: ExchangeRate;
  date: DateString;
}

export function createDateString(dateStr: string): DateString {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error(`Invalid date format: ${dateStr}. Expected YYYY-MM-DD`);
  }
  return dateStr as DateString;
}

export function createExchangeRate(rate: number): ExchangeRate {
  if (rate <= 0) {
    throw new Error(`Invalid exchange rate: ${rate}. Must be positive`);
  }
  return rate as ExchangeRate;
}

export const VALID_CURRENCIES: CurrencyCode[] = ["USD", "GBP", "EUR"];

export function isCurrencyCode(code: string): code is CurrencyCode {
  return VALID_CURRENCIES.includes(code as CurrencyCode);
}
