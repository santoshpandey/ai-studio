// tests/setup.ts
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '';
  },
}));

// Mock window.URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');

// Mock HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = jest.fn() as any;
HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/jpeg;base64,test');