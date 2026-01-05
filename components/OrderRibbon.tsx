
import React, { useState } from 'react';
import { StockInfo, OrderSide, OrderType } from '../types';

interface OrderRibbonProps {
  stock: StockInfo;
  side: OrderSide;
  expanded: boolean;
  onExpand: () => void;
  onPlaceOrder: () => void;
  onClose: () => void;
}

const OrderRibbon: React.FC<OrderRibbonProps> = ({ side, expanded, onExpand, onPlaceOrder, onClose }) => {
  const [qty, setQty] = useState('50');
  const [type, setType] = useState<OrderType>('MARKET');
  const [price, setPrice] = useState('7112.50');
  
  const isBuy = side === 'BUY';
  const color = isBuy ? 'bg-[#4184f3]' : 'bg-[#ff5722]';
  const text = isBuy ? 'text-[#4184f3]' : 'text-[#ff5722]';

  // SCREEN 3: Quick Order Ribbon (Collapsed)
  if (!expanded) {
    return (
      <div 
        className="w-full bg-[#1c1c1c] border-t border-zinc-800 p-5 pb-safe flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300 cursor-pointer"
        onClick={onExpand}
      >
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center text-white shadow-lg`}>
             <i className="fa-solid fa-bolt-lightning text-xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Quick {side}</span>
            <span className="text-[16px] font-black text-white leading-none">APOLLOHOSP • {qty} QTY</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={(e) => { e.stopPropagation(); onPlaceOrder(); }}
             className={`${color} text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all`}
           >
             {side}
           </button>
           <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-zinc-700 hover:text-zinc-500 p-2">
            <i className="fa-solid fa-xmark text-xl"></i>
           </button>
        </div>
      </div>
    );
  }

  // SCREEN 4: Expanded Order Ribbon with AI
  return (
    <div className="w-full bg-[#161616] rounded-t-[32px] border-t border-zinc-800 shadow-2xl flex flex-col transition-all animate-in slide-in-from-bottom duration-300 max-h-[90vh]">
      {/* Handle */}
      <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mt-4 mb-2"></div>

      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center">
         <div className="flex flex-col">
            <div className="flex items-center gap-2">
               <span className={`px-2 py-0.5 rounded text-[10px] font-black text-white uppercase ${color}`}>{side}</span>
               <span className="text-2xl font-black tracking-tight text-white">APOLLOHOSP</span>
            </div>
            <p className="text-[12px] text-zinc-500 font-medium mt-1">LTP: ₹7112.50 • System Check Active</p>
         </div>
         <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
         </button>
      </div>

      <div className="px-6 pb-12 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-zinc-600 font-black tracking-widest ml-1">Quantity</label>
            <input 
              type="number" 
              value={qty} 
              onChange={(e) => setQty(e.target.value)} 
              className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 text-[18px] font-black text-white focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-zinc-600 font-black tracking-widest ml-1">Order Type</label>
            <div className="flex bg-[#0a0a0a] p-1 rounded-2xl border border-zinc-800 h-[64px]">
              <button 
                onClick={() => setType('MARKET')} 
                className={`flex-1 text-[11px] font-black rounded-xl transition-all ${type === 'MARKET' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}
              >
                MARKET
              </button>
              <button 
                onClick={() => setType('LIMIT')} 
                className={`flex-1 text-[11px] font-black rounded-xl transition-all ${type === 'LIMIT' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}
              >
                LIMIT
              </button>
            </div>
          </div>
        </div>

        {type === 'LIMIT' && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
            <label className="text-[10px] uppercase text-zinc-600 font-black tracking-widest ml-1">Limit Price</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 text-[18px] font-black text-white focus:outline-none focus:border-zinc-700"
            />
          </div>
        )}

        {/* AI System Hints (Screen 4 Core Feature) */}
        <div className="bg-[#1e2a3b]/30 border border-[#2d4a77]/30 rounded-3xl p-6 space-y-4 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#4184f3]/20 flex items-center justify-center text-[#4184f3]">
               <i className="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
            </div>
            <span className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Smart Assistant Checks</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <i className="fa-solid fa-circle-check text-green-500 text-sm mt-0.5"></i>
              <p className="text-[13px] text-zinc-200 font-medium">✅ Sufficient margin available</p>
            </div>
            
            {type === 'MARKET' ? (
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-triangle-exclamation text-orange-400 text-sm mt-0.5"></i>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] text-zinc-200 font-medium">⚠️ High volatility — market order may experience slippage</p>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">System Suggestion: Switch to Limit for exact price execution.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <i className="fa-solid fa-lightbulb text-blue-400 text-sm mt-0.5"></i>
                <p className="text-[13px] text-zinc-200 font-medium">💡 Limit order may offer better execution in current conditions</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-end border-t border-zinc-900 pt-6">
          <div>
            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1.5">Required Margin</p>
            <p className="text-2xl font-black text-white tracking-tighter">₹71,125.00</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1.5">Available</p>
            <p className="text-[14px] font-bold text-zinc-400">₹1,42,800.40</p>
          </div>
        </div>

        <button 
          onClick={onPlaceOrder} 
          className={`w-full ${color} text-white py-5 rounded-[24px] font-black text-[15px] uppercase tracking-[0.25em] shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all`}
        >
          {side} APOLLOHOSP
        </button>
      </div>
    </div>
  );
};

export default OrderRibbon;
