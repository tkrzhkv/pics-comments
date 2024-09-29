import { elementScroll, VirtualizerOptions } from "@tanstack/react-virtual";
import { MutableRefObject, useCallback } from "react";

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

export const useScrollToFn = (
  parentRef: MutableRefObject<HTMLDivElement | null>,
  scrollingRef: MutableRefObject<number>,
): VirtualizerOptions<HTMLDivElement, Element>["scrollToFn"] =>
  useCallback(
    (offset, canSmooth, instance) => {
      const duration = 300;
      const start = parentRef.current?.scrollTop || 0;
      const startTime = (scrollingRef.current = Date.now());

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
        const interpolated = start + (offset - start) * progress;

        if (elapsed < duration) {
          elementScroll(interpolated, canSmooth, instance);
          requestAnimationFrame(run);
        } else {
          elementScroll(interpolated, canSmooth, instance);
        }
      };

      requestAnimationFrame(run);
    },
    [parentRef, scrollingRef],
  );
