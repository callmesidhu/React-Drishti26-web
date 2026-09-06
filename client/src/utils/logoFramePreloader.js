const TOTAL_LOGO_FRAMES = 150;
const frameImages = new Map();
const framePromises = new Map();

export const getLogoFramePath = (frameIndex) =>
 `/3dlogo/ezgif-frame-${String(frameIndex).padStart(3, "0")}.webp`;

export const getLogoFrame = (frameIndex) => frameImages.get(frameIndex);

export const loadLogoFrame = (frameIndex) => {
 const safeIndex = Math.max(1, Math.min(TOTAL_LOGO_FRAMES, frameIndex));
 if (frameImages.has(safeIndex)) return Promise.resolve(frameImages.get(safeIndex));
 if (framePromises.has(safeIndex)) return framePromises.get(safeIndex);

 const promise = new Promise((resolve, reject) => {
  const image = new Image();
  image.decoding = "async";
  image.onload = () => {
   frameImages.set(safeIndex, image);
   framePromises.delete(safeIndex);
   resolve(image);
  };
  image.onerror = () => {
   framePromises.delete(safeIndex);
   reject(new Error(`Unable to load logo frame ${safeIndex}`));
  };
  image.src = getLogoFramePath(safeIndex);
 });

 framePromises.set(safeIndex, promise);
 return promise;
};

export const preloadLogoFrameWindow = (frameIndex, radius = 12) => {
 const tasks = [];
 for (let offset = -radius; offset <= radius; offset += 1) {
  tasks.push(loadLogoFrame(frameIndex + offset).catch(() => null));
 }
 return Promise.all(tasks);
};

export { TOTAL_LOGO_FRAMES };

