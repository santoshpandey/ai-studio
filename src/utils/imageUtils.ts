// utils/imageUtils.ts
export const resizeImage = (file: File, maxWidth: number): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): string | null => {
  if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
    return 'Please select a PNG or JPG image';
  }
  if (file.size > 10 * 1024 * 1024) {
    return 'Image must be smaller than 10MB';
  }
  return null;
};