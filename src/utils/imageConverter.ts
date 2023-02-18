export function blobToWebp(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function (event: Event) {
      if (img.complete && img.naturalWidth === 0) {
        // handle image loading failure
        reject(new Error('Failed to load image'));
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        // handle canvas context failure
        reject(new Error('Failed to create canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(function (webpBlob) {
        if (!webpBlob) {
          // handle toBlob failure
          reject(new Error('Failed to create webp blob'));
          return;
        }
        resolve(webpBlob);
      }, 'image/webp');
    };
    img.onerror = function () {
      reject(new Error('Failed to load image'));
    } as OnErrorEventHandler;
    img.src = URL.createObjectURL(blob);
  });
}
