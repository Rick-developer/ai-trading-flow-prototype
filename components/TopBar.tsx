
import React from 'react';
import { Screen } from '../types';

interface TopBarProps {
  activeTab: Screen;
  onNavigate: (screen: Screen) => void;
}

const TopBar: React.FC<TopBarProps> = ({ activeTab, onNavigate }) => {
  const indices = [
    { name: 'NIFTY 50', value: '26,330', up: true },
    { name: 'SENSEX', value: '85,719', up: false }
  ];

  return (
    <div className="h-14 bg-[#1a1a1a] border-b border-zinc-900 flex items-center justify-between px-4 z-[300] shadow-sm select-none">
      <div className="flex items-center gap-6">
        <div className="w-6 h-6 flex-shrink-0 cursor-pointer" onClick={() => onNavigate(Screen.CHART_NORMAL)}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#ff5722] fill-current">
            <path d="M10 50 L50 10 L90 50 L50 90 Z" />
          </svg>
        </div>
        
        <div className="flex gap-4 lg:gap-8 text-[11px] font-black">
          {indices.map(idx => (
            <div key={idx.name} className="flex gap-2 items-center">
              <span className="text-zinc-600 tracking-tighter uppercase">{idx.name}</span>
              <span className={idx.up ? 'text-green-500' : 'text-red-500'}>{idx.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-8 h-full mr-6">
          <button 
            onClick={() => onNavigate(Screen.CHART_NORMAL)}
            className={`text-[12px] font-bold ${activeTab.startsWith('CHART') || activeTab === Screen.ORDER_COLLAPSED || activeTab === Screen.ORDER_EXPANDED ? 'text-[#ff5722]' : 'text-zinc-500 hover:text-white'}`}
          >
            Terminal
          </button>
          <button 
            onClick={() => onNavigate(Screen.ORDERS)}
            className={`text-[12px] font-bold ${activeTab === Screen.ORDERS ? 'text-[#ff5722]' : 'text-zinc-500 hover:text-white'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => onNavigate(Screen.PORTFOLIO)}
            className={`text-[12px] font-bold ${activeTab === Screen.PORTFOLIO ? 'text-[#ff5722]' : 'text-zinc-500 hover:text-white'}`}
          >
            Portfolio
          </button>
          <button 
            onClick={() => onNavigate(Screen.PROFILE)}
            className={`text-[12px] font-bold ${activeTab === Screen.PROFILE ? 'text-[#ff5722]' : 'text-zinc-500 hover:text-white'}`}
          >
            Funds
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-zinc-500">
          <i className="fa-solid fa-magnifying-glass text-sm cursor-pointer hover:text-white"></i>
          <button className="hover:text-white relative">
            <i className="fa-solid fa-bell text-sm"></i>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff5722] rounded-full border-2 border-[#1a1a1a]"></span>
          </button>
          <div 
            className="w-8 h-8 rounded-full bg-[#333] border border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-500 transition-colors"
            onClick={() => onNavigate(Screen.PROFILE)}
          >
             <img src="https://ui-avatars.com/api/?name=Trader&background=333&color=fff&size=32" alt="AV" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
