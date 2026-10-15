import { RiCloseLine, RiGamepadLine, RiWindowsLine } from "@remixicon/react";
import type { Genre, Platform } from "@/types";

type FilterPanelProps = {
  genres: Genre[];
  platforms: Platform[];
  selectedGenre: string;
  selectedPlatform: string;
  onGenreChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onClear: () => void;
};

function FilterPanel({
  genres,
  platforms,
  selectedGenre,
  selectedPlatform,
  onGenreChange,
  onPlatformChange,
  onClear,
}: FilterPanelProps) {
  const hasFilters = Boolean(selectedGenre || selectedPlatform);

  return (
    <aside className="rounded-2xl border border-white/8 bg-[#151820] p-5">
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

      <div className="space-y-6">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            <RiGamepadLine
              aria-hidden="true"
              className="size-4 text-violet-300"
            />
            Genre
          </span>
          <select
            className="h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#1d2029] px-3 text-sm text-slate-200 outline-none transition focus:border-violet-400/70"
            onChange={(event) => onGenreChange(event.target.value)}
            value={selectedGenre}
          >
            <option value="">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.slug}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            <RiWindowsLine
              aria-hidden="true"
              className="size-4 text-violet-300"
            />
            Platform
          </span>
          <select
            className="h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#1d2029] px-3 text-sm text-slate-200 outline-none transition focus:border-violet-400/70"
            onChange={(event) => onPlatformChange(event.target.value)}
            value={selectedPlatform}
          >
            <option value="">All platforms</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
}

export default FilterPanel;
