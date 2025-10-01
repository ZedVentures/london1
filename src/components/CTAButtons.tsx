import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CTAButtonsProps {
  onStartConversation?: () => void;
  onExploreVIPI?: () => void;
  onTryCalculator?: () => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  onStartConversation,
  onExploreVIPI,
  onTryCalculator
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto px-4">
      {/* Start a Conversation Button */}
      <button
        onClick={onStartConversation}
        className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 min-w-[200px]"
      >
        <span>Start a Conversation</span>
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Explore the VIPI Programme Button */}
      <button
        onClick={onExploreVIPI}
        className="w-full sm:w-auto bg-transparent hover:bg-purple-50 text-purple-700 px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 border-2 border-purple-700 hover:border-purple-800 flex items-center justify-center space-x-2 min-w-[200px]"
      >
        <span>Explore the VIPI Programme</span>
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Try Our Valuation Calculator Button */}
      <button
        onClick={onTryCalculator}
        className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 min-w-[200px]"
      >
        <span>Try Our Valuation Calculator</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CTAButtons;