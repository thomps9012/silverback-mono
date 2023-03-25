import { buildResponsiveImage } from '@amazeelabs/cloudinary-responsive-image';

import {
  ResponsiveImage,
  ResponsiveImageConfig,
} from '../types/responsive_image';

export const resolveResponsiveImage = (
  originalImage: string,
  config?: ResponsiveImageConfig,
): string => {
  const responsiveImage: ResponsiveImage = {
    src: originalImage,
  };

  // If no config object is given, we just return the original image url.
  if (typeof config === 'undefined') {
    return JSON.stringify(responsiveImage);
  }

  // Also, if the cloudinary env variables are not set, just return the original
  // image.
  if (
    typeof process.env.CLOUDINARY_API_SECRET === 'undefined' ||
    typeof process.env.CLOUDINARY_API_KEY === 'undefined' ||
    typeof process.env.CLOUDINARY_CLOUDNAME === 'undefined'
  ) {
    return JSON.stringify(responsiveImage);
  }
  return buildResponsiveImage(
    {
      secret: process.env.CLOUDINARY_API_SECRET,
      key: process.env.CLOUDINARY_API_KEY,
      cloudname: process.env.CLOUDINARY_CLOUDNAME,
    },
    originalImage,
    config,
  );
};
