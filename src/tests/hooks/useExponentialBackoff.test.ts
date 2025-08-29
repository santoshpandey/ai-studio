// tests/hooks/useExponentialBackoff.test.ts
import { renderHook, act } from '@testing-library/react';
import { useExponentialBackoff } from '../../hooks/useExponentialBackoff';

describe('useExponentialBackoff', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should execute successfully on first attempt', async () => {
    const { result } = renderHook(() => useExponentialBackoff());
    const mockRequest = jest.fn().mockResolvedValue('success');

    const promise = result.current.execute(mockRequest);
    
    await act(async () => {
      jest.runAllTimers();
    });
    
    await expect(promise).resolves.toBe('success');
    expect(mockRequest).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure with exponential backoff', async () => {
    const { result } = renderHook(() => useExponentialBackoff());
    const mockRequest = jest.fn()
      .mockRejectedValueOnce(new Error('First failure'))
      .mockRejectedValueOnce(new Error('Second failure'))
      .mockResolvedValue('success');

    const promise = result.current.execute(mockRequest);
    
    // First attempt (immediate)
    await act(async () => {
      jest.advanceTimersByTime(0);
    });
    
    // Second attempt (after 1 second)
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    
    // Third attempt (after 2 seconds)
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    
    await expect(promise).resolves.toBe('success');
    expect(mockRequest).toHaveBeenCalledTimes(3);
  });

  xit('should abort requests', async () => {
    const { result } = renderHook(() => useExponentialBackoff());
    const mockRequest = jest.fn(() => new Promise(() => {})); // Never resolves

    const promise = result.current.execute(mockRequest);
    
    await act(async () => {
      result.current.abort();
    });
    
    await expect(promise).rejects.toThrow('Request aborted');
  });
});