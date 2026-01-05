
import React from 'react';
import { StockInfo } from '../types';

interface HeaderProps {
  stock: StockInfo;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ stock, onBack }) => {
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-3 border-b border-zinc-800 bg-[#121212] shadow-sm z-50">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="p-1 -ml-1 text-zinc-400 hover:text-white transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-[14px] font-black tracking-tight text-white">{stock.ticker}</h1>
            <span className="text-[8px] bg-zinc-800 text-zinc-500 px-1 rounded font-bold uppercase tracking-tighter">NSE</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[14px] font-black text-white">
          {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className={`text-[10px] font-bold ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Header;
