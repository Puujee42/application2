'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfiniteScrollTriggerProps {
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

export default function InfiniteScrollTrigger({ onLoadMore, hasMore, isLoading }: InfiniteScrollTriggerProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isFetchingRef = useRef(false);

    // Sync isLoading prop to ref to prevent multiple fetches before React state updates
    useEffect(() => {
        isFetchingRef.current = isLoading;
    }, [isLoading]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && hasMore && !isFetchingRef.current) {
                onLoadMore();
            }
        },
        [hasMore, onLoadMore]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(handleObserver, option);

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [handleObserver]);

    return (
        <div className="w-full pb-8 pt-4 flex flex-col items-center justify-center">
            {/* Skeleton Loaders matching the grid layout (responsive 2-col to 4-col) */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 px-2 sm:px-4"
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="aspect-square bg-slate-200/50 animate-pulse rounded-2xl w-full" />
                                <div className="h-4 bg-slate-200/50 animate-pulse rounded max-w-[80%]" />
                                <div className="h-3 bg-slate-200/50 animate-pulse rounded max-w-[50%]" />
                                <div className="h-5 bg-slate-200/50 animate-pulse rounded max-w-[40%] mt-2" />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={triggerRef} className="h-4 w-full" />

            {/* End of List Message */}
            <AnimatePresence>
                {!hasMore && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-6 pb-24 mt-4"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/50 text-slate-500 rounded-full text-xs font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Бүх барааг үзлээ
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
