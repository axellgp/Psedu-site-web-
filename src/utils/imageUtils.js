/**
 * Utility function to get the correct image path for deployment
 * Handles both development and production (GitHub Pages) environments
 */
export const getImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In development, use the path as-is with leading slash
  // In production (GitHub Pages), use the base path
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  } else {
    // For GitHub Pages, use the base path
    return `/Psedu-site-web-/${cleanPath}`;
  }
};

/**
 * Get image path for assets in public folder
 */
export const getPublicImagePath = (path) => {
  return getImagePath(path);
};

/**
 * Get image path for src assets (these should be imported instead)
 */
export const getSrcImagePath = (path) => {
  // For src assets, we should import them instead of using paths
  console.warn('Use import for src assets instead of path references:', path);
  return getImagePath(path);
};
