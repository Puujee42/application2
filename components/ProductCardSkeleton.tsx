'use client';

export default function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col animate-pulse">
            <div className="relative aspect-square bg-gray-100 overflow-hidden" />
            <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3">
                <div className="h-5 bg-gray-100 rounded-lg w-full" />
                <div className="h-5 bg-gray-100 rounded-lg w-2/3" />
                <div className="mt-auto pt-4 space-x-2 flex items-center">
                    <div className="h-8 bg-gray-100 rounded-lg w-24" />
                    <div className="h-4 bg-gray-100 rounded-lg w-16" />
                </div>
                <div className="h-10 bg-gray-100 rounded-xl w-full mt-4" />
            </div>
        </div>
    );
}
