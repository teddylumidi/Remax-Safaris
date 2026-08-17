export const PHONE_NUMBER_DISPLAY = '0795 723 450';
export const PHONE_NUMBER_INT = '254795723450';
export const COMPANY_EMAIL = 'info@remaxsafaris.com';
export const WHATSAPP_BASE_URL = `https://wa.me/${PHONE_NUMBER_INT}`;

export function getWhatsAppLink(customMessage?: string): string {
  if (!customMessage) {
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Hello Remax Safaris, I would like to make an inquiry about your tours and travel services.')}`;
  }
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(customMessage)}`;
}

export function formatPackageInquiry(
  packageTitle: string,
  durationOrPriceKES?: string | number,
  priceKESOrUSD?: number,
  priceUSD?: number
): string {
  let durationStr = '';
  let kesVal: number | undefined;
  let usdVal: number | undefined;

  if (typeof durationOrPriceKES === 'string') {
    durationStr = durationOrPriceKES;
    kesVal = priceKESOrUSD;
    usdVal = priceUSD;
  } else if (typeof durationOrPriceKES === 'number') {
    kesVal = durationOrPriceKES;
    usdVal = priceKESOrUSD;
  }

  const durText = durationStr ? `\n⏱️ *Duration:* ${durationStr}` : '';
  const priceKesText = typeof kesVal === 'number' && !isNaN(kesVal) ? `KES ${kesVal.toLocaleString()}` : '';
  const priceUsdText = typeof usdVal === 'number' && !isNaN(usdVal) ? ` / USD $${usdVal.toLocaleString()}` : '';
  const priceLine = (priceKesText || priceUsdText) ? `\n💰 *Price:* ${priceKesText}${priceUsdText}` : '';

  return `Hello Remax Safaris! 👋\n\nI am interested in booking the following tour package:\n\n🐘 *Package:* ${packageTitle}${durText}${priceLine}\n\nPlease share availability, starting dates, and payment options. Thank you!`;
}

export function formatDestinationInquiry(destinationName: string, category: 'kenya' | 'international'): string {
  const typeLabel = category === 'kenya' ? 'Kenya Safari/Beach Destination' : 'International Holiday Destination';
  return `Hello Remax Safaris! 🌍\n\nI am planning a trip to *${destinationName}* (${typeLabel}).\n\nPlease send me customized travel packages, hotel options, and current offers for this destination.\n\nThank you!`;
}

export function formatServiceInquiry(serviceTitle: string): string {
  return `Hello Remax Safaris! 📋\n\nI would like assistance with *${serviceTitle}*.\n\nPlease guide me on the required documents, costs, and timeline. Thank you!`;
}

export function formatCustomQuoteInquiry(data: {
  destination: string;
  travelers: number;
  date: string;
  duration: number;
  budget: string;
  name: string;
  phone: string;
  serviceType: string;
  notes?: string;
}): string {
  return `Hello Remax Safaris! ✈️\n\nI would like to request a custom travel quote:\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${data.phone}\n📍 *Destination:* ${data.destination}\n🛠️ *Service Needed:* ${data.serviceType}\n👥 *Travelers:* ${data.travelers} Pax\n📅 *Travel Date:* ${data.date}\n⏱️ *Duration:* ${data.duration} Days\n💎 *Budget Class:* ${data.budget}\n${data.notes ? `📝 *Notes:* ${data.notes}\n` : ''}\nPlease send me a detailed itinerary and pricing!`;
}
