import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'KES' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'AED';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  kesRate: number; // 1 unit of foreign currency = N KES
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'KES', symbol: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', kesRate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', kesRate: 130 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', kesRate: 140 },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', kesRate: 165 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦', kesRate: 95 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', kesRate: 85 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪', kesRate: 35.4 },
];

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  formatPrice: (amountInKES?: number, amountInUSD?: number) => string;
  convertAmount: (amount: number, from: CurrencyCode, to: CurrencyCode) => number;
  currentCurrencyOption: CurrencyOption;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('KES');

  const currentCurrencyOption = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const convertAmount = (amount: number, from: CurrencyCode, to: CurrencyCode): number => {
    if (from === to) return amount;
    const fromOption = CURRENCIES.find((c) => c.code === from) || CURRENCIES[0];
    const toOption = CURRENCIES.find((c) => c.code === to) || CURRENCIES[0];
    
    // Convert to KES first
    const kesValue = amount * fromOption.kesRate;
    // Convert KES to target currency
    const result = kesValue / toOption.kesRate;
    return Math.round(result);
  };

  const formatPrice = (amountInKES?: number, amountInUSD?: number): string => {
    if (!amountInKES && !amountInUSD) return 'Custom Quote';

    if (currency === 'KES') {
      const value = amountInKES ?? (amountInUSD ? amountInUSD * 130 : 0);
      return `KES ${Math.round(value).toLocaleString()}`;
    }

    if (currency === 'USD' && amountInUSD) {
      return `$${amountInUSD.toLocaleString()} USD`;
    }

    const baseKES = amountInKES ?? (amountInUSD ? amountInUSD * 130 : 0);
    const converted = convertAmount(baseKES, 'KES', currency);
    
    return `${currentCurrencyOption.symbol}${converted.toLocaleString()} ${currency}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertAmount,
        currentCurrencyOption,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
