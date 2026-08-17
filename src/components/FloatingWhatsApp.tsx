import React, { useState } from 'react';
import { PHONE_NUMBER_DISPLAY, COMPANY_EMAIL, getWhatsAppLink } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Send, Compass, ShieldCheck, Phone, Mail } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickTopics = [
    { label: '🐘 Book Kenya Safari (Mara, Amboseli, Diani)', msg: 'Hello Remax Safaris, I would like to book a Kenya Safari / Beach package.' },
    { label: '🌐 International Holiday (Dubai, Bali, Cape Town)', msg: 'Hello Remax Safaris, I am inquiring about International Holiday Packages.' },
    { label: '🛂 Passport / Visa Application Assistance', msg: 'Hello Remax Safaris, I need assistance with Passport / Visa application.' },
    { label: '✈️ Flight Ticket & Hotel Booking', msg: 'Hello Remax Safaris, I would like to inquire about Flight Ticketing & Hotel booking.' }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 p-5 w-80 sm:w-96 animate-in fade-in slide-in-from-bottom-5 duration-200 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Remax Safaris Consultancy</h4>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online • 0795 723 450
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-emerald-50/80 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            Jambo! 👋 How can we help you plan your dream safari or travel service today? Choose a quick topic below:
          </p>

          <div className="space-y-1.5">
            {quickTopics.map((topic, i) => (
              <a
                key={i}
                href={getWhatsAppLink(topic.msg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 hover:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:border-emerald-700 transition-all flex items-center justify-between group"
              >
                <span className="truncate pr-2">{topic.label}</span>
                <Send className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <a
              href={`tel:+254795723450`}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>0795 723 450</span>
            </a>

            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Email Us</span>
            </a>

            <a
              href={getWhatsAppLink('Hello Remax Safaris!')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Direct Chat
            </a>
          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none border-2 border-white"
        aria-label="WhatsApp Contact"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <WhatsAppIcon className="w-6 h-6 text-white" />

        <span className="font-extrabold text-xs uppercase tracking-wider hidden sm:inline">
          WhatsApp 0795 723 450
        </span>
      </button>

    </div>
  );
};
