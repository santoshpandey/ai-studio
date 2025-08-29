// hooks/useExponentialBackoff.ts
'use client';
import { useCallback, useRef } from 'react';

export const useExponentialBackoff = () => {
  const abortControllerRef = useRef<AbortController>(null);

  const execute = useCallback(
    async (
      request: () => Promise<any>,
      maxAttempts: number = 3
    ): Promise<any> => {
      abortControllerRef.current = new AbortController();
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const result = await request();
          return result;
        } catch (error) {
          if (abortControllerRef.current?.signal.aborted) {
            throw new Error('Request aborted');
          }

          if (attempt === maxAttempts - 1) throw error;

          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    },
    []
  );

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { execute, abort };
};