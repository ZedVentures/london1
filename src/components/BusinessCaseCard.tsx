import React from 'react';
import { Building2, Quote, TrendingUp, ExternalLink } from 'lucide-react';
import { useIntersectionObserver } from './AnimatedValue';
import AnimatedValue from './AnimatedValue';
import ChartBar from './ChartBar';

interface GrowthData {
  year: string;
  value: string;
  growth?: string;
}

interface BusinessCase {
  id: string;
  company: string;
  metric: string;
  period: string;
  before: string;
  after: string;
  growth: string;
  quote: string;
  author: string;
  title: string;
  growthTrajectory: GrowthData[];
  yearsTracked: number;
  totalGrowth: string;
  exitValue?: string;
  externalLink?: {
    text: string;
    url: string;
  };
}

interface BusinessCaseCardProps {
  business: BusinessCase;
  isCurrentSlide: boolean;
  isSectionVisible: boolean;
  isChartVisible: boolean;
}

const BusinessCaseCard: React.FC<BusinessCaseCardProps> = ({ 
  business, 
  isCurrentSlide, 
  isSectionVisible, 
  isChartVisible 
}) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  }, true);

  const shouldAnimateCard = isCardVisible || (isCurrentSlide && isSectionVisible);
  const shouldAnimateChart = isCardVisible || (isCurrentSlide && isChartVisible);

  return (
    <div 
      ref={cardRef}
      className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
        {/* Left Column - Company Info & Quote */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Company Header */}
          <div>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Building2 className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{business.company}</h3>
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6">
              {business.metric} • {business.period}
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-xl sm:rounded-2xl">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Before</div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                <AnimatedValue 
                  value={business.before} 
                  isVisible={shouldAnimateCard} 
                  delay={200} 
                />
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-green-50 rounded-xl sm:rounded-2xl">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">After</div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                <AnimatedValue 
                  value={business.after} 
                  isVisible={shouldAnimateCard} 
                  delay={400} 
                />
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-purple-50 rounded-xl sm:rounded-2xl">
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Growth</div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                <AnimatedValue 
                  value={business.growth} 
                  isVisible={shouldAnimateCard} 
                  delay={600} 
                />
              </div>
            </div>
          </div>

          {/* Exit Value (if applicable) */}
          {business.exitValue && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-200">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Exit Value</div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 sm:mb-3">
                  <AnimatedValue 
                    value={business.exitValue} 
                    isVisible={shouldAnimateCard} 
                    delay={800} 
                  />
                </div>
                {business.externalLink && (
                  <a 
                    href={business.externalLink.url}
                    className="inline-flex items-center text-sm sm:text-base text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                  >
                    <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                    {business.externalLink.text}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Quote */}
          <div className="bg-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-200">
            <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mb-3 sm:mb-4" />
            <blockquote className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed mb-3 sm:mb-4 italic">
              "{business.quote}"
            </blockquote>
            <div className="text-right">
              <div className="text-sm sm:text-base font-semibold text-gray-900">— {business.author}</div>
              <div className="text-xs sm:text-sm text-gray-600">{business.title}</div>
            </div>
          </div>
        </div>

        {/* Right Column - Growth Trajectory */}
        <div className="space-y-4 sm:space-y-6 mt-6 lg:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Growth Trajectory</h4>
            </div>
            <span className="text-sm sm:text-base lg:text-lg text-gray-600">{business.period}</span>
          </div>

          {/* Growth Chart */}
          <div className="bg-gray-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl">
            {/* Mobile scroll hint */}
            <div className="block sm:hidden text-center mb-2">
              <span className="text-xs text-gray-500 italic">← Swipe to see all years →</span>
            </div>
            {/* Bar Chart */}
            <div className="mb-3 sm:mb-4 lg:mb-6">
              <div className="flex items-end justify-evenly gap-1 sm:gap-2 h-40 sm:h-48 md:h-56 lg:h-72 bg-white p-2 sm:p-3 lg:p-4 rounded-xl border-2 border-gray-100 overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
                {business.growthTrajectory.map((data, idx) => {
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
                  
                  const maxValue = Math.max(...business.growthTrajectory.map(d => parseValue(d.value)));
                  
                  return (
                    <ChartBar
                      key={data.year}
                      data={data}
                      index={idx}
                      maxValue={maxValue}
                      isLastBar={idx === business.growthTrajectory.length - 1}
                      isFirstBar={idx === 0}
                      parentVisible={shouldAnimateChart}
                    />
                  );
                })}
              </div>
              <div className="text-center mt-2 text-xs sm:text-sm text-gray-600 px-2">
                {business.id === 'london-vision-clinic' ? 'EBIT Growth Over Time - Values shown in bars, Growth % above' : 'Net Assets Growth Over Time - Values shown in bars, Growth % above'}
              </div>
            </div>
            
            {/* Summary row showing total transformation */}
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-green-50 rounded-xl border border-purple-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-purple-600 to-green-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">Total Transformation</div>
                    <div className="text-xs sm:text-sm text-gray-600">{business.period}</div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    <AnimatedValue 
                      value={business.totalGrowth} 
                      isVisible={shouldAnimateChart} 
                      delay={1000} 
                    />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Net Growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">
                <AnimatedValue 
                  value={business.yearsTracked.toString()} 
                  isVisible={shouldAnimateChart} 
                  delay={1200} 
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Years Tracked</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                <AnimatedValue 
                  value={business.totalGrowth} 
                  isVisible={shouldAnimateChart} 
                  delay={1400} 
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCaseCard;