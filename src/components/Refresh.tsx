import { RiGamepadLine } from "@remixicon/react";

type RefreshProps = {
  onClear: () => void;
};

function Refresh({ onClear }: RefreshProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/5 text-slate-400">
        <RiGamepadLine aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 font-semibold text-white">No games found</h3>
      <p className="mt-1 text-sm text-slate-400">
        Try another search or clear your filters.
      </p>
      <button
        className="mt-4 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
        onClick={onClear}
        type="button"
      >
        Clear search and filters
      </button>
    </div>
  );
}

export default Refresh;
