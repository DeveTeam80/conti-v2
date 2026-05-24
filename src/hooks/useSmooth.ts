import { MotionValue, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef } from "react";

export function useSmooth(value: MotionValue<number>, factor: number = 0.1) {
    // Initialize with the current value of the source
    const smoothed = useMotionValue(value.get());
    const lastValue = useRef(value.get());

    useEffect(() => {
        const unsubscribe = value.on("change", (latest) => {
            lastValue.current = latest;
        });
        return unsubscribe;
    }, [value]);

    useAnimationFrame((time, delta) => {
        const target = lastValue.current;
        const current = smoothed.get();
        const diff = target - current;

        // Optimization: Stop updating if close enough to save CPU
        if (Math.abs(diff) > 0.0001) {
            // Adjust factor based on delta time (reference 60fps ~ 16.67ms)
            // This ensures smooth animation regardless of refresh rate (e.g. 120Hz vs 60Hz)
            const adjustedFactor = factor * (delta / 16.667);
            const alpha = Math.min(adjustedFactor, 1);

            const next = current + diff * alpha;
            smoothed.set(next);
        }
    });

    return smoothed;
}
