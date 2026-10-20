import type { Genre, Platform } from "@/types";
import GenresDropdown from "./GenresDropdown";
import PlatformsDropdown from "./PlatformsDropdown";
import ResetFilters from "./ResetFilters";

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
      <ResetFilters hasFilters={hasFilters} onClear={onClear} />

      <div className="space-y-6">
        <GenresDropdown
          onGenreChange={onGenreChange}
          selectedGenre={selectedGenre}
          genres={genres}
        />

        <PlatformsDropdown
          onPlatformChange={onPlatformChange}
          selectedPlatform={selectedPlatform}
          platforms={platforms}
        />
      </div>
    </aside>
  );
}

export default FilterPanel;
