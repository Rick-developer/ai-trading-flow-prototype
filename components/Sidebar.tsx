
import React from 'react';
import { Screen } from '../types';

interface SidebarProps {
  activeTab: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: Screen.CHART_NORMAL, icon: 'fa-bookmark', label: 'Dashboard' },
    { id: Screen.ORDERS, icon: 'fa-clock-rotate-left', label: 'Orders' },
    { id: Screen.PORTFOLIO, icon: 'fa-briefcase', label: 'Portfolio' },
    { id: Screen.PROFILE, icon: 'fa-circle-user', label: 'Profile' }
  ];

  return (
    <aside className="w-16 h-screen bg-[#1a1a1a] border-r border-zinc-800 flex flex-col items-center py-6 gap-8 z-[200]">
      <div className="w-10 h-10 bg-[#4184f3] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#4184f3]/20">
         <i className="fa-solid fa-paper-plane text-white text-lg -rotate-45"></i>
      </div>
      
      {tabs.map(tab => {
        const isActive = activeTab === tab.id || (tab.id === Screen.CHART_NORMAL && (activeTab === Screen.CHART_LITE || activeTab === Screen.ORDER_COLLAPSED || activeTab === Screen.ORDER_EXPANDED));
        return (
          <button 
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`group relative flex flex-col items-center transition-all duration-300 ${isActive ? 'text-[#4184f3]' : 'text-zinc-600 hover:text-zinc-300'}`}
          >
            <i className={`fa-solid ${tab.icon} text-xl transition-transform group-hover:scale-110`}></i>
            <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#4184f3] transition-all ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-1 bg-zinc-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50 uppercase tracking-widest border border-zinc-700">
               {tab.label}
            </div>
          </button>
        );
      })}

      <div className="mt-auto space-y-6 flex flex-col items-center">
         <button className="text-zinc-600 hover:text-white transition-colors"><i className="fa-solid fa-bell text-lg"></i></button>
         <button className="text-zinc-600 hover:text-white transition-colors"><i className="fa-solid fa-gear text-lg"></i></button>
      </div>
    </aside>
  );
};

export default Sidebar;
