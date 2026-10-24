import { siteConfig } from '../data/site';
import type { Product, ProductSize } from '../data/products';

interface OrderItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

/**
 * Build a WhatsApp order message from the current order items.
 */
export function buildWhatsAppOrderMessage(items: OrderItem[]): string {
  const lines: string[] = [siteConfig.whatsappGreeting, ''];

  items.forEach((item, i) => {
    lines.push(
      `${i + 1}. ${item.product.name} — ${item.size.label} × ${item.quantity} = ${siteConfig.currency}${(item.size.price * item.quantity).toLocaleString('en-IN')}`
    );
  });

  const total = items.reduce((sum, i) => sum + i.size.price * i.quantity, 0);
  lines.push('');
  lines.push(`Total: ${siteConfig.currency}${total.toLocaleString('en-IN')}`);
  lines.push('');
  lines.push('Please share the delivery address and confirm availability. Thank you!');

  return lines.join('\n');
}

/**
 * Build a WhatsApp message for a single product quick-buy.
 */
export function buildSingleProductMessage(
  product: Product,
  size: ProductSize,
  quantity: number
): string {
  return [
    siteConfig.whatsappGreeting,
    '',
    `I'd like to order:`,
    `${product.name} — ${size.label} × ${quantity} = ${siteConfig.currency}${(size.price * quantity).toLocaleString('en-IN')}`,
    '',
    'Please share the delivery details. Thank you!',
  ].join('\n');
}

/**
 * Open WhatsApp with a pre-filled message.
 */
export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(
    `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`,
    '_blank',
    'noopener,noreferrer'
  );
}

/**
 * Open WhatsApp with a consultation form message.
 */
export function openWhatsAppConsultation(fields: {
  name: string;
  phone: string;
  notes: string[];
  message: string;
}): void {
  const text = [
    siteConfig.whatsappGreeting,
    '',
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Preferred Notes: ${fields.notes.join(', ') || 'Not specified'}`,
    `Message: ${fields.message || 'N/A'}`,
  ].join('\n');
  openWhatsApp(text);
}
