import type { Genre } from "@/types";
import { RiGamepadLine } from "@remixicon/react";

type GenresDropdownProps = {
  onGenreChange: (value: string) => void;
  selectedGenre: string;
  genres: Genre[];
};

function GenresDropdown({
  onGenreChange,
  selectedGenre,
  genres,
}: GenresDropdownProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        <RiGamepadLine aria-hidden="true" className="size-4 text-violet-300" />
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
  );
}

export default GenresDropdown;
