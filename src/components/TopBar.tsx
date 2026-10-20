import SearchBar from "./SearchBar";

type TopBarProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

function TopBar({searchInput, setSearchInput}: TopBarProps) {
  return (
    <section className="mb-9">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-violet-300">
        The game library
      </p>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Discover games
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Find your next favorite. Explore games across every genre and
            platform.
          </p>
        </div>
        <div className="w-full lg:max-w-md">
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>
      </div>
    </section>
  );
}

export default TopBar;
