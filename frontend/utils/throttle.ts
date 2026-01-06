/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";
/**
 * useThrottleAsync
 * Throttles an async function to prevent rapid repeated calls.
 * 
 * @param asyncFn - async function to throttle
 * @param delay - milliseconds to wait before allowing next call
 */
export function useThrottleAsync<T extends (...args: any[]) => Promise<any>>(asyncFn: T, delay = 3000) {
    const lastCall = useRef<number>(0);
    const isPending = useRef(false);

    return useCallback(async (...args: Parameters<T>) => {
        const now = Date.now();
        if (isPending.current || now - lastCall.current < delay) return;

        lastCall.current = now;
        isPending.current = true;
        try {
            await asyncFn(...args);
        } finally {
            isPending.current = false;
        }
    }, [asyncFn, delay]);
}
