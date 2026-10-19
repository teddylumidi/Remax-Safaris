import React, { useState } from 'react';
import { Send } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeaeddzp';

export const ContactForm: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setStatus('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Contact form submission failed.');
      }

      form.reset();
      setStatus("Thanks! Your message has been sent. We'll get back to you soon.");
    } catch {
      setStatus('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const fieldClassName =
    'w-full rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-stone-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88A4B] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';

  return (
    <section id="contact-form" className="scroll-mt-24 bg-[#F4F1EA] dark:bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl sm:p-10">
          <div className="mb-8 space-y-3 text-center">
            <span className="inline-block rounded-md bg-[#1B4332] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4A373]">
              Get in touch
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#12231A] dark:text-[#FDFBF7] sm:text-4xl">
              Contact Us
            </h2>
            <p className="text-sm font-light leading-relaxed text-stone-600 dark:text-stone-300">
              Send us a message and our team will be happy to help plan your journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div style={{ display: 'none' }}>
              <label htmlFor="contact-gotcha">Leave this field empty</label>
              <input
                id="contact-gotcha"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClassName}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className={`${fieldClassName} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#2A5C45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C88A4B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Sending...' : 'Send Message'}
            </button>

            <p aria-live="polite" className="min-h-5 text-center text-sm text-stone-700 dark:text-stone-300">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
