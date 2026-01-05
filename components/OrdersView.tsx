
import React from 'react';
import { INITIAL_ORDERS } from '../constants';

const OrdersView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#0c0c0c] overflow-hidden">
      <div className="h-14 px-4 flex items-center border-b border-zinc-900 bg-[#121212] flex-shrink-0">
        <h1 className="text-lg font-black uppercase tracking-tight">Orders</h1>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {INITIAL_ORDERS.map((order) => (
          <div key={order.id} className="p-4 border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black px-1 rounded text-white ${order.side === 'BUY' ? 'bg-[#4184f3]' : 'bg-[#ff5722]'}`}>
                  {order.side}
                </span>
                <span className="text-sm font-bold text-zinc-100">{order.ticker}</span>
                <span className="text-[10px] text-zinc-600 font-bold">{order.product}</span>
              </div>
              <span className="text-[10px] font-black text-green-500 uppercase">{order.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[12px] text-zinc-500 font-medium">
                Qty: <span className="text-zinc-300">{order.qty}</span> / 
                Price: <span className="text-zinc-300">₹{order.price.toFixed(2)}</span>
              </div>
              <span className="text-[10px] text-zinc-700 font-mono">{order.time}</span>
            </div>
          </div>
        ))}
        {INITIAL_ORDERS.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
            <i className="fa-solid fa-box-open text-4xl mb-4"></i>
            <p className="text-sm font-bold uppercase tracking-widest">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersView;
