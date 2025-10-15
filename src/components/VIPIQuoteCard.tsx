import React from 'react';
import { Building } from 'lucide-react';
import { useIntersectionObserver } from './AnimatedValue';

interface VIPIQuoteCardProps {
  quote: string;
  author: string;
  role: string;
  colorScheme: 'purple' | 'blue' | 'green' | 'indigo';
}

const VIPIQuoteCard: React.FC<VIPIQuoteCardProps> = ({ quote, author, role, colorScheme }) => {
  const [quoteRef, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  }, true);

  const colorClasses = {
    purple: {
      bg: 'from-purple-50 to-white',
      border: 'border-purple-200',
      decorTop: 'bg-purple-100',
      decorBottom: 'bg-purple-200',
      icon: 'bg-purple-600',
      text: 'text-purple-600',
      gradient: 'from-purple-600 to-purple-700'
    },
    blue: {
      bg: 'from-blue-50 to-white',
      border: 'border-blue-200',
      decorTop: 'bg-blue-100',
      decorBottom: 'bg-blue-200',
      icon: 'bg-blue-600',
      text: 'text-blue-600',
      gradient: 'from-blue-600 to-blue-700'
    },
    green: {
      bg: 'from-green-50 to-white',
      border: 'border-green-200',
      decorTop: 'bg-green-100',
      decorBottom: 'bg-green-200',
      icon: 'bg-green-600',
      text: 'text-green-600',
      gradient: 'from-green-600 to-green-700'
    },
    indigo: {
      bg: 'from-indigo-50 to-white',
      border: 'border-indigo-200',
      decorTop: 'bg-indigo-100',
      decorBottom: 'bg-indigo-200',
      icon: 'bg-indigo-600',
      text: 'text-indigo-600',
      gradient: 'from-indigo-600 to-indigo-700'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      ref={quoteRef}
      className={`mb-8 bg-gradient-to-br ${colors.bg} p-6 rounded-xl border ${colors.border} shadow-lg relative overflow-hidden transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <div className={`absolute top-0 right-0 w-16 h-16 ${colors.decorTop} rounded-full -translate-y-8 translate-x-8 opacity-50 transition-all duration-1000 ${
        isVisible ? 'scale-100' : 'scale-0'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-12 h-12 ${colors.decorBottom} rounded-full translate-y-6 -translate-x-6 opacity-30 transition-all duration-1000 delay-200 ${
        isVisible ? 'scale-100' : 'scale-0'
      }`}></div>

      <div className="relative z-10">
        <div className={`w-8 h-8 ${colors.icon} rounded-full flex items-center justify-center mb-4 shadow-lg transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
        }`}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        <blockquote className={`text-base font-medium text-gray-800 leading-relaxed mb-4 italic relative z-10 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          "{quote}"
        </blockquote>

        <div className={`flex items-center space-x-3 relative z-10 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center`}>
            <Building className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{author}</div>
            <div className={`${colors.text} text-xs font-medium`}>{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPIQuoteCard;
