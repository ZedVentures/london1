import React, { useState, useEffect } from 'react';
import { X, Calculator, TrendingUp, Building2, DollarSign, Target, Zap, HelpCircle, Info, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';

interface ValuationCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      {isVisible && (
        <div 
          className="absolute z-50 w-96 p-6 bg-white border-2 border-blue-200 text-gray-800 text-base rounded-xl shadow-2xl -top-4 left-10 transform pointer-events-none"
        >
          <div className="absolute -left-3 top-6 w-0 h-0 border-t-6 border-b-6 border-r-6 border-transparent border-r-white"></div>
          <div className="absolute -left-4 top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-200"></div>
          <div className="leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

const sectorMultiples = {
  'Software Development': { micro: 4.9, small: 6.6, baseline: 8.2, upperMid: 10.7 },
  'IT Services & Managed IT': { micro: 4.6, small: 6.1, baseline: 7.6, upperMid: 9.9 },
  'Healthcare & Pharmaceuticals': { micro: 4.6, small: 6.2, baseline: 7.7, upperMid: 10.0 },
  'E-commerce / Web Retail': { micro: 4.0, small: 5.4, baseline: 6.7, upperMid: 8.7 },
  'Industrial & Manufacturing': { micro: 3.2, small: 4.2, baseline: 5.3, upperMid: 6.9 },
  'Wholesale Trade': { micro: 2.3, small: 3.0, baseline: 3.8, upperMid: 4.9 },
  'Retail Trade': { micro: 2.6, small: 3.4, baseline: 4.3, upperMid: 5.6 },
  'Construction & Engineering': { micro: 2.1, small: 2.8, baseline: 3.5, upperMid: 4.6 },
  'Hospitality & Tourism': { micro: 2.7, small: 3.6, baseline: 4.5, upperMid: 5.9 },
  'Media & Communications': { micro: 3.4, small: 4.5, baseline: 5.6, upperMid: 7.3 },
  'Business Services (non-tech)': { micro: 3.5, small: 4.7, baseline: 5.9, upperMid: 7.7 }
};

// Enhanced business size categories with detailed thresholds
const businessSizeCategories = [
  { 
    name: 'Micro Business', 
    range: '£0-200K', 
    ebitdaMin: 0, 
    ebitdaMax: 200, 
    color: 'bg-red-400',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    description: 'Early stage, high risk, limited systems'
  },
  { 
    name: 'Small Business', 
    range: '£200K-1M', 
    ebitdaMin: 200, 
    ebitdaMax: 1000, 
    color: 'bg-orange-400',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    description: 'Established operations, growing systems'
  },
  { 
    name: 'Growing Business', 
    range: '£1M-5M', 
    ebitdaMin: 1000, 
    ebitdaMax: 5000, 
    color: 'bg-yellow-400',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    description: 'Proven model, scalable operations'
  },
  { 
    name: 'Mid-Market', 
    range: '£5M-10M', 
    ebitdaMin: 5000, 
    ebitdaMax: 10000, 
    color: 'bg-green-400',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    description: 'Mature business, strong market position'
  },
  { 
    name: 'Upper Mid-Market', 
    range: '£10M+', 
    ebitdaMin: 10000, 
    ebitdaMax: Infinity, 
    color: 'bg-blue-400',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    description: 'Market leader, premium valuations'
  }
];

// Confidence intervals based on business size and sector
const getConfidenceInterval = (ebitdaValue: number, multiple: number, sector: string) => {
  let confidenceRange = 0.15; // Base 15% range
  
  // Adjust confidence based on business size (smaller = less confident)
  if (ebitdaValue <= 0.2) confidenceRange = 0.25;
  else if (ebitdaValue <= 1) confidenceRange = 0.20;
  else if (ebitdaValue >= 10) confidenceRange = 0.10;
  
  // Adjust for sector volatility
  const volatileSectors = ['E-commerce / Web Retail', 'Media & Communications', 'Hospitality & Tourism'];
  if (volatileSectors.includes(sector)) confidenceRange += 0.05;
  
  return {
    low: multiple * (1 - confidenceRange),
    high: multiple * (1 + confidenceRange)
  };
};

const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({ isOpen, onClose }) => {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [sector, setSector] = useState('');
  const [ebitda, setEbitda] = useState('');
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [valuation, setValuation] = useState(0);
  const [multiple, setMultiple] = useState(0);
  const [businessSize, setBusinessSize] = useState('');
  const [improvedValuation, setImprovedValuation] = useState(0);
  const [improvedMultiple, setImprovedMultiple] = useState(0);
  const [improvedBusinessSize, setImprovedBusinessSize] = useState('');

  const calculateMultiple = (ebitdaValue: number, multiples: any) => {
    let calculatedMultiple = 0;
    let businessSize = '';

    if (ebitdaValue <= 0.2) {
      calculatedMultiple = multiples.micro;
      businessSize = 'Micro Business';
    } else if (ebitdaValue <= 1) {
      // Smooth interpolation between micro and small
      const ratio = (ebitdaValue - 0.2) / (1 - 0.2);
      calculatedMultiple = multiples.micro + (multiples.small - multiples.micro) * ratio;
      businessSize = 'Small Business';
    } else if (ebitdaValue <= 5) {
      // Smooth interpolation between small and baseline
      const ratio = (ebitdaValue - 1) / (5 - 1);
      calculatedMultiple = multiples.small + (multiples.baseline - multiples.small) * ratio;
      businessSize = 'Growing Business';
    } else if (ebitdaValue <= 10) {
      // Smooth interpolation between baseline and upper mid
      const ratio = (ebitdaValue - 5) / (10 - 5);
      calculatedMultiple = multiples.baseline + (multiples.upperMid - multiples.baseline) * ratio;
      businessSize = 'Mid-Market Business';
    } else {
      // Use upper mid multiple for businesses above £10m EBITDA
      calculatedMultiple = multiples.upperMid;
      businessSize = 'Upper Mid-Market Business';
    }

    return { multiple: calculatedMultiple, businessSize };
  };

  const calculateValuation = () => {
    if (!sector || !ebitda) return;

    const ebitdaValue = parseFloat(ebitda) / 1000; // Convert thousands to millions for calculations
    if (isNaN(ebitdaValue) || ebitdaValue <= 0) return;

    const multiples = sectorMultiples[sector as keyof typeof sectorMultiples];
    
    // Calculate net assets (assets - liabilities) in millions
    const assetsValue = assets ? parseFloat(assets) : 0;
    const liabilitiesValue = liabilities ? parseFloat(liabilities) : 0;
    const netAssets = assetsValue - liabilitiesValue;
    
    // Current valuation
    const current = calculateMultiple(ebitdaValue, multiples);
    setMultiple(current.multiple);
    setBusinessSize(current.businessSize);
    setValuation(ebitdaValue * current.multiple + (netAssets / 1000));

    // Improved valuation (3x EBITDA improvement)
    const improvedEbitda = ebitdaValue * 3;
    const improved = calculateMultiple(improvedEbitda, multiples);
    setImprovedMultiple(improved.multiple);
    setImprovedBusinessSize(improved.businessSize);
    setImprovedValuation(improvedEbitda * improved.multiple + (netAssets / 1000));
  };

  useEffect(() => {
    calculateValuation();
  }, [sector, ebitda, assets, liabilities]);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(1)}M`;
    } else if (value >= 100) {
      return `£${value.toFixed(0)}K`;
    } else {
      return `£${value.toFixed(1)}K`;
    }
  };

  const getMultiplePosition = (ebitdaValue: number, multiples: any) => {
    // ebitdaValue should already be in millions when passed to this function
    const ebitdaInMillions = ebitdaValue;
    
    // Define the actual thresholds used in multiple calculation (in millions)
    if (ebitdaInMillions <= 0.2) { // £200K or less (Micro)
      return 0;
    } else if (ebitdaInMillions <= 1) { // £200K to £1M (Small)
      const ratio = (ebitdaInMillions - 0.2) / (1 - 0.2);
      return 25 * ratio;
    } else if (ebitdaInMillions <= 5) { // £1M to £5M (Growing)
      const ratio = (ebitdaInMillions - 1) / (5 - 1);
      return 25 + (25 * ratio);
    } else if (ebitdaInMillions <= 10) { // £5M to £10M (Mid-Market)
      const ratio = (ebitdaInMillions - 5) / (10 - 5);
      return 50 + (25 * ratio);
    } else { // £10M+ (Upper Mid-Market)
      return Math.min(75 + (25 * Math.min((ebitdaInMillions - 10) / 40, 1)), 100);
    }
  };

  const getCurrentBusinessCategory = (ebitdaValue: number) => {
    const ebitdaInThousands = ebitdaValue * 1000;
    return businessSizeCategories.find(cat => 
      ebitdaInThousands >= cat.ebitdaMin && ebitdaInThousands < cat.ebitdaMax
    ) || businessSizeCategories[0];
  };

  const getValuationRange = (ebitdaValue: number, sector: string) => {
    if (!sector) return { low: 0, mid: 0, high: 0 };
    
    const multiples = sectorMultiples[sector as keyof typeof sectorMultiples];
    const current = calculateMultiple(ebitdaValue, multiples);
    const confidence = getConfidenceInterval(ebitdaValue, current.multiple, sector);
    
    return {
      low: ebitdaValue * confidence.low,
      mid: ebitdaValue * current.multiple,
      high: ebitdaValue * confidence.high
    };
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Calculator className="w-6 sm:w-8 h-6 sm:h-8" />
              <div>
                <h2 className="text-lg sm:text-2xl font-bold">Business Valuation Calculator</h2>
                <p className="text-sm sm:text-base text-purple-100 hidden sm:block">Get an instant estimate of your business value</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Disclaimer Modal */}
        {!disclaimerAccepted && (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <Info className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">Important Disclaimer</h3>
                  <div className="text-red-700 text-sm sm:text-base leading-relaxed space-y-4">
                    <p className="font-semibold">
                      This valuation calculator provides estimates only and does not guarantee results.
                    </p>
                    <p>
                      The calculations shown are based on industry averages and standard multiples. Actual business valuations are complex and depend on numerous factors including:
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                      <li>Current market conditions and economic climate</li>
                      <li>Business-specific factors, risks, and opportunities</li>
                      <li>Quality and diversity of revenue streams</li>
                      <li>Management team strength and operational systems</li>
                      <li>Competitive position and growth prospects</li>
                      <li>Customer concentration and retention rates</li>
                      <li>Asset quality and financial health</li>
                    </ul>
                    <p className="font-semibold">
                      These estimates do not constitute professional financial advice or a formal valuation. For accurate business valuations, professional assessment is required.
                    </p>
                    <p>
                      Results from our VIPI programme vary by business and are subject to market conditions, business circumstances, and implementation commitment. Past performance does not guarantee future results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl border border-red-200 mb-6">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-gray-800 text-sm sm:text-base leading-relaxed group-hover:text-gray-900">
                    I understand that this calculator provides estimates only and does not guarantee results. I acknowledge that actual business valuations require professional assessment and that results may vary.
                  </span>
                </label>
              </div>

              <button
                onClick={() => setDisclaimerAccepted(true)}
                disabled={!disclaimerAccepted}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  disclaimerAccepted
                    ? 'bg-purple-800 hover:bg-purple-900 text-white hover:scale-105 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Calculator
              </button>
            </div>
          </div>
        )}

        {/* Calculator Content - Only show after disclaimer accepted */}
        {disclaimerAccepted && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Sector Selection */}
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center space-x-2">
              <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-1 sm:mr-2" />
              <span>Select Your Business Sector *</span>
              <Tooltip content="Choose the sector that best describes your primary business activity. Different sectors have different valuation multiples based on market conditions, growth potential, and investor appetite. This significantly impacts your business valuation.">
                <HelpCircle className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 hover:text-purple-600 cursor-help" />
              </Tooltip>
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base lg:text-lg min-h-[44px]"
            >
              <option value="">Please select your business sector...</option>
              {Object.keys(sectorMultiples).map((sectorName) => (
                <option key={sectorName} value={sectorName}>
                  {sectorName}
                </option>
              ))}
            </select>
          </div>

          {/* EBITDA Input */}
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center space-x-2">
              <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-1 sm:mr-2" />
              <span>Annual EBITDA (£ thousands) *</span>
              <Tooltip content="EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. This is your business's operating profit before these deductions. Enter the amount in thousands (e.g., enter 500 for £500,000). This is the key metric used to calculate your business valuation.">
                <HelpCircle className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 hover:text-purple-600 cursor-help" />
              </Tooltip>
            </label>
            
            {/* Guidance for users who don't know EBITDA */}
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Info className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-blue-800 mb-1 sm:mb-2">Don't know your EBITDA?</h4>
                  <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                    If you don't have your EBITDA figure readily available, you can use your <strong>Profit Before Tax</strong> as a close approximation for this calculator.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-lg font-medium">£</span>
              <input
                type="number"
                value={ebitda}
                onChange={(e) => setEbitda(e.target.value)}
                placeholder="500 (for £500,000 EBITDA or Profit Before Tax)"
                step="10"
                min="0"
                className="w-full pl-6 sm:pl-8 pr-16 sm:pr-20 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base lg:text-lg min-h-[44px]"
                inputMode="numeric"
              />
              <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm lg:text-base">thousand</span>
            </div>
            {!ebitda && (
              <p className="text-xs sm:text-sm text-purple-600 mt-2 font-medium">
                Please enter your annual EBITDA (or Profit Before Tax) to see your business valuation
              </p>
            )}
          </div>

          {/* Assets Input */}
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center space-x-2">
              <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-1 sm:mr-2" />
              <span>Total Assets (£ thousands)</span>
              <Tooltip content="Enter your business's total assets value. This includes all current and fixed assets such as cash, inventory, equipment, property, and other valuable resources owned by your business. Enter the amount in thousands (e.g., enter 1500 for £1,500,000).">
                <HelpCircle className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 hover:text-purple-600 cursor-help" />
              </Tooltip>
            </label>
            
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-lg font-medium">£</span>
              <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                placeholder="1500 (for £1,500,000 in total assets)"
                step="10"
                min="0"
                className="w-full pl-6 sm:pl-8 pr-16 sm:pr-20 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base lg:text-lg min-h-[44px]"
                inputMode="numeric"
              />
              <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm lg:text-base">thousand</span>
            </div>
          </div>

          {/* Liabilities Input */}
          <div>
            <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center space-x-2">
              <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 mr-1 sm:mr-2" />
              <span>Total Liabilities (£ thousands)</span>
              <Tooltip content="Enter your business's total liabilities value. This includes all debts and obligations such as loans, accounts payable, mortgages, and other amounts owed by your business. Enter the amount in thousands (e.g., enter 800 for £800,000).">
                <HelpCircle className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 hover:text-purple-600 cursor-help" />
              </Tooltip>
            </label>
            
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-lg font-medium">£</span>
              <input
                type="number"
                value={liabilities}
                onChange={(e) => setLiabilities(e.target.value)}
                placeholder="800 (for £800,000 in total liabilities)"
                step="10"
                min="0"
                className="w-full pl-6 sm:pl-8 pr-16 sm:pr-20 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base lg:text-lg min-h-[44px]"
                inputMode="numeric"
              />
              <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm lg:text-base">thousand</span>
            </div>
          </div>

          {/* Current Valuation Results */}
          {sector && ebitda && !isNaN(parseFloat(ebitda)) && parseFloat(ebitda) > 0 && (
            <>

              <div className="bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center mb-3 sm:mb-4">
                  <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 mr-2" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Current Business Valuation</h3>
                  <Tooltip content="This shows your current estimated business valuation based on your EBITDA and sector-specific multiples. The multiple increases with business size due to the size premium effect - larger businesses are typically more valuable per pound of EBITDA.">
                    <HelpCircle className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 hover:text-purple-600 cursor-help ml-2" />
                  </Tooltip>
                  <Tooltip content={
                    <div className="space-y-4">
                      <div className="font-semibold text-lg text-blue-900 border-b border-blue-200 pb-2">
                        Why Size Premium Matters
                      </div>
                      <div className="text-gray-700 leading-relaxed">
                        Larger businesses command higher valuation multiples because they typically offer:
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-blue-900">Lower Risk</div>
                            <div className="text-gray-600 text-sm">More diversified revenue streams and customer base</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-blue-900">Better Systems</div>
                            <div className="text-gray-600 text-sm">More established processes and management structures</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-blue-900">Market Position</div>
                            <div className="text-gray-600 text-sm">Stronger competitive advantages and market presence</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-blue-900">Scalability</div>
                            <div className="text-gray-600 text-sm">Proven ability to grow and handle larger operations</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-blue-900">Buyer Appeal</div>
                            <div className="text-gray-600 text-sm">More attractive to strategic and financial buyers</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="font-semibold text-blue-900 mb-1">Key Insight:</div>
                        <div className="text-blue-800 text-sm">
                          Growing your EBITDA doesn't just increase earnings - it moves you into a higher valuation category with better multiples.
                        </div>
                      </div>
                    </div>
                  }>
                    <button className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold rounded-full transition-colors duration-300 flex items-center space-x-1">
                      <Info className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                      <span className="hidden sm:inline">Size Premium</span>
                    </button>
                  </Tooltip>
                </div>
                
                {/* Simplified Multiple Scale for Current Valuation */}
                <div className="mb-4 sm:mb-6">
                  <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Multiple Range for {sector}</div>
                  <div className="relative h-6 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded-full">
                    <div 
                      className="absolute top-0 w-4 sm:w-6 h-4 sm:h-6 bg-purple-600 rounded-full border-2 border-white shadow-lg transform -translate-x-2 sm:-translate-x-3 transition-all duration-700 flex items-center justify-center"
                      style={{ 
                        left: `${getMultiplePosition(parseFloat(ebitda) / 1000, sectorMultiples[sector as keyof typeof sectorMultiples])}%` 
                      }}
                    >
                      <div className="w-1 sm:w-2 h-1 sm:h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                    <span>Micro<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.micro.toFixed(1)}x</span>
                    <span>Small<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.small.toFixed(1)}x</span>
                    <span>Growing<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.baseline.toFixed(1)}x</span>
                    <span>Upper Mid<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.upperMid.toFixed(1)}x</span>
                  </div>
                  <div className="text-center mt-2 text-xs sm:text-sm text-gray-600">
                    Current Position: <span className="font-semibold text-purple-800">{businessSize}</span> 
                    ({multiple.toFixed(1)}x multiple)
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Business Size</div>
                    <div className="text-sm sm:text-lg font-semibold text-purple-800">{businessSize}</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Applied Multiple</div>
                    <div className="text-lg sm:text-2xl font-bold text-purple-800">{multiple.toFixed(1)}x</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Current Valuation</div>
                    <div className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(valuation * 1000)}</div>
                  </div>
                </div>
                
                {/* Calculation Breakdown */}
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-purple-100">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Valuation Calculation</div>
                    {(() => {
                      const assetsValue = assets ? parseFloat(assets) : 0;
                      const liabilitiesValue = liabilities ? parseFloat(liabilities) : 0;
                      const netAssets = assetsValue - liabilitiesValue;
                      const ebitdaValuation = (parseFloat(ebitda) / 1000) * multiple;
                      
                      return (
                        <div className="space-y-2">
                          <div className="text-sm sm:text-lg font-semibold text-gray-800">
                            £{parseFloat(ebitda).toFixed(0)}K EBITDA × {multiple.toFixed(1)}x Multiple = {formatCurrency(ebitdaValuation * 1000)}
                          </div>
                          {(assets || liabilities) && (
                            <>
                              <div className="text-xs sm:text-sm text-gray-600">
                                Net Assets: {formatCurrency(netAssets)}
                              </div>
                              <div className="text-sm sm:text-lg font-bold text-purple-800 pt-2 border-t border-gray-200">
                                Total Valuation: {formatCurrency(ebitdaValuation * 1000)} + {formatCurrency(netAssets)} = {formatCurrency(valuation * 1000)}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Improved Valuation with Purple Guard */}
              <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-6 rounded-2xl border border-green-200">
                <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 mr-2" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Potential with Purple Guard Advisory</h3>
                  </div>
                  <span className="sm:ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full self-start sm:self-auto">Average 3x EBITDA Growth</span>
                  <Tooltip content="This shows your potential business valuation after our VIPI programme achieves 3x EBITDA growth. Notice how the higher EBITDA not only increases earnings but also moves you into a higher multiple category, creating compound value growth.">
                    <HelpCircle className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 hover:text-purple-600 cursor-help ml-2" />
                  </Tooltip>
                </div>
                
                {/* Clarification about 3x EBITDA basis */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Info className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-blue-800 mb-1 sm:mb-2">Based on Real Client Results</h4>
                      <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                        The 3x EBITDA growth projection is based on the <strong>average increase</strong> that the VIPI programme has delivered to our long-term clients. Individual results may vary depending on business circumstances, market conditions, and implementation commitment.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Improved Multiple Scale */}
                <div className="mb-4 sm:mb-6">
                  <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Improved Position After VIPI Programme</div>
                  <div className="relative h-6 bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 rounded-full">
                    <div 
                      className="absolute top-0 w-4 sm:w-6 h-4 sm:h-6 bg-green-600 rounded-full border-2 border-white shadow-lg transform -translate-x-2 sm:-translate-x-3 transition-all duration-700 flex items-center justify-center"
                      style={{ 
                        left: `${getMultiplePosition((parseFloat(ebitda) * 3) / 1000, sectorMultiples[sector as keyof typeof sectorMultiples])}%` 
                      }}
                    >
                      <div className="w-1 sm:w-2 h-1 sm:h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                    <span>Micro<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.micro.toFixed(1)}x</span>
                    <span>Small<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.small.toFixed(1)}x</span>
                    <span>Growing<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.baseline.toFixed(1)}x</span>
                    <span>Upper Mid<br/>{sectorMultiples[sector as keyof typeof sectorMultiples]?.upperMid.toFixed(1)}x</span>
                  </div>
                  <div className="text-center mt-2 text-xs sm:text-sm text-gray-600">
                    Improved Position: <span className="font-semibold text-green-800">{improvedBusinessSize}</span> 
                    ({improvedMultiple.toFixed(1)}x multiple)
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">New Business Size</div>
                    <div className="text-sm sm:text-lg font-semibold text-green-800">{improvedBusinessSize}</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">New EBITDA</div>
                    <div className="text-sm sm:text-lg font-semibold text-green-800">£{(parseFloat(ebitda) * 3).toFixed(0)}K</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Applied Multiple</div>
                    <div className="text-lg sm:text-2xl font-bold text-green-800">{improvedMultiple.toFixed(1)}x</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Potential Valuation</div>
                    <div className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(improvedValuation * 1000)}</div>
                  </div>
                </div>

                {/* Improved Calculation Breakdown */}
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-green-100">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Improved Valuation Calculation</div>
                    {(() => {
                      const assetsValue = assets ? parseFloat(assets) : 0;
                      const liabilitiesValue = liabilities ? parseFloat(liabilities) : 0;
                      const netAssets = assetsValue - liabilitiesValue;
                      const improvedEbitdaValuation = ((parseFloat(ebitda) * 3) / 1000) * improvedMultiple;
                      
                      return (
                        <div className="space-y-2">
                          <div className="text-sm sm:text-lg font-semibold text-gray-800">
                            £{(parseFloat(ebitda) * 3).toFixed(0)}K EBITDA × {improvedMultiple.toFixed(1)}x Multiple = {formatCurrency(improvedEbitdaValuation * 1000)}
                          </div>
                          {(assets || liabilities) && (
                            <>
                              <div className="text-xs sm:text-sm text-gray-600">
                                Net Assets: {formatCurrency(netAssets)}
                              </div>
                              <div className="text-sm sm:text-lg font-bold text-green-800 pt-2 border-t border-gray-200">
                                Total Valuation: {formatCurrency(improvedEbitdaValuation * 1000)} + {formatCurrency(netAssets)} = {formatCurrency(improvedValuation * 1000)}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Value Creation Summary */}
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 sm:p-4 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-green-800 mb-1">Total Value Creation</h4>
                      <p className="text-xs sm:text-sm text-green-700">
                        EBITDA Growth + Size Premium = Maximum Value
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">
                        {formatCurrency((improvedValuation - valuation) * 1000)}
                      </div>
                      <div className="text-xs sm:text-sm text-green-700">Additional Value</div>
                    </div>
                  </div>
                </div>

                {/* Missing Value Potential */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-red-200 mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <Target className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mr-2 sm:mr-3" />
                      <h4 className="text-lg sm:text-2xl font-bold text-red-800">Value You're Missing</h4>
                    </div>
                    
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-4xl font-bold text-red-600 mb-2">
                        {formatCurrency((improvedValuation - valuation) * 1000)}
                      </div>
                      <div className="text-sm sm:text-lg text-gray-700 mb-3 sm:mb-4">
                        Potential additional business value with the VIPI programme
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="bg-gray-50 p-2 sm:p-3 rounded">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm">Current Value</div>
                          <div className="text-sm sm:text-lg font-bold text-gray-600">{formatCurrency(valuation * 1000)}</div>
                        </div>
                        <div className="bg-green-50 p-2 sm:p-3 rounded">
                          <div className="font-semibold text-green-800 text-xs sm:text-sm">Potential Value</div>
                          <div className="text-sm sm:text-lg font-bold text-green-600">{formatCurrency(improvedValuation * 1000)}</div>
                        </div>
                        <div className="bg-red-50 p-2 sm:p-3 rounded">
                          <div className="font-semibold text-red-800 text-xs sm:text-sm">Missing Value</div>
                          <div className="text-sm sm:text-lg font-bold text-red-600">{formatCurrency((improvedValuation - valuation) * 1000)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-red-700 text-xs sm:text-sm leading-relaxed">
                      <p className="mb-1 sm:mb-2">
                        <strong>This represents the value gap</strong> between where your business is today and where it could be with the proven VIPI framework.
                      </p>
                      <p>
                        Every day you wait is potential value left on the table. Our programme doesn't just grow your EBITDA - it positions your business in a higher valuation category.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-xl">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">How we achieve this:</h4>
                  <ul className="text-blue-700 text-xs sm:text-sm space-y-1">
                    <li>• <strong>Average 3x EBITDA Growth:</strong> Based on long-term client results through our proven VIPI framework</li>
                    <li>• <strong>Size Premium:</strong> Larger businesses command higher multiples</li>
                    <li>• <strong>Sector Optimization:</strong> Industry-specific value enhancement strategies</li>
                    <li>• <strong>Exit Readiness:</strong> Positioning for maximum acquirer appeal</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-3 sm:p-4 rounded-xl">
                <h4 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">How this works:</h4>
                <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                  The sliding chart uses logarithmic scaling to show your position across the full spectrum of business sizes. Your current valuation uses a {multiple.toFixed(1)}x multiple for {sector.toLowerCase()} businesses of your size. 
                  The confidence intervals reflect market volatility and business-specific factors that can affect final valuations.
                </p>
              </div>
            </>
          )}

          {/* Comprehensive Disclaimer */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 sm:mb-4">Important Disclaimer</h4>
            <p className="text-blue-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Business valuation is a complex process that is unique to every business. The calculations shown above are estimates based on industry averages and standard multiples.
            </p>
            <p className="text-blue-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              These numbers may not reflect current realizable valuations as they do not account for:
            </p>
            <ul className="text-blue-700 text-xs sm:text-sm space-y-1 sm:space-y-2 mb-4 sm:mb-6 ml-3 sm:ml-4">
              <li>• Market conditions and timing</li>
              <li>• Business-specific factors and risks</li>
              <li>• Asset quality and customer concentration</li>
              <li>• Management team and operational efficiency</li>
              <li>• Growth prospects and competitive position</li>
            </ul>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
              <h5 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">Ready for a more accurate valuation?</h5>
              <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                The first stage of our VIPI programme will provide you with a comprehensive analysis and a more accurate understanding of your business current market valuation.
              </p>
            </div>
          </div>

          {/* Guidance for incomplete form */}
          {(!sector || !ebitda || isNaN(parseFloat(ebitda)) || parseFloat(ebitda) <= 0) && (
            <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-200">
              <h3 className="text-base sm:text-lg font-semibold text-purple-800 mb-2 sm:mb-3">Get Started</h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-purple-700">
                {!sector && (
                  <p className="flex items-center">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                    Please select your business sector above
                  </p>
                )}
                {(!ebitda || isNaN(parseFloat(ebitda)) || parseFloat(ebitda) <= 0) && (
                  <p className="flex items-center">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                    Please enter your annual EBITDA in thousands (e.g., 500 for £500,000)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center pt-6 sm:pt-8 border-t border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 px-2">Want to Unlock This Potential?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
              Our VIPI programme includes comprehensive business valuations and strategies to maximize your exit value.
            </p>
            <button
              onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-purple-800 hover:bg-purple-900 text-white px-6 sm:px-8 py-4 rounded-xl font-semibold text-base sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px]"
            >
              Start a Conversation
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ValuationCalculator;