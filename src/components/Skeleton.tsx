function Skeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          aria-hidden="true"
          className="animate-pulse overflow-hidden rounded-2xl border border-white/6 bg-[#151820]"
          key={index}
        >
          <div className="aspect-16/10 bg-white/5" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/5 rounded bg-white/6" />
            <div className="h-3 w-2/5 rounded bg-white/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
