
import React from 'react';
import { MOCK_HOLDINGS } from '../constants';

const PortfolioView: React.FC = () => {
  const totalPnl = MOCK_HOLDINGS.reduce((acc, curr) => acc + curr.pnl, 0);
  const totalValue = MOCK_HOLDINGS.reduce((acc, curr) => acc + (curr.ltp * curr.qty), 0);

  return (
    <div className="flex-1 flex flex-col bg-[#0c0c0c] overflow-hidden">
      <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-900 bg-[#121212] flex-shrink-0">
        <h1 className="text-lg font-black uppercase tracking-tight">Portfolio</h1>
        <div className="text-right">
          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Total P&L</p>
          <p className={`text-sm font-black ${totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-zinc-900/20 grid grid-cols-2 gap-4 border-b border-zinc-900">
        <div>
          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Invested</p>
          <p className="text-sm font-bold text-zinc-200">₹{(totalValue - totalPnl).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Current Value</p>
          <p className="text-sm font-bold text-zinc-200">₹{totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {MOCK_HOLDINGS.map((item) => (
          <div key={item.ticker} className="p-4 border-b border-zinc-900 hover:bg-zinc-900/40">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-bold text-zinc-100">{item.ticker}</span>
                <p className="text-[10px] text-zinc-600">Qty: {item.qty} • Avg: {item.avgPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${item.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.pnl >= 0 ? '+' : ''}{item.pnl.toFixed(2)}
                </p>
                <p className="text-[10px] text-zinc-600">{item.pnlPercent.toFixed(2)}%</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono">
              <span>LTP: {item.ltp.toFixed(2)}</span>
              <span>Value: ₹{(item.ltp * item.qty).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioView;
