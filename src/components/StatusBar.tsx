type StatusBarProps = {
  loading: boolean;
  totalCount: number;
  firstResult: number;
  lastResult: number;
};

function StatusBar({loading, totalCount, firstResult, lastResult}: StatusBarProps) {
  return (
    <p aria-live="polite" className="mt-1 text-xs text-slate-500">
      {loading
        ? "Finding games..."
        : totalCount > 0
          ? `Showing ${firstResult}–${lastResult} of ${totalCount.toLocaleString()} games`
          : "No games to show"}
    </p>
  );
}

export default StatusBar;
