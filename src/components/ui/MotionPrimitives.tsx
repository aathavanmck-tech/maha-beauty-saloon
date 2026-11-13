import React, { useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { BRAND_INFO } from '../../data/salonData';

/**
 * Renders the exact uploaded original logo without cropping, distorting,
 * recreating, or altering its typography, emblem, or 1:1 proportions.
 */
interface OriginalBrandLogoProps {
  sizeClass?: string;
  className?: string;
  priority?: boolean;
}

export const OriginalBrandLogo: React.FC<OriginalBrandLogoProps> = ({
  sizeClass = 'w-14 h-14',
  className = '',
  priority = false,
}) => {
  return (
    <div
      className={`relative shrink-0 aspect-square overflow-hidden bg-[#4F101E] border border-[#D4AF7A]/45 shadow-sm ${sizeClass} ${className}`}
    >
      <img
        src={BRAND_INFO.originalLogoPath}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== BRAND_INFO.originalLogoFallback) {
            target.src = BRAND_INFO.originalLogoFallback;
          }
        }}
        alt="Maha Beauty Saloon and Training Institute Original Logo"
        width={1254}
        height={1254}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-full object-contain select-none block"
      />
    </div>
  );
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 24,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Subtle 3D perspective card tilt for luxury depth on pointer devices.
 * Automatically respects prefers-reduced-motion and avoids jitter on touch screens.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 4,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, active: false });

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 24 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateXRaw.set((0.5 - py) * maxTilt * 2);
    rotateYRaw.set((px - 0.5) * maxTilt * 2);
    setGlare({ x: px * 100, y: py * 100, active: true });
  };

  const handlePointerLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    setGlare((prev) => ({ ...prev, active: false }));
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: glare.active ? 0.14 : 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(212, 175, 122, 0.55), transparent 62%)`,
        }}
      />
    </motion.div>
  );
};

interface ParallaxFrameProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  offset?: number;
  eager?: boolean;
}

export const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  imgClassName = '',
  offset = 24,
  eager = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== fallbackSrc) {
            target.src = fallbackSrc;
          }
        }}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={prefersReducedMotion ? undefined : { y, scale: 1.07 }}
        className={`w-full h-full object-cover transition-transform duration-700 ${imgClassName}`}
      />
    </div>
  );
};

export const ChampagneDivider: React.FC<{
  light?: boolean;
  className?: string;
}> = ({ light = false, className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span
        className={`h-px w-12 sm:w-20 ${
          light ? 'bg-[#D4AF7A]/45' : 'bg-[#5A0B1C]/25'
        }`}
      />
      <span
        className={`w-2 h-2 rotate-45 border ${
          light
            ? 'border-[#D4AF7A] bg-[#D4AF7A]/25'
            : 'border-[#5A0B1C]/60 bg-[#D4AF7A]/35'
        }`}
      />
      <span
        className={`h-px w-12 sm:w-20 ${
          light ? 'bg-[#D4AF7A]/45' : 'bg-[#5A0B1C]/25'
        }`}
      />
    </div>
  );
};
