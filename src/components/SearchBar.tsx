import { RiCloseLine, RiSearchLine } from "@remixicon/react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex h-12 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/6 px-4 text-slate-400 transition focus-within:border-violet-400/60 focus-within:bg-white/9 focus-within:ring-4 focus-within:ring-violet-500/10">
      <RiSearchLine aria-hidden="true" className="size-5 shrink-0" />
      <input
        aria-label="Search games"
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search games..."
        type="search"
        value={value}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
          onClick={() => onChange("")}
          type="button"
        >
          <RiCloseLine aria-hidden="true" className="size-4" />
        </button>
      )}
    </label>
  );
}

export default SearchBar;
