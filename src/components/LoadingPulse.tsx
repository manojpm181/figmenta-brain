export default function LoadingPulse() {
  return (
    <div className="flex gap-2">
      <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-150" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-300" />
    </div>
  );
}
