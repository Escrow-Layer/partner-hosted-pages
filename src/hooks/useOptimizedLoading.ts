import { useState, useEffect } from "react";

interface UseOptimizedLoadingProps {
  initialDelay?: number;
  minimumDuration?: number;
}

export const useOptimizedLoading = ({ 
  initialDelay = 0, 
  minimumDuration = 500 
}: UseOptimizedLoadingProps = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = () => {
    setStartTime(Date.now());
    setIsLoading(true);
  };

  const stopLoading = () => {
    if (startTime) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minimumDuration - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialDelay > 0) {
      const timer = setTimeout(() => {
        setStartTime(Date.now());
      }, initialDelay);
      
      return () => clearTimeout(timer);
    } else {
      setStartTime(Date.now());
    }
  }, [initialDelay]);

  return { isLoading, startLoading, stopLoading };
};