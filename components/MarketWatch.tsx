
import React from 'react';

interface MarketWatchProps {
  selectedTicker: string;
}

const MarketWatch: React.FC<MarketWatchProps> = ({ selectedTicker }) => {
  const stocks = [
    { ticker: 'APOLLOHOSP', ltp: '7112.50', chg: '-0.24%', up: false },
    { ticker: 'RELIANCE', ltp: '2942.10', chg: '0.64%', up: true },
    { ticker: 'TCS', ltp: '4120.00', chg: '1.12%', up: true },
    { ticker: 'HDFCBANK', ltp: '1445.50', chg: '-0.85%', up: false },
    { ticker: 'INFY', ltp: '1610.20', chg: '0.45%', up: true },
    { ticker: 'ZOMATO', ltp: '184.20', chg: '2.40%', up: true },
    { ticker: 'DMART', ltp: '3665.50', chg: '-1.46%', up: false }
  ];

  return (
    <div className="h-full bg-[#0c0c0c] flex flex-col select-none">
      <div className="p-4 border-b border-zinc-800">
        <div className="relative">
           <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-[11px]"></i>
           <input 
            type="text" 
            placeholder="Search & add stocks" 
            className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-[12px] text-zinc-300 focus:outline-none focus:border-zinc-700 transition-colors"
           />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {stocks.map(stock => (
          <div 
            key={stock.ticker} 
            className={`px-4 py-3.5 border-b border-zinc-900 flex justify-between items-center group cursor-pointer transition-colors hover:bg-zinc-900/40 ${selectedTicker === stock.ticker ? 'bg-zinc-900/20' : ''}`}
          >
            <div>
              <p className="text-[13px] font-bold text-zinc-200">{stock.ticker}</p>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tight">NSE</p>
            </div>
            <div className="text-right">
              <p className={`text-[13px] font-mono font-bold ${stock.up ? 'text-green-500' : 'text-red-500'}`}>{stock.ltp}</p>
              <p className="text-[11px] text-zinc-600 font-medium">{stock.chg}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-10 bg-[#121212] flex items-center px-4 justify-between border-t border-zinc-800">
        <div className="flex gap-4">
          <span className="text-[11px] font-bold text-[#ff5722]">List 1</span>
          <span className="text-[11px] font-bold text-zinc-600">List 2</span>
        </div>
        <i className="fa-solid fa-plus text-zinc-700 text-sm"></i>
      </div>
    </div>
  );
};

export default MarketWatch;
