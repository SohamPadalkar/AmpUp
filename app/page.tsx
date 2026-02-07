"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";


const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function Home() {
  const progress = useMotionValue(0);
  const [isLocked, setIsLocked] = useState(true);
  const isLockedRef = useRef(true);
  const lastTouchYRef = useRef<number | null>(null);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    

    const handleWheel = (event: WheelEvent) => {
      if (!isLockedRef.current) {
        return;
      }

      const delta = event.deltaY;
      const current = progress.get();

      event.preventDefault();
      const next = clamp(current + delta / 1200, 0, 1);
      progress.set(next);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isLockedRef.current) {
        return;
      }

      if (event.touches.length > 0) {
        lastTouchYRef.current = event.touches[0].clientY;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isLockedRef.current) {
        return;
      }

      if (event.touches.length === 0) {
        return;
      }

      const currentY = event.touches[0].clientY;
      const lastY = lastTouchYRef.current ?? currentY;
      const delta = lastY - currentY;
      lastTouchYRef.current = currentY;

      event.preventDefault();
      const next = clamp(progress.get() + delta / 1200, 0, 1);
      progress.set(next);
    };

    const handleTouchEnd = () => {
      lastTouchYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [isLocked, progress]);


  // HERO
  const heroOpacity = useTransform(progress, [0, 0.18, 0.24], [1, 1, 0]);
  const heroY = useTransform(progress, [0, 0.18, 0.24], [0, -6, -12]);
  const heroScale = useTransform(progress, [0, 0.18, 0.24], [1, 0.99, 0.98]);

  // LINE 1
  const l1Opacity = useTransform(progress, [0.24, 0.34, 0.42], [0, 1, 0]);
  const l1Y = useTransform(progress, [0.24, 0.34, 0.42], [10, 0, -8]);
  const l1Scale = useTransform(progress, [0.24, 0.34, 0.42], [0.98, 1, 0.985]);

  // LINE 2
  const l2Opacity = useTransform(progress, [0.42, 0.52, 0.6], [0, 1, 0]);
  const l2Y = useTransform(progress, [0.42, 0.52, 0.6], [10, 0, -8]);
  const l2Scale = useTransform(progress, [0.42, 0.52, 0.6], [0.98, 1, 0.985]);

  // LINE 3
  const l3Opacity = useTransform(progress, [0.6, 0.7, 0.78], [0, 1, 0]);
  const l3Y = useTransform(progress, [0.6, 0.7, 0.78], [10, 0, -8]);
  const l3Scale = useTransform(progress, [0.6, 0.7, 0.78], [0.98, 1, 0.985]);

  // LINE 4
  const l4Opacity = useTransform(progress, [0.78, 0.86, 0.92], [0, 1, 0]);
  const l4Y = useTransform(progress, [0.78, 0.86, 0.92], [10, 0, -8]);
  const l4Scale = useTransform(progress, [0.78, 0.86, 0.92], [0.98, 1, 0.985]);

  // REVEAL
  const revealOpacity = useTransform(progress, [0.9, 1], [0, 1]);
  const revealY = useTransform(progress, [0.9, 1], [8, 0]);
  const revealScale = useTransform(progress, [0.9, 1], [0.985, 1]);

  return (
    <main className="relative px-6 text-white antialiased">

      {/* HERO SEQUENCE */}
      <section className="relative h-screen">
        <div className="h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">

            {/* HERO */}
            <motion.div
              className="absolute text-center max-w-3xl pointer-events-none"
              style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            >
              <h1 className="text-[45px] md:text-[64px] leading-tight tracking-tight">
                Some{" "}
                <span className="text-[#E66B7A]">matches</span>{" "}
                don’t need an introduction.
              </h1>
              <div className="mt-8 h-px w-24 bg-[#E66B7A]/40 mx-auto" />
            </motion.div>

            {/* LINE 1 */}
            <motion.p
              className="absolute text-[38px] md:text-3xl text-center max-w-xl pointer-events-none"
              style={{ opacity: l1Opacity, y: l1Y, scale: l1Scale }}
            >
              You don’t swipe endlessly.
            </motion.p>

            {/* LINE 2 */}
            <motion.p
              className="absolute text-[38px] md:text-3xl text-center max-w-xl pointer-events-none"
              style={{ opacity: l2Opacity, y: l2Y, scale: l2Scale }}
            >
              You don’t explain why you like what you like.
            </motion.p>

            {/* LINE 3 */}
            <motion.p
              className="absolute text-[38px] md:text-3xl text-center max-w-xl pointer-events-none"
              style={{ opacity: l3Opacity, y: l3Y, scale: l3Scale }}
            >
              You just feel it.
            </motion.p>

            {/* LINE 4 */}
            <motion.p
              className="absolute text-[38px] md:text-3xl text-center max-w-xl pointer-events-none"
              style={{ opacity: l4Opacity, y: l4Y, scale: l4Scale }}
            >
              We build around that feeling.
            </motion.p>

            {/* REVEAL */}
            <motion.div
              className="absolute flex flex-col items-center justify-center gap-6 text-center pointer-events-none"
              style={{ opacity: revealOpacity, y: revealY, scale: revealScale }}
            >
              <h2 className="text-[42px] tracking-wide">Amp<span className="text-[#E66B7A]">U</span>p</h2>
              <p className="text-[38px] text-center opacity-75 max-w-md">
                A new way people connect
                <br />
                through feeling and music.
              </p>

              <div className="mt-10 flex flex-col items-center gap-6">
                <p className="text-lg md:text-xl text-center opacity-70">Coming soon.</p>
              </div>

              <footer className="mt-12 flex flex-col items-center gap-2 text-xs md:text-sm opacity-45">
                <p>Designed for people who feel first.</p>
                <p>© Ampup</p>
              </footer>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
