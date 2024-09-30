import {
	type VirtualizerOptions,
	elementScroll,
} from "@tanstack/react-virtual";
import { type MutableRefObject, useCallback } from "react";

function easeInOutQuint(t: number) {
	let newT = t;
	return newT < 0.5
		? 16 * newT * newT * newT * newT * newT
		: 1 + 16 * --newT * newT * newT * newT * newT;
}

export const useScrollToFn = (
	parentRef: MutableRefObject<HTMLDivElement | null>,
	scrollingRef: MutableRefObject<number>,
): VirtualizerOptions<HTMLDivElement, Element>["scrollToFn"] =>
	useCallback(
		(offset, canSmooth, instance) => {
			const duration = 300;
			const start = parentRef.current?.scrollTop || 0;
			const startTime = Date.now();
			scrollingRef.current = startTime;

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
