import React, { useEffect } from 'react';
import { Destination, TourPackage } from '../types';

interface SeoHeadProps {
  selectedDestination?: Destination | null;
  selectedPackage?: TourPackage | null;
  activeSection?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  selectedDestination,
  selectedPackage,
  activeSection = 'home'
}) => {
  useEffect(() => {
    // Base canonical domain
    const baseUrl = 'https://remaxsafaris.com';
    let pageTitle = 'Remax Safaris - Premier Kenya Safaris & Global Travel Consultancy';
    let metaDescription = 'Book extraordinary Kenya wildlife safaris, Maasai Mara migration tours, Diani beach holidays, global vacation packages, visa processing, and flight ticketing with Remax Safaris.';
    let canonicalUrl = baseUrl;

    if (selectedDestination) {
      pageTitle = `${selectedDestination.name} Safari & Tour Package | Remax Safaris`;
      metaDescription = `Experience ${selectedDestination.name} with Remax Safaris: ${selectedDestination.tagline}. ${selectedDestination.description.slice(0, 120)}...`;
      canonicalUrl = `${baseUrl}/#destination-${selectedDestination.id}`;
    } else if (selectedPackage) {
      pageTitle = `${selectedPackage.title} | Remax Safaris`;
      metaDescription = `Book the ${selectedPackage.title} (${selectedPackage.duration}) for KES ${selectedPackage.priceKES?.toLocaleString() ?? 0} / $${selectedPackage.priceUSD ?? 0} USD. All-inclusive luxury safari experience with Remax Safaris.`;
      canonicalUrl = `${baseUrl}/#package-${selectedPackage.id}`;
    } else if (activeSection && activeSection !== 'home') {
      const formattedSection = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
      pageTitle = `${formattedSection} | Remax Safaris - Tours & Travel`;
      canonicalUrl = `${baseUrl}/#${activeSection}`;
    }

    // Update document title
    document.title = pageTitle;

    // Update Meta Description
    let metaDescElement = document.querySelector('meta[name="description"]');
    if (!metaDescElement) {
      metaDescElement = document.createElement('meta');
      metaDescElement.setAttribute('name', 'description');
      document.head.appendChild(metaDescElement);
    }
    metaDescElement.setAttribute('content', metaDescription);

    // Update OG Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', metaDescription);
    }

    // Update OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }

    // Update Canonical link tag
    let canonicalLinkElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalLinkElement) {
      canonicalLinkElement = document.createElement('link');
      canonicalLinkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLinkElement);
    }
    canonicalLinkElement.setAttribute('href', canonicalUrl);

    // Dynamic Schema.org JSON-LD Structured Data
    const jsonLdId = 'remax-safaris-jsonld';
    let scriptElement = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = jsonLdId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      'name': 'Remax Safaris',
      'description': metaDescription,
      'url': canonicalUrl,
      'telephone': '+254795723450',
      'email': 'info@remaxsafaris.com',
      'priceRange': '$$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Nairobi',
        'addressCountry': 'KE'
      },
      'sameAs': [
        'https://www.instagram.com/remax_safaris?utm_source=qr',
        'https://www.tiktok.com/@remax.safaris?_r=1&_t=ZS-98m1ynGAZE7',
        'https://facebook.com',
        'https://twitter.com'
      ]
    };

    scriptElement.textContent = JSON.stringify(structuredData);

  }, [selectedDestination, selectedPackage, activeSection]);

  return null;
};
