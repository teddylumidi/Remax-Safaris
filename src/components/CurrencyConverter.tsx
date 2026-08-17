import React, { useState } from 'react';
import { useCurrency, CURRENCIES, CurrencyCode } from '../context/CurrencyContext';
import { RefreshCw, ArrowRightLeft, Coins, Sparkles, Check, Info } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const { currency, setCurrency, convertAmount } = useCurrency();
  const [amount, setAmount] = useState<number>(50000);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('KES');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('USD');

  const convertedValue = convertAmount(amount || 0, fromCurrency, toCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromOption = CURRENCIES.find((c) => c.code === fromCurrency) || CURRENCIES[0];
  const toOption = CURRENCIES.find((c) => c.code === toCurrency) || CURRENCIES[1];

  // Quick preset conversions
  const presets = [
    { label: '50K KES', amount: 50000, from: 'KES' as CurrencyCode, to: 'USD' as CurrencyCode },
    { label: '100K KES', amount: 100000, from: 'KES' as CurrencyCode, to: 'USD' as CurrencyCode },
    { label: '$500 USD', amount: 500, from: 'USD' as CurrencyCode, to: 'KES' as CurrencyCode },
    { label: '$1,000 USD', amount: 1000, from: 'USD' as CurrencyCode, to: 'KES' as CurrencyCode },
    { label: '€500 EUR', amount: 500, from: 'EUR' as CurrencyCode, to: 'KES' as CurrencyCode },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1B4332] via-[#2D5A46] to-[#0F281E] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-800/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-700/50">
          <div>
            <div className="flex items-center gap-2 text-[#D4A373] text-xs font-black uppercase tracking-widest mb-1">
              <Coins className="w-4 h-4" />
              <span>Remax Safaris Travel Tool</span>
            </div>
            <h3 className="text-2xl font-extrabold font-serif tracking-tight">
              Instant Safari Currency Converter
            </h3>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Convert safari package costs and travel budgets into your home currency instantly.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrency(toCurrency);
            }}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#D4A373] hover:bg-[#b8885b] text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Set App Currency to {toCurrency}</span>
          </button>
        </div>

        {/* Converter Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Amount Input */}
          <div className="lg:col-span-4 space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
              You Convert Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900/80 border border-emerald-600/50 focus:border-[#D4A373] rounded-2xl px-4 py-3 text-lg font-black text-white focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30"
                placeholder="Enter amount"
              />
              <span className="absolute right-4 top-3.5 text-xs font-bold text-emerald-400">
                {fromOption.symbol}
              </span>
            </div>
          </div>

          {/* From Dropdown */}
          <div className="lg:col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
              From Currency
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
              className="w-full bg-slate-900/80 border border-emerald-600/50 focus:border-[#D4A373] rounded-2xl px-3.5 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                  {c.flag} {c.code} - {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center pt-2 lg:pt-5">
            <button
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-emerald-800/80 hover:bg-[#D4A373] hover:text-slate-950 text-white transition-all border border-emerald-600/40 shadow-md group"
              title="Swap Currencies"
            >
              <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* To Dropdown */}
          <div className="lg:col-span-4 space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
              To Currency
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
              className="w-full bg-slate-900/80 border border-emerald-600/50 focus:border-[#D4A373] rounded-2xl px-3.5 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                  {c.flag} {c.code} - {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Calculation Result Banner */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-600/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] text-emerald-300 uppercase tracking-widest font-black block">
              Estimated Equivalent
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#D4A373] font-serif">
              {toOption.symbol} {convertedValue.toLocaleString()} <span className="text-xl font-sans font-bold text-white">{toCurrency}</span>
            </div>
            <p className="text-xs text-slate-300">
              {amount.toLocaleString()} {fromCurrency} = {convertedValue.toLocaleString()} {toCurrency}
            </p>
          </div>

          <div className="text-xs text-emerald-200/80 space-y-1 border-t md:border-t-0 md:border-l border-emerald-800/60 pt-2 md:pt-0 md:pl-4">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Info className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Live Safari Exchange Rate</span>
            </div>
            <p className="text-[11px]">
              1 {fromCurrency} ≈ {(convertAmount(1, fromCurrency, toCurrency) || (fromOption.kesRate / toOption.kesRate)).toFixed(4)} {toCurrency}
            </p>
            <p className="text-[10px] text-emerald-400/80">
              Rates updated daily for standard safari booking calculations.
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-2 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider shrink-0">
            Quick Examples:
          </span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAmount(p.amount);
                setFromCurrency(p.from);
                setToCurrency(p.to);
              }}
              className="px-3 py-1 rounded-lg bg-emerald-900/60 hover:bg-[#D4A373] hover:text-slate-950 text-emerald-100 text-xs font-semibold border border-emerald-700/50 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
