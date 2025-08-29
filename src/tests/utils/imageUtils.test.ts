// tests/utils/imageUtils.test.ts
import { resizeImage, validateImageFile } from '../../utils/imageUtils';

describe('imageUtils', () => {
  describe('validateImageFile', () => {
    it('should return null for valid PNG file', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      const result = validateImageFile(file);
      expect(result).toBeNull();
    });

    it('should return error for invalid file type', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      const result = validateImageFile(file);
      expect(result).toBe('Please select a PNG or JPG image');
    });

    it('should return error for file larger than 10MB', () => {
      const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'test.png', { type: 'image/png' });
      const result = validateImageFile(largeFile);
      expect(result).toBe('Image must be smaller than 10MB');
    });
  });

  xdescribe('resizeImage', () => {
    xit('should resize image when width exceeds maxWidth', async () => {
      // Create a mock image with larger dimensions
      const mockImage = {
        width: 3000,
        height: 2000,
        onload: jest.fn(),
        src: '',
      };

      // Mock global Image
      global.Image = jest.fn(() => mockImage) as any;

      const file = new File([''], 'test.png', { type: 'image/png' });
      
      // Start the resize operation
      const resizePromise = resizeImage(file, 1920);
      
      // Trigger the onload after a short delay to simulate image loading
      setTimeout(() => {
        mockImage.onload();
      }, 100);

      const result = await resizePromise;
      expect(result).toBe('data:image/jpeg;base64,test');
    });
  });
});