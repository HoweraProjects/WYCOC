// 上传头像时先缩放 + 压缩，避免把整张原图以超长 base64 存进存档/本地缓存。
// 头像显示尺寸最大 200×300，导出时按 2x，640px 足够清晰且体积很小。
export function resizeImageFile(
  file: File,
  maxDim = 640,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('图片解码失败'));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // 无法压缩时退回原始 data URL
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        // 优先 WebP（体积更小）；不支持则回退 JPEG
        let out = canvas.toDataURL('image/webp', quality);
        if (!out.startsWith('data:image/webp')) {
          out = canvas.toDataURL('image/jpeg', quality);
        }
        // 极小图片若压缩后反而更大，保留较短者
        const original = String(reader.result);
        resolve(out.length < original.length ? out : original);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
