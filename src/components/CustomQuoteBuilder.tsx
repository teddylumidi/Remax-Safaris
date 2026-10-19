import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { formatCustomQuoteInquiry, getWhatsAppLink } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Calendar, Users, DollarSign, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface CustomQuoteBuilderProps {
  initialDestination?: string;
  initialService?: string;
}

export const CustomQuoteBuilder: React.FC<CustomQuoteBuilderProps> = ({
  initialDestination = '',
  initialService = 'Full Safari / Vacation Package'
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(initialDestination || 'Maasai Mara');
  const [serviceType, setServiceType] = useState(initialService);
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [budgetPreference, setBudgetPreference] = useState<'Economy' | 'Mid-Range' | 'Luxury' | 'Ultra-Luxury'>('Mid-Range');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [whatsappPopupBlocked, setWhatsappPopupBlocked] = useState(false);
  const [whatsappFallbackLink, setWhatsappFallbackLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMsg = formatCustomQuoteInquiry({
      destination: selectedDestination,
      travelers: travelersCount,
      date: travelDate || 'Flexible / TBD',
      duration: durationDays,
      budget: budgetPreference,
      name: customerName || 'Valued Traveler',
      phone: customerPhone || 'Not provided',
      serviceType: serviceType,
      notes: specialRequests
    });

    const whatsappWindow = window.open('about:blank', '_blank');
    setIsSubmitting(true);
    setSubmitError('');
    setWhatsappPopupBlocked(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          destination: selectedDestination,
          serviceType,
          travelers: travelersCount,
          travelDate: travelDate || 'Flexible / TBD',
          duration: durationDays,
          budget: budgetPreference,
          notes: specialRequests
        })
      });
      const result: unknown = await response.json();
      const errorMessage =
        typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string'
          ? result.error
          : 'We could not send your enquiry. Please try again.';

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      setSubmitted(true);
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.location.href = getWhatsAppLink(formattedMsg);
      } else {
        setWhatsappPopupBlocked(true);
        setWhatsappFallbackLink(getWhatsAppLink(formattedMsg));
      }
    } catch (error) {
      const whatsappLink = getWhatsAppLink(formattedMsg);
      setWhatsappFallbackLink(whatsappLink);
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.location.href = whatsappLink;
      } else {
        setWhatsappPopupBlocked(true);
      }
      setSubmitError(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="custom-quote" className="py-16 sm:py-24 bg-[#F4F1EA] dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#1B4332] text-white p-8 sm:p-10 space-y-3 relative overflow-hidden">
            
            <span className="inline-block px-3.5 py-1 rounded-md bg-[#D4A373] text-white text-[11px] font-black uppercase tracking-[0.25em]">
              Tailor-Made Vacation Planner
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              Get Your Instant Custom Safari & Travel Quote
            </h2>

            <p className="text-gray-200 text-sm sm:text-base max-w-2xl">
              Tell us your dream destination, travel dates, group size, and budget preferences. Your request will be emailed to our team and opened in WhatsApp (<strong>0795 723 450</strong>).
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6 bg-white dark:bg-slate-900">
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0712 345 678"
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                />
              </div>
            </div>

            {/* Destination & Service Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Choose Destination *</span>
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 font-medium"
                >
                  <optgroup label="🇰🇪 Kenya Safaris & Coastal Destinations">
                    {DESTINATIONS.filter((d) => d.category === 'kenya').map((d) => (
                      <option key={d.id} value={d.name} className="dark:bg-slate-900 dark:text-slate-100">
                        {d.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🌐 International Holiday Destinations">
                    {DESTINATIONS.filter((d) => d.category === 'international').map((d) => (
                      <option key={d.id} value={d.name} className="dark:bg-slate-900 dark:text-slate-100">
                        {d.name}
                      </option>
                    ))}
                  </optgroup>
                  <option value="Custom Multi-Destination Circuit" className="dark:bg-slate-900 dark:text-slate-100">Multi-Destination / Combo Trip</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Service Required
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 font-medium"
                >
                  <option value="Full Tour Package (Safari + Resort + Transfers)" className="dark:bg-slate-900 dark:text-slate-100">Full Safari / Tour Package</option>
                  <option value="Passport Application / Renewal Assistance" className="dark:bg-slate-900 dark:text-slate-100">Passport Application Assistance</option>
                  <option value="Visa Application Services" className="dark:bg-slate-900 dark:text-slate-100">Visa Application Services</option>
                  <option value="Flight Ticketing Only" className="dark:bg-slate-900 dark:text-slate-100">Flight Ticketing Only</option>
                  <option value="Accommodation Booking Only" className="dark:bg-slate-900 dark:text-slate-100">Accommodation Booking Only</option>
                  <option value="Airport / Safari Land Cruiser Transfer" className="dark:bg-slate-900 dark:text-slate-100">Transfers / Safari Land Cruiser</option>
                  <option value="Excursion / Day Trip" className="dark:bg-slate-900 dark:text-slate-100">Excursion / Day Trip</option>
                </select>
              </div>
            </div>

            {/* Group Size, Date & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Number of Travelers</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Preferred Travel Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={durationDays}
                  onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 font-bold"
                />
              </div>
            </div>

            {/* Budget Class */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Accommodation & Experience Tier</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['Economy', 'Mid-Range', 'Luxury', 'Ultra-Luxury'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setBudgetPreference(tier)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                      budgetPreference === tier
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                        : 'bg-[#F4F1EA]/50 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                Special Requirements or Requests
              </label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Need hot air balloon ride in Mara, flying option, vegetarian meals, honeymoon setup..."
                className="w-full bg-[#F4F1EA]/50 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 focus:border-[#1B4332] dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>{isSubmitting ? 'Sending your request...' : 'Send Request to Email & WhatsApp'}</span>
                <Send className="w-4 h-4" />
              </button>
              
              {submitted && (
                <div className="text-xs text-[#1B4332] font-bold text-center mt-3">
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                    Your request was emailed to our team.
                  </p>
                  {whatsappPopupBlocked && (
                    <a href={whatsappFallbackLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">
                      Continue to WhatsApp
                    </a>
                  )}
                </div>
              )}
              {submitError && (
                <div className="mt-3 text-center">
                  <p role="alert" className="text-xs text-red-700">{submitError}</p>
                  {whatsappPopupBlocked && (
                    <a href={whatsappFallbackLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline">
                      Send via WhatsApp instead
                    </a>
                  )}
                </div>
              )}
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
