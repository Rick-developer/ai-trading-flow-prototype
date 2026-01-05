
import { CandleData, StockInfo, Holding, OrderRecord } from './types';

export const MOCK_STOCK: StockInfo = {
  ticker: 'NIFTY 50',
  company: 'Index',
  price: 22453.20,
  change: 142.15,
  changePercent: 0.64
};

export const MOCK_HOLDINGS: Holding[] = [
  { ticker: 'RELIANCE', qty: 10, avgPrice: 2450.00, ltp: 2942.10, pnl: 4921.00, pnlPercent: 20.08 },
  { ticker: 'TCS', qty: 5, avgPrice: 3820.50, ltp: 4120.00, pnl: 1497.50, pnlPercent: 7.84 },
  { ticker: 'HDFCBANK', qty: 50, avgPrice: 1620.00, ltp: 1445.50, pnl: -8725.00, pnlPercent: -10.77 },
  { ticker: 'INFY', qty: 25, avgPrice: 1450.00, ltp: 1610.20, pnl: 4005.00, pnlPercent: 11.05 }
];

export const INITIAL_ORDERS: OrderRecord[] = [
  { id: '1', ticker: 'TATAMOTORS', side: 'BUY', qty: 100, price: 920.45, status: 'COMPLETE', time: '09:25:04', product: 'INTRADAY' },
  { id: '2', ticker: 'ZOMATO', side: 'SELL', qty: 500, price: 184.20, status: 'COMPLETE', time: '10:12:45', product: 'LONGTERM' }
];

// Screen 1: Dense, heavy pattern
export const MOCK_CANDLES_NORMAL: CandleData[] = Array.from({ length: 60 }).map((_, i) => {
  const base = 6800 + Math.sin(i / 5) * 200 + Math.cos(i / 2) * 50;
  const open = base + (Math.random() - 0.5) * 30;
  const close = base + (Math.random() - 0.5) * 30;
  return {
    time: `${9 + Math.floor(i / 10)}:${(i % 10) * 6}`,
    open,
    close,
    high: Math.max(open, close) + Math.random() * 20,
    low: Math.min(open, close) - Math.random() * 20,
    volume: Math.floor(Math.random() * 2000)
  };
});

// Screen 2: Simplified, cleaner pattern (Lite Mode)
export const MOCK_CANDLES_LITE: CandleData[] = Array.from({ length: 30 }).map((_, i) => {
  const base = 7000 + (i * 15) + Math.sin(i / 8) * 100; // Trending pattern
  const open = base;
  const close = base + (Math.random() - 0.5) * 20;
  return {
    time: `${10 + Math.floor(i / 5)}:${(i % 5) * 12}`,
    open,
    close,
    high: Math.max(open, close) + 5,
    low: Math.min(open, close) - 5,
    volume: 500
  };
});
