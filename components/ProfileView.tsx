
import React from 'react';

const ProfileView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#0c0c0c] overflow-hidden">
      <div className="h-14 px-4 flex items-center border-b border-zinc-900 bg-[#121212] flex-shrink-0">
        <h1 className="text-lg font-black uppercase tracking-tight">Account</h1>
      </div>
      
      <div className="p-6 flex flex-col items-center border-b border-zinc-900 bg-gradient-to-b from-zinc-900/30 to-transparent">
        <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden mb-4 shadow-2xl">
          <img src="https://ui-avatars.com/api/?name=Trader&background=333&color=fff&size=80" alt="Avatar" />
        </div>
        <h2 className="text-xl font-black text-white">USER780624</h2>
        <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-[0.2em] mt-1">Individual Trader</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <div className="bg-zinc-900/40 rounded-2xl p-4 border border-zinc-800 shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-black uppercase text-zinc-500 tracking-widest">Available Funds</span>
            <i className="fa-solid fa-wallet text-zinc-700"></i>
          </div>
          <p className="text-3xl font-black text-white tracking-tighter">₹1,42,800.40</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="bg-[#4184f3] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Add Funds</button>
            <button className="bg-zinc-800 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Withdraw</button>
          </div>
        </div>

        <div className="space-y-1">
          {[
            { icon: 'fa-shield-halved', label: 'Security & Auth' },
            { icon: 'fa-file-invoice-dollar', label: 'Tax & Reports' },
            { icon: 'fa-circle-info', label: 'Help & Support' },
            { icon: 'fa-right-from-bracket', label: 'Log Out', danger: true }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl hover:bg-zinc-900/40 cursor-pointer transition-colors ${item.danger ? 'text-red-500' : 'text-zinc-300'}`}>
              <div className="flex items-center gap-4">
                <i className={`fa-solid ${item.icon} text-sm opacity-70`}></i>
                <span className="text-sm font-bold">{item.label}</span>
              </div>
              <i className="fa-solid fa-chevron-right text-[10px] opacity-30"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
