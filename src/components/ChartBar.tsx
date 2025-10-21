import React from 'react';
import { useIntersectionObserver } from './AnimatedValue';
import AnimatedValue from './AnimatedValue';

interface GrowthData {
  year: string;
  value: string;
  growth?: string;
}

interface ChartBarProps {
  data: GrowthData;
  index: number;
  maxValue: number;
  isLastBar: boolean;
  isFirstBar: boolean;
  parentVisible: boolean;
}

const ChartBar: React.FC<ChartBarProps> = ({ 
  data, 
  index, 
  maxValue, 
  isLastBar, 
  isFirstBar, 
  parentVisible 
}) => {
  const [barRef, isBarVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  }, true);

  // Use parent visibility as fallback for better UX
  const shouldAnimate = isBarVisible || parentVisible;

  const parseValue = (val: string) => {
    const numStr = val.replace('£', '');
    if (numStr.includes('M')) {
      return parseFloat(numStr.replace('M', '')) * 1000;
    } else if (numStr.includes('K')) {
      return parseFloat(numStr.replace('K', ''));
    } else {
      return parseFloat(numStr);
    }
  };

  const formatGrowthColor = (growth?: string) => {
    if (!growth) return 'text-gray-600';
    if (growth.startsWith('+')) return 'text-green-600';
    if (growth.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const currentValue = parseValue(data.value);
  const heightPercentage = (currentValue / maxValue) * 100;
  const animationDelay = shouldAnimate ? index * 200 : 0;

  return (
    <div
      ref={barRef}
      className={`flex flex-col items-center flex-1 transition-all duration-1000 ${
        shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="relative flex flex-col items-center justify-end h-32 sm:h-40 md:h-48 lg:h-56 w-full">
        <div 
          className={`w-full rounded-t-lg transition-all duration-1500 ${
            isFirstBar ? 'bg-gray-400' : 
            isLastBar ? 'bg-green-500' :
            'bg-purple-500'
          }`}
          style={{ 
            height: shouldAnimate ? `${heightPercentage}%` : '0%',
            transitionDelay: `${animationDelay + 300}ms`
          }}
        >
          {/* Value displayed inside the bar */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`} style={{ transitionDelay: `${animationDelay + 800}ms` }}>
            <div className="text-white font-bold text-[10px] xs:text-xs sm:text-sm text-center leading-tight transform -rotate-0">
              <div className="bg-gray-900/95 backdrop-blur-sm px-1 xs:px-1.5 sm:px-2 lg:px-3 py-0.5 xs:py-1 sm:py-1.5 lg:py-2 rounded sm:rounded-md lg:rounded-lg shadow-lg border border-white/20">
                <AnimatedValue value={data.value} isVisible={shouldAnimate} delay={animationDelay} />
              </div>
            </div>
          </div>
          
          <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap transition-all duration-500 ${
            shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`} style={{ transitionDelay: `${animationDelay + 600}ms` }}></div>
          {data.growth && (
            <div className={`absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap transition-all duration-500 ${formatGrowthColor(data.growth)} ${
              shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`} style={{ transitionDelay: `${animationDelay + 700}ms` }}>
              <div className="bg-white/95 backdrop-blur-sm px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-0.5 sm:py-1 rounded-sm sm:rounded-md shadow-md border border-gray-200 text-[9px] xs:text-[10px] sm:text-xs">
                <AnimatedValue value={data.growth} isVisible={shouldAnimate} delay={animationDelay + 200} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`mt-1 sm:mt-2 text-center transition-all duration-500 ${
        shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`} style={{ transitionDelay: `${animationDelay + 400}ms` }}>
        <div className="bg-white/90 backdrop-blur-sm px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded sm:rounded-md lg:rounded-lg shadow-sm border border-gray-200">
          <div className="text-[10px] xs:text-xs sm:text-sm font-bold text-purple-800">{data.year}</div>
        </div>
      </div>
    </div>
  );
};

export default ChartBar;