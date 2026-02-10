"use client";

export const SkeletonCard = () => {
    return (
        <div className="rounded-xl overflow-hidden glass border border-primary/10 animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-video bg-primary/10"></div>

            {/* Content skeleton */}
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="h-6 bg-primary/10 rounded w-3/4"></div>
                    <div className="h-5 bg-primary/10 rounded w-16"></div>
                </div>

                {/* Tech badges skeleton */}
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-primary/10 rounded-full w-16"></div>
                    <div className="h-6 bg-primary/10 rounded-full w-20"></div>
                    <div className="h-6 bg-primary/10 rounded-full w-24"></div>
                </div>

                {/* Buttons skeleton */}
                <div className="flex gap-4 pt-2">
                    <div className="flex-1 h-10 bg-primary/10 rounded-lg"></div>
                    <div className="flex-1 h-10 bg-primary/10 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export const SkillsSkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-primary/10 rounded w-48"></div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="glass rounded-lg p-3 h-16 bg-primary/10"></div>
                ))}
            </div>
        </div>
    );
};
