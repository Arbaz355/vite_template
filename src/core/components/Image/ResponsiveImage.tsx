/**
 * Responsive Image Component
 *
 * A component for handling responsive images with:
 * - Lazy loading
 * - Multiple resolutions (srcset)
 * - Blur-up loading effect
 * - Fallback support
 * - Aspect ratio preservation
 */

import React, { useState, useEffect } from 'react';

export interface ResponsiveImageProps {
  /** Main image source */
  src: string;
  /** Image srcset for responsive sizes */
  srcSet?: string;
  /** Image sizes attribute */
  sizes?: string;
  /** Low quality image placeholder */
  placeholder?: string;
  /** Alt text for the image */
  alt: string;
  /** Width of the image */
  width?: number | string;
  /** Height of the image */
  height?: number | string;
  /** Enable/disable lazy loading */
  lazy?: boolean;
  /** CSS class name */
  className?: string;
  /** Whether to allow browser WebP format */
  useWebP?: boolean;
  /** Aspect ratio to maintain (e.g., "16:9", "4:3", "1:1") */
  aspectRatio?: string;
  /** Image object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Optional loading strategy */
  loading?: 'lazy' | 'eager';
  /** Optional decoding strategy */
  decoding?: 'async' | 'sync' | 'auto';
  /** Fallback image to show on error */
  fallbackSrc?: string;
  /** Callback function when image loads */
  onLoad?: () => void;
  /** Callback function when image fails to load */
  onError?: () => void;
}

/**
 * ResponsiveImage Component
 *
 * Renders an optimized, responsive image with optional lazy loading
 * and placeholder support for improved performance and user experience.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  srcSet,
  sizes,
  placeholder,
  alt,
  width,
  height,
  lazy = true,
  className = '',
  useWebP = true,
  aspectRatio,
  objectFit = 'cover',
  loading = 'lazy',
  decoding = 'async',
  fallbackSrc,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [actualSrc, setActualSrc] = useState(placeholder || src);

  // Compute aspect ratio styles if provided
  const aspectRatioStyle = aspectRatio
    ? {
        position: 'relative' as const,
        paddingBottom: `${
          (parseFloat(aspectRatio.split(':')[1]) / parseFloat(aspectRatio.split(':')[0])) * 100
        }%`,
      }
    : {};

  // Load the image when component mounts
  useEffect(() => {
    if (!lazy || loading === 'eager') {
      setActualSrc(src);
      return;
    }

    let observer: IntersectionObserver;
    let imgElement: HTMLImageElement | null = null;

    if ('IntersectionObserver' in window) {
      // Create a new IntersectionObserver
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If the image is in the viewport, load it
            if (entry.isIntersecting) {
              setActualSrc(src);
              // Stop observing once loaded
              if (imgElement && observer) {
                observer.unobserve(imgElement);
              }
            }
          });
        },
        {
          rootMargin: '100px', // Start loading when image is 100px from viewport
          threshold: 0.01, // Trigger when 1% of the image is visible
        }
      );

      // Get a reference to the image element
      imgElement = document.getElementById(`img-${src.replace(/\W/g, '')}`) as HTMLImageElement;
      if (imgElement) {
        observer.observe(imgElement);
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setActualSrc(src);
    }

    return () => {
      // Clean up observer on component unmount
      if (observer && imgElement) {
        observer.unobserve(imgElement);
      }
    };
  }, [src, lazy, loading]);

  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image load error
  const handleError = () => {
    if (!error && fallbackSrc) {
      setError(true);
      setActualSrc(fallbackSrc);
    }
    onError?.();
  };

  // Build image element with all necessary attributes
  return (
    <div
      style={{
        ...aspectRatioStyle,
        overflow: 'hidden',
        width: width || '100%',
      }}
      className={className}
    >
      <img
        id={`img-${src.replace(/\W/g, '')}`}
        src={actualSrc}
        srcSet={isLoaded ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : undefined}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit,
          width: '100%',
          height: aspectRatio ? '100%' : height,
          position: aspectRatio ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded || !placeholder ? 1 : 0.5,
          filter: isLoaded || !placeholder ? 'none' : 'blur(10px)',
        }}
      />
    </div>
  );
};

export default ResponsiveImage;
