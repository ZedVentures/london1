import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Building2, ExternalLink, Quote } from 'lucide-react';
import { useIntersectionObserver } from './AnimatedValue';
import BusinessCaseCard from './BusinessCaseCard';

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

const businessCases: BusinessCase[] = [
  {
    id: 'eden-facades',
    company: 'Eden Facades',
    metric: 'Net Assets Growth',
    period: '2019–2024',
    before: '£291K',
    after: '£2.54M',
    growth: '+773%',
    quote: "The VIPI Growth Programme is extremely progressive and transformative. The profit growth results are outstanding. We would highly recommend it to every entrepreneurial owner-manager.",
    author: 'Tony Hill',
    title: 'Managing Director',
    growthTrajectory: [
      { year: '2019', value: '£291K' },
      { year: '2020', value: '£338K', growth: '+16%' },
      { year: '2021', value: '£832K', growth: '+146%' },
      { year: '2022', value: '£419K', growth: '-50%' },
      { year: '2023', value: '£1.42M', growth: '+239%' },
      { year: '2024', value: '£2.54M', growth: '+79%' }
    ],
    yearsTracked: 6,
    totalGrowth: '+773%'
  },
  {
    id: 'pump-street-chocolate',
    company: 'Pump Street Chocolate',
    metric: 'Net Assets Growth',
    period: '2019–2024',
    before: '£19K',
    after: '£926K',
    growth: '+4,774%',
    quote: "The process helped us implement changes on time and in full, reducing day-to-day stress while focusing on strategic growth. Our monthly meetings are thought-provoking, constructive and beneficial. We really feel the MooreMentum team know our business well – they are the best we have worked with in the advisory world.",
    author: 'Chris Brennan',
    title: 'Director',
    growthTrajectory: [
      { year: '2019', value: '£19K' },
      { year: '2020', value: '£3K', growth: '-84%' },
      { year: '2021', value: '£275K', growth: '+9067%' },
      { year: '2022', value: '£1.28M', growth: '+365%' },
      { year: '2023', value: '£1.10M', growth: '-14%' },
      { year: '2024', value: '£926K', growth: '-16%' }
    ],
    yearsTracked: 6,
    totalGrowth: '+4,774%'
  },
  {
    id: 'london-vision-clinic',
    company: 'London Vision Clinic Partners',
    metric: 'EBIT Growth & Exit',
    period: '2020–2021',
    before: '£94K',
    after: '£2.19M',
    growth: '+2,230%',
    quote: "The unique VIPI processes, which promote aligned goals and give the management team a clear view of our own business, helped guide us to achieve an exit event value materially beyond anything achievable at the start of the process. We would thoroughly recommend the VIPI Growth Programme and the MooreMentum team.",
    author: 'Craig Engelfried',
    title: 'Managing Director',
    growthTrajectory: [
      { year: '2020', value: '£94K' },
      { year: '2021', value: '£2.19M', growth: '+2230%' }
    ],
    yearsTracked: 2,
    totalGrowth: '+2,230%',
    exitValue: '£30.9M',
    externalLink: {
      text: 'View NASDAQ article',
      url: '#'
    }
  }
];

// ChartBar component to handle individual bar visibility and animation
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
      className={`flex flex-col items-center flex-1 mx-1 transition-all duration-1000 ${
        shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="relative flex flex-col items-center justify-end h-56 w-full">
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
            <div className="text-white font-bold text-xs text-center leading-tight transform -rotate-0">
              <div className="bg-gray-900/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-white/20">
                <AnimatedValue value={data.value} isVisible={shouldAnimate} delay={animationDelay} />
              </div>
            </div>
          </div>
          
          <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap transition-all duration-500 ${
            shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`} style={{ transitionDelay: `${animationDelay + 600}ms` }}></div>
          {data.growth && (
            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap transition-all duration-500 ${formatGrowthColor(data.growth)} ${
              shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`} style={{ transitionDelay: `${animationDelay + 700}ms` }}>
              {data.growth}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BusinessResults: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-100px'
  }, true);
  const [chartRef, isChartVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  }, true);

  useEffect(() => {
    if (isSectionVisible && autoScrollEnabled) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % businessCases.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isSectionVisible, autoScrollEnabled]);

  const nextSlide = () => {
    setAutoScrollEnabled(false);
    setCurrentSlide((prev) => (prev + 1) % businessCases.length);
  };

  const prevSlide = () => {
    setAutoScrollEnabled(false);
    setCurrentSlide((prev) => (prev - 1 + businessCases.length) % businessCases.length);
  };

  const goToSlide = (index: number) => {
    setAutoScrollEnabled(false);
    setCurrentSlide(index);
  };

  return (
    <section id="vipi-programme" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
          isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
         See how the VIPI programme has transformed businesses across different sectors.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {businessCases.map((business, index) => (
                <div key={business.id} className="w-full flex-shrink-0">
                  <BusinessCaseCard
                    business={business}
                    isCurrentSlide={index === currentSlide}
                    isSectionVisible={isSectionVisible}
                    isChartVisible={isChartVisible}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 z-10"
          >
            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
            {businessCases.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === currentSlide 
                    ? 'bg-purple-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Business Names Indicator */}
          <div className="text-center mt-3 sm:mt-4">
            <span className="text-base sm:text-lg font-semibold text-gray-800">
              {businessCases[currentSlide].company}
            </span>
            <span className="text-sm sm:text-base text-gray-500 ml-2">
              ({currentSlide + 1} of {businessCases.length})
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <div className="bg-white border-2 sm:border-4 border-purple-600 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-3xl w-full">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-4">
                Join these successful businesses and unlock your company's potential with the proven VIPI programme.
              </p>
              <button className="w-full sm:w-auto bg-purple-800 hover:bg-purple-900 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-purple-800 hover:border-purple-900">
                Start Your Transformation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessResults;