
import React from 'react';
import { CandleData } from '../types';

interface CandleChartProps {
  data: CandleData[];
  mode: 'normal' | 'lite';
}

const CandleChart: React.FC<CandleChartProps> = ({ data, mode }) => {
  const chartHeight = 500;
  const chartWidth = 900;
  const paddingRight = 80; // Consistent padding for axes
  const volumeHeight = 60;

  // Use the same scale logic for both
  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...allPrices) * 0.995;
  const maxPrice = Math.max(...allPrices) * 1.005;
  const priceRange = maxPrice - minPrice;

  const getY = (price: number) => chartHeight - ((price - minPrice) / priceRange) * (chartHeight - 60) - 30;
  const candleWidth = (chartWidth - paddingRight) / data.length;

  // SMA calculation for Normal mode
  const getSMA = (index: number, period: number) => {
    if (index < period) return null;
    const slice = data.slice(index - period, index);
    const sum = slice.reduce((acc, curr) => acc + curr.close, 0);
    return sum / period;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent select-none">
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible" preserveAspectRatio="none">
        {/* Background Grids - Simplified in Lite Mode */}
        <g stroke={mode === 'lite' ? '#141414' : '#1a1a1a'} strokeWidth="1">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            if (mode === 'lite' && i % 4 !== 0) return null; // Fewer lines in lite
            return <line key={i} x1="0" y1={(chartHeight / 8) * i} x2={chartWidth - paddingRight} y2={(chartHeight / 8) * i} />;
          })}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
             if (mode === 'lite' && i % 5 !== 0) return null;
             return <line key={i} x1={((chartWidth - paddingRight) / 10) * i} y1="0" x2={((chartWidth - paddingRight) / 10) * i} y2={chartHeight} />;
          })}
        </g>

        {/* Indicators - ONLY in Normal Mode */}
        {mode === 'normal' && (
          <g>
            <path
              d={data.map((_, i) => {
                const val = getSMA(i, 10);
                return val ? `${i === 10 ? 'M' : 'L'} ${i * candleWidth + candleWidth/2} ${getY(val)}` : '';
              }).join(' ')}
              fill="none"
              stroke="#4184f3"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <path
              d={data.map((_, i) => {
                const val = getSMA(i, 20);
                return val ? `${i === 20 ? 'M' : 'L'} ${i * candleWidth + candleWidth/2} ${getY(val)}` : '';
              }).join(' ')}
              fill="none"
              stroke="#ff9800"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          </g>
        )}

        {/* Volume - Only in Normal Mode */}
        {mode === 'normal' && (
          <g opacity="0.1">
            {data.map((d, i) => (
              <rect
                key={`v-${i}`}
                x={i * candleWidth + 2}
                y={chartHeight - (d.volume / 2000) * volumeHeight}
                width={candleWidth - 4}
                height={(d.volume / 2000) * volumeHeight}
                fill={d.close >= d.open ? '#22c55e' : '#ef4444'}
              />
            ))}
          </g>
        )}

        {/* Candlesticks - Identical Rendering Logic */}
        {data.map((d, i) => {
          const x = i * candleWidth;
          const isUp = d.close >= d.open;
          const color = isUp ? '#22c55e' : '#ef4444';
          const bodyY = getY(Math.max(d.open, d.close));
          const bodyHeight = Math.max(1, Math.abs(getY(d.open) - getY(d.close)));

          return (
            <g key={i}>
              <line 
                x1={x + candleWidth / 2} 
                y1={getY(d.high)} 
                x2={x + candleWidth / 2} 
                y2={getY(d.low)} 
                stroke={color} 
                strokeWidth={mode === 'lite' ? "2" : "1"} 
              />
              <rect
                x={x + candleWidth * 0.2}
                y={bodyY}
                width={candleWidth * 0.6}
                height={bodyHeight}
                fill={color}
                fillOpacity={mode === 'lite' ? 1 : 0.8}
              />
            </g>
          );
        })}

        {/* Price Tracker Line */}
        <line 
          x1="0" 
          y1={getY(data[data.length-1].close)} 
          x2={chartWidth - paddingRight} 
          y2={getY(data[data.length-1].close)} 
          stroke={data[data.length-1].close >= data[data.length-1].open ? "#22c55e" : "#ef4444"} 
          strokeWidth="1" 
          strokeDasharray={mode === 'lite' ? "none" : "3 3"} 
        />
        
        {/* Price Tag */}
        <rect 
          x={chartWidth - paddingRight} 
          y={getY(data[data.length-1].close) - 10} 
          width="75" 
          height="20" 
          rx="2"
          fill={data[data.length-1].close >= data[data.length-1].open ? "#22c55e" : "#ef4444"} 
        />
        <text 
          x={chartWidth - paddingRight + 8} 
          y={getY(data[data.length-1].close) + 4} 
          fill="white" 
          fontSize="11" 
          fontWeight="900" 
          fontFamily="monospace"
        >
          {data[data.length-1].close.toFixed(2)}
        </text>
      </svg>

      {/* Axis Price Labels - Shared Structure */}
      <div className="absolute right-0 top-0 bottom-0 w-[80px] flex flex-col justify-between py-10 bg-[#0c0c0c]/90 border-l border-zinc-900 z-10">
        {[maxPrice, (maxPrice + minPrice)/2, minPrice].map((p, idx) => (
          <div key={idx} className="flex flex-col items-center">
             <span className="text-[10px] text-zinc-600 font-mono font-bold">
               {p.toFixed(0)}.00
             </span>
             {mode === 'normal' && <span className="text-[8px] text-zinc-800 font-black mt-1">VOL: {Math.floor(p/10)}K</span>}
          </div>
        ))}
      </div>
      
      {/* Visual Mode Label */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${mode === 'lite' ? 'bg-[#4184f3]/10 border-[#4184f3]/30 text-[#4184f3]' : 'bg-zinc-800 border-zinc-700 text-zinc-400'}`}>
          {mode === 'lite' ? 'Lite Engine' : 'Full Engine'}
        </div>
      </div>
    </div>
  );
};

export default CandleChart;
