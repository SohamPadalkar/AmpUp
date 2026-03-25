"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";


const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const isInteractiveTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("a, button, input, textarea, select, [role='button']"));
};

export default function Home() {
  const progress = useMotionValue(0);
  const [isLocked, setIsLocked] = useState(true);
  const [showFloatingCta, setShowFloatingCta] = useState(true);
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

      if (isInteractiveTarget(event.target)) {
        lastTouchYRef.current = null;
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

      if (isInteractiveTarget(event.target)) {
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
  const heroCueOpacity = useTransform(progress, [0, 0.02], [1, 0]);

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
  const surveyUrl = "https://forms.gle/vARQNtwr8KgW4G5j8";

  useMotionValueEvent(progress, "change", (latest) => {
    setShowFloatingCta(latest < 0.9);
  });

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
              <h1 className="pointer-events-none text-[45px] md:text-[64px] leading-tight tracking-tight">
                Some{" "}
                <span className="text-[#E66B7A]">matches</span>{" "}
                don’t need an introduction.
              </h1>
              <div className="pointer-events-none mt-8 h-px w-24 bg-[#E66B7A]/40 mx-auto" />
              <motion.div
                className="pointer-events-none mt-4 flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-white/50"
                style={{ opacity: heroCueOpacity }}
              >
                <span className="text-xs leading-none">↓</span>
                <span className="text-[9px] leading-none">scroll</span>
              </motion.div>
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

              <div className="mt-10 flex flex-col items-center gap-4 pointer-events-auto">
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                >
                  <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-white/45">
                    Help us shape this
                  </p>
                  <motion.a
                    href={surveyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 16px 34px rgba(230, 107, 122, 0.3)",
                      backgroundColor: "rgb(238, 122, 136)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="inline-flex min-h-12 min-w-[220px] whitespace-nowrap items-center justify-center rounded-full border border-[#F08A97]/75 bg-[#E66B7A] px-8 py-3 text-sm font-medium leading-none tracking-[0.01em] text-[#4B0F18] no-underline visited:text-[#4B0F18] focus:text-[#4B0F18] active:text-[#4B0F18] shadow-[0_10px_24px_rgba(230,107,122,0.26)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E66B7A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:bg-[#DA6171] md:min-w-[240px] md:text-base"
                  >
                    Take 1-min Survey
                  </motion.a>
                  <p className="text-[11px] md:text-xs tracking-[0.04em] text-white/50">
                    Takes less than 60 seconds
                  </p>
                </motion.div>
              </div>

              <footer className="mt-12 flex flex-col items-center gap-2 text-xs md:text-sm opacity-45">
                <p>Designed for people who feel first.</p>
                <p>© AmpUp</p>
              </footer>
            </motion.div>

          </div>
        </div>
      </section>

      {showFloatingCta && (
        <motion.a
          href={surveyUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            WebkitTapHighlightColor: "transparent",
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 14px 30px rgba(230, 107, 122, 0.28)",
            backgroundColor: "rgb(238, 122, 136)",
          }}
          whileTap={{ scale: 0.98 }}
          className="fixed left-1/2 z-50 inline-flex min-h-12 min-w-[220px] -translate-x-1/2 whitespace-nowrap items-center justify-center rounded-full border border-[#F08A97]/70 bg-[#E66B7A] px-8 py-3 text-sm font-medium leading-none text-[#4B0F18] no-underline visited:text-[#4B0F18] focus:text-[#4B0F18] active:text-[#4B0F18] shadow-[0_8px_22px_rgba(230,107,122,0.24)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E66B7A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:bg-[#DA6171] md:min-w-[240px] md:text-[15px]"
        >
          Take 1-min Survey
        </motion.a>
      )}

    </main>
  );
}
