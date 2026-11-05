import { site } from '../config/site';

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const waGeneral = () =>
  waLink(`Hello ${site.name}, I would like to know more about water purifiers and service.`);

export const waProduct = (product: string) =>
  waLink(`Hello ${site.name}, I am interested in the ${product}. Please share details and availability.`);

export const telLink = (e164: string) => `tel:${e164}`;
