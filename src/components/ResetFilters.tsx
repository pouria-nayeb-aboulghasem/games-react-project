import { RiCloseLine } from "@remixicon/react";

type ResetFiltersProps = {
  hasFilters: boolean;
  onClear: () => void;
};

function ResetFilters({hasFilters, onClear}: ResetFiltersProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-white">Filters</h2>
      {hasFilters && (
        <button
          className="inline-flex items-center gap-1 text-xs font-medium text-violet-300 transition hover:text-violet-200"
          onClick={onClear}
          type="button"
        >
          <RiCloseLine aria-hidden="true" className="size-4" />
          Clear all
        </button>
      )}
    </div>
  );
}

export default ResetFilters;
