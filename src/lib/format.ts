import { siteConfig } from '../data/site';

/**
 * Format a number as a price string with the configured currency symbol.
 */
export function formatPrice(amount: number): string {
  return `${siteConfig.currency}${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate discount percentage between oldPrice and current price.
 */
export function discountPercent(price: number, oldPrice: number): number {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
