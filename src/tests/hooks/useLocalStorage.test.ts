// tests/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return initial value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  it('should return value from localStorage when available', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(result.current[0]).toBe('newValue');
    expect(JSON.parse(window.localStorage.getItem('testKey')!)).toBe('newValue');
  });
});