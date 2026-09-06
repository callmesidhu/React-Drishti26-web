const TOTAL_LOGO_FRAMES = 150;
const FRAME_CACHE_KEY = "drishti-logo-frames-v1";
const MAX_CONCURRENT_LOADS = 6;

const frameImages = new Map();
let preloadPromise;

export const getLogoFramePath = (frameIndex) =>
 `/3dlogo/ezgif-frame-${String(frameIndex).padStart(3, "0")}.webp`;

const loadFrame = (frameIndex) => {
 if (frameImages.has(frameIndex)) return Promise.resolve(frameImages.get(frameIndex));

 return new Promise((resolve, reject) => {
  const image = new Image();
  image.decoding = "async";
  image.loading = "eager";
  image.onload = async () => {
   try {
    if (image.decode) await image.decode();
   } catch {
    // The image is still usable when the browser has already decoded it.
   }
   frameImages.set(frameIndex, image);
   resolve(image);
  };
  image.onerror = () => reject(new Error(`Unable to load logo frame ${frameIndex}`));
  image.src = getLogoFramePath(frameIndex);
 });
};

export const preloadLogoFrames = () => {
 if (preloadPromise) return preloadPromise;

 preloadPromise = new Promise((resolve) => {
  let nextFrame = 1;
  let activeLoads = 0;
  let completedLoads = 0;

  const finish = () => {
   try {
    sessionStorage.setItem(FRAME_CACHE_KEY, "ready");
   } catch {
    // Restricted storage must not block the site.
   }
   resolve();
  };

  const loadNext = () => {
   if (completedLoads === TOTAL_LOGO_FRAMES) {
    finish();
    return;
   }

   while (activeLoads < MAX_CONCURRENT_LOADS && nextFrame <= TOTAL_LOGO_FRAMES) {
    const frameIndex = nextFrame;
    nextFrame += 1;
    activeLoads += 1;

    loadFrame(frameIndex)
     .catch(() => {})
     .finally(() => {
      activeLoads -= 1;
      completedLoads += 1;
      loadNext();
     });
   }
  };

  loadNext();
 });

 return preloadPromise;
};

export const getLogoFrame = (frameIndex) => frameImages.get(frameIndex);

export { TOTAL_LOGO_FRAMES };
