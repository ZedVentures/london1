import React, { useState, useEffect } from 'react';

// Custom hook for intersection observer
export const useIntersectionObserver = (options = {}, triggerOnce = false) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
        setIsIntersecting(true);
        if (triggerOnce) {
          setHasTriggered(true);
        }
      } else if (!triggerOnce) {
        setIsIntersecting(entry.isIntersecting);
      }
    }, {
      threshold: 0.3,
      rootMargin: '-50px',
      ...options
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, options]);

  return [setElement, isIntersecting, hasTriggered] as const;
};

// Custom hook for counting animation
export const useCountAnimation = (endValue: number, isVisible: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(endValue * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, isVisible, duration]);

  return count;
};

// Helper function to parse values for animation
const parseValueForAnimation = (value: string): number => {
  const numStr = value.replace('£', '').replace(',', '');
  if (numStr.includes('M')) {
    return parseFloat(numStr.replace('M', '')) * 1000;
  } else if (numStr.includes('K')) {
    return parseFloat(numStr.replace('K', ''));
  } else if (numStr.includes('%')) {
    return parseFloat(numStr.replace('+', '').replace('%', ''));
  } else {
    return parseFloat(numStr);
  }
};

// Helper function to format animated values
const formatAnimatedValue = (value: number, originalFormat: string): string => {
  if (originalFormat.includes('M')) {
    return `£${(value / 1000).toFixed(value >= 1000 ? 1 : 2)}M`;
  } else if (originalFormat.includes('K')) {
    return `£${value.toFixed(0)}K`;
  } else if (originalFormat.includes('%')) {
    return `+${value.toFixed(0)}%`;
  } else {
    return value.toString();
  }
};

// Animated value component
interface AnimatedValueProps {
  value: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

const AnimatedValue: React.FC<AnimatedValueProps> = ({ value, isVisible, delay = 0, className = '' }) => {
  const numericValue = parseValueForAnimation(value);
  const animatedValue = useCountAnimation(numericValue, isVisible, 2000 + delay);
  
  return (
    <span className={className}>
      {formatAnimatedValue(animatedValue, value)}
    </span>
  );
};

export default AnimatedValue;