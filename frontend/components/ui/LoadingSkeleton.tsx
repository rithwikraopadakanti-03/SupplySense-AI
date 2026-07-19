export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/5 rounded-xl overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
