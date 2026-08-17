import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES, CurrencyCode } from '../context/CurrencyContext';
import { DollarSign, ChevronDown, Check, Coins } from 'lucide-react';

interface CurrencySelectorProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ className = '', variant = 'compact' }) => {
  const { currency, setCurrency, currentCurrencyOption } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
        title="Select Display Currency"
      >
        <span className="text-sm">{currentCurrencyOption.flag}</span>
        <span>{currentCurrencyOption.code}</span>
        <span className="text-[10px] text-emerald-300 font-mono">({currentCurrencyOption.symbol})</span>
        <ChevronDown className={`w-3 h-3 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 border-b border-slate-100 dark:border-slate-800 mb-1">
            <Coins className="w-3 h-3 text-[#D4A373]" />
            <span>Select Currency</span>
          </div>

          <div className="space-y-0.5 max-h-60 overflow-y-auto">
            {CURRENCIES.map((option) => (
              <button
                key={option.code}
                onClick={() => {
                  setCurrency(option.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  currency === option.code
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{option.flag}</span>
                  <div>
                    <span className="block">{option.code} ({option.symbol})</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">{option.name}</span>
                  </div>
                </div>
                {currency === option.code && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
