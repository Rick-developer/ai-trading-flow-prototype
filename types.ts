
export enum Screen {
  CHART_NORMAL = 'CHART_NORMAL',
  CHART_LITE = 'CHART_LITE',
  ORDER_COLLAPSED = 'ORDER_COLLAPSED',
  ORDER_EXPANDED = 'ORDER_EXPANDED',
  SUCCESS = 'SUCCESS',
  ORDERS = 'ORDERS',
  PORTFOLIO = 'PORTFOLIO',
  PROFILE = 'PROFILE'
}

export type OrderSide = 'BUY' | 'SELL';
export type ProductType = 'INTRADAY' | 'LONGTERM';
export type OrderType = 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
export type OrderStatus = 'COMPLETE' | 'OPEN' | 'REJECTED';

export interface OrderRecord {
  id: string;
  ticker: string;
  side: OrderSide;
  qty: number;
  price: number;
  status: OrderStatus;
  time: string;
  product: ProductType;
}

export interface Holding {
  ticker: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  pnl: number;
  pnlPercent: number;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockInfo {
  ticker: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
}
