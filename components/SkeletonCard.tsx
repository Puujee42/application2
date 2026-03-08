export default function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="aspect-square bg-dark-light animate-skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-dark-light rounded animate-skeleton" />
        <div className="h-4 bg-dark-light rounded w-2/3 animate-skeleton" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-dark-light rounded w-1/2 animate-skeleton" />
          <div className="h-8 w-8 bg-dark-light rounded-lg animate-skeleton" />
        </div>
      </div>
    </div>
  );
}
