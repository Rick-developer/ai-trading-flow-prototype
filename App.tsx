
import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import MarketWatch from './components/MarketWatch';
import CandleChart from './components/CandleChart';
import OrderRibbon from './components/OrderRibbon';
import OrdersView from './components/OrdersView';
import PortfolioView from './components/PortfolioView';
import ProfileView from './components/ProfileView';
import { Screen, OrderSide } from './types';
import { MOCK_STOCK, MOCK_CANDLES_NORMAL, MOCK_CANDLES_LITE } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.CHART_NORMAL);
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [orderSide, setOrderSide] = useState<OrderSide>('BUY');
  const [showLiteBanner, setShowLiteBanner] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    // SCREEN 2 Context: Suggest Lite Mode after 2.5 seconds on Chart Normal
    if (currentScreen === Screen.CHART_NORMAL && !isLiteMode) {
      const timer = setTimeout(() => setShowLiteBanner(true), 2500);
      return () => clearTimeout(timer);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [currentScreen, isLiteMode]);

  const handleOrderInitiate = (side: OrderSide) => {
    setOrderSide(side);
    setCurrentScreen(Screen.ORDER_COLLAPSED);
  };

  const handleLiteSwitch = () => {
    setIsLiteMode(true);
    setShowLiteBanner(false);
    setCurrentScreen(Screen.CHART_LITE);
  };

  const renderChartContainer = (mode: 'normal' | 'lite') => (
    <div className="flex-1 flex flex-col bg-black relative overflow-hidden">
      {/* SCREEN 2: AI Suggestion Banner */}
      {showLiteBanner && mode === 'normal' && (
        <div className="absolute top-0 left-0 right-0 z-[60] px-4 pt-4 animate-in slide-in-from-top duration-500">
          <div className="bg-[#1e2a3b] border border-[#2d4a77] rounded-xl p-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4184f3]/20 flex items-center justify-center text-[#4184f3]">
                <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
              </div>
              <p className="text-[12px] font-medium text-zinc-200">
                High activity detected — switching to <span className="text-white font-bold">Lite Mode</span> may improve performance
              </p>
            </div>
            <button 
              onClick={handleLiteSwitch}
              className="bg-[#4184f3] text-white px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all"
            >
              Switch Now
            </button>
          </div>
        </div>
      )}

      {/* Ticker Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-900 bg-[#0c0c0c] flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold tracking-tight">APOLLOHOSP</h1>
          <span className="text-[9px] bg-zinc-800 text-zinc-500 px-1 rounded font-bold">NSE</span>
          <span className="text-[#f44336] text-[11px] font-bold ml-1">-0.24%</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-widest ${isLiteMode ? 'text-[#4184f3]' : 'text-zinc-700'}`}>Lite Mode</span>
            <button 
              onClick={() => {
                const nextMode = !isLiteMode;
                setIsLiteMode(nextMode);
                setCurrentScreen(nextMode ? Screen.CHART_LITE : Screen.CHART_NORMAL);
                setShowLiteBanner(false);
              }}
              className={`w-8 h-4 rounded-full relative transition-colors ${isLiteMode ? 'bg-[#4184f3]' : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${isLiteMode ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <i className="fa-solid fa-chart-line text-sm"></i>
          <i className="fa-solid fa-gear text-sm"></i>
        </div>
      </div>

      {/* SCREEN 1 & 2: Chart Area */}
      <div className="flex-1 relative overflow-hidden bg-[#0c0c0c]">
        <CandleChart 
          data={mode === 'lite' ? MOCK_CANDLES_LITE : MOCK_CANDLES_NORMAL} 
          mode={mode} 
        />
        
        {/* Trading Buttons */}
        <div className="absolute bottom-6 left-4 right-4 flex gap-3 z-30 sm:bottom-auto sm:top-6 sm:right-auto">
          <button 
            onClick={() => handleOrderInitiate('BUY')}
            className="flex-1 bg-[#4184f3] text-white py-4 rounded-xl flex flex-col items-center shadow-2xl active:scale-95 transition-all sm:w-32 sm:flex-initial"
          >
            <span className="text-[15px] font-black">7112.50</span>
            <span className="text-[9px] font-bold opacity-70 uppercase tracking-widest">BUY</span>
          </button>
          <button 
            onClick={() => handleOrderInitiate('SELL')}
            className="flex-1 bg-[#ff5722] text-white py-4 rounded-xl flex flex-col items-center shadow-2xl active:scale-95 transition-all sm:w-32 sm:flex-initial"
          >
            <span className="text-[15px] font-black">7111.00</span>
            <span className="text-[9px] font-bold opacity-70 uppercase tracking-widest">SELL</span>
          </button>
        </div>
      </div>

      {/* Footer Nav Bar */}
      <div className="h-10 px-4 bg-[#0c0c0c] border-t border-zinc-900 flex items-center justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest overflow-x-auto no-scrollbar flex-shrink-0">
        <div className="flex gap-6 whitespace-nowrap">
          <span className="text-zinc-300">1d</span>
          <span>5d</span>
          <span>1m</span>
          <span>3m</span>
          <span>6m</span>
          <span>1y</span>
          <span className={mode === 'lite' ? 'hidden' : 'inline'}>All</span>
        </div>
        <div className="flex gap-4 ml-4">
          <i className="fa-solid fa-calendar-days"></i>
          <span className="text-[#ff5722]">Auto</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentScreen) {
      case Screen.ORDERS:
        return <OrdersView />;
      case Screen.PORTFOLIO:
        return <PortfolioView />;
      case Screen.PROFILE:
        return <ProfileView />;
      case Screen.SUCCESS:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0c0c0c] animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-4xl mb-8 border border-green-500/20 shadow-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h1 className="text-3xl font-black mb-3 uppercase tracking-tighter">Order Success</h1>
            <p className="text-zinc-500 text-sm mb-12 text-center max-w-xs leading-relaxed">
              APOLLOHOSP order executed.<br/>
              <span className="text-zinc-300 font-bold block mt-3 text-[13px]">“Order placed with AI-assisted checks”</span>
            </p>
            <button 
              onClick={() => { setCurrentScreen(Screen.CHART_NORMAL); setIsLiteMode(false); }}
              className="w-full max-w-[280px] bg-[#ff5722] text-white py-4.5 rounded-2xl font-black uppercase tracking-[0.25em] shadow-xl active:scale-95 transition-all text-xs"
            >
              Done
            </button>
          </div>
        );
      case Screen.CHART_LITE:
        return renderChartContainer('lite');
      default:
        return renderChartContainer(isLiteMode ? 'lite' : 'normal');
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col font-sans overflow-hidden select-none">
      <TopBar activeTab={currentScreen} onNavigate={setCurrentScreen} />

      <div className="flex-1 flex overflow-hidden">
        {!isMobile && (
          <div className="w-[350px] flex-shrink-0 border-r border-zinc-800 bg-[#0c0c0c]">
            <MarketWatch selectedTicker="APOLLOHOSP" />
          </div>
        )}

        <main className="flex-1 relative flex flex-col overflow-hidden">
          {renderContent()}

          {/* SCREEN 3 & 4: Order Ribbon Overlays */}
          {(currentScreen === Screen.ORDER_COLLAPSED || currentScreen === Screen.ORDER_EXPANDED) && (
            <div className="absolute inset-0 z-[100] flex flex-col">
              <div 
                className="flex-1 bg-black/50 backdrop-blur-[2px] cursor-pointer" 
                onClick={() => setCurrentScreen(isLiteMode ? Screen.CHART_LITE : Screen.CHART_NORMAL)} 
              />
              <div className={`w-full ${isMobile ? '' : 'max-w-md ml-auto'}`}>
                <OrderRibbon 
                  stock={MOCK_STOCK} 
                  side={orderSide}
                  expanded={currentScreen === Screen.ORDER_EXPANDED}
                  onExpand={() => setCurrentScreen(Screen.ORDER_EXPANDED)}
                  onPlaceOrder={() => setCurrentScreen(Screen.SUCCESS)}
                  onClose={() => setCurrentScreen(isLiteMode ? Screen.CHART_LITE : Screen.CHART_NORMAL)}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {isMobile && (
        <div className="h-16 bg-[#121212] border-t border-zinc-900 flex items-center justify-around text-zinc-600 pb-safe">
          <div 
            onClick={() => setCurrentScreen(isLiteMode ? Screen.CHART_LITE : Screen.CHART_NORMAL)}
            className={`flex flex-col items-center gap-1 cursor-pointer ${currentScreen.startsWith('CHART') ? 'text-[#ff5722]' : ''}`}
          >
            <i className="fa-solid fa-bookmark text-sm"></i>
            <span className="text-[8px] font-black uppercase tracking-tighter">Watchlist</span>
          </div>
          <div 
            onClick={() => setCurrentScreen(Screen.ORDERS)}
            className={`flex flex-col items-center gap-1 cursor-pointer ${currentScreen === Screen.ORDERS ? 'text-[#ff5722]' : ''}`}
          >
            <i className="fa-solid fa-clock-rotate-left text-sm"></i>
            <span className="text-[8px] font-black uppercase tracking-tighter">Orders</span>
          </div>
          <div 
            onClick={() => setCurrentScreen(Screen.PORTFOLIO)}
            className={`flex flex-col items-center gap-1 cursor-pointer ${currentScreen === Screen.PORTFOLIO ? 'text-[#ff5722]' : ''}`}
          >
            <i className="fa-solid fa-briefcase text-sm"></i>
            <span className="text-[8px] font-black uppercase tracking-tighter">Portfolio</span>
          </div>
          <div 
            onClick={() => setCurrentScreen(Screen.PROFILE)}
            className={`flex flex-col items-center gap-1 cursor-pointer ${currentScreen === Screen.PROFILE ? 'text-[#ff5722]' : ''}`}
          >
            <i className="fa-solid fa-circle-user text-sm"></i>
            <span className="text-[8px] font-black uppercase tracking-tighter">Profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
