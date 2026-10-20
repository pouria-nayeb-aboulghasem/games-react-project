import { RiArrowDownSLine } from "@remixicon/react";
import FilterPanel from "@/components/FilterPanel";
import GameCard from "@/components/GameCard";
import useGames from "@/hooks/useGames";
import useGenres from "@/hooks/useGenres";
import usePlatforms from "@/hooks/usePlatforms";
import Pagination from "@/components/Pagination";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import StatusBar from "./components/StatusBar";
import SortingDropdown from "./components/SortingDropdown";
import ErrorMessage from "./components/ErrorMessage";
import Skeleton from "./components/Skeleton";
import Refresh from "./components/Refresh";
import Footer from "./components/Footer";

const sortOptions = [
  { label: "Popularity", value: "" },
  { label: "Rating: highest first", value: "-rating" },
  { label: "Release date: newest first", value: "-released" },
  { label: "Name: A to Z", value: "name" },
  { label: "Metacritic score", value: "-metacritic" },
];

function App() {
  const {
    games,
    searchInput,
    setSearchInput,
    selectedGenre,
    selectedPlatform,
    ordering,
    page,
    setPage,
    totalCount,
    totalPages,
    firstResult,
    lastResult,
    loading,
    error,
    reloadKey,
    handleGenreChange,
    handlePlatformChange,
    handleOrderingChange,
    clearFilters,
    clearSearchAndFilters,
    retry,
  } = useGames();
  const { genres, hasError: genresError } = useGenres(reloadKey);
  const { platforms, hasError: platformsError } = usePlatforms(reloadKey);

  const failedCollections = [
    genresError && "genres",
    platformsError && "platforms",
  ].filter(Boolean);
  const filterError =
    failedCollections.length > 0
      ? `Could not load ${failedCollections.join(" and ")}. You can still browse games.`
      : "";

  return (
    <div className="min-h-screen bg-[#0e1016] text-slate-100">
      <Header />

      <main className="mx-auto max-w-360 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <TopBar searchInput={searchInput} setSearchInput={setSearchInput} />

        <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <FilterPanel
            genres={genres}
            onClear={clearFilters}
            onGenreChange={handleGenreChange}
            onPlatformChange={handlePlatformChange}
            platforms={platforms}
            selectedGenre={selectedGenre}
            selectedPlatform={selectedPlatform}
          />

          <section aria-label="Games">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-white">All games</h2>

                <StatusBar
                  loading={loading}
                  totalCount={totalCount}
                  firstResult={firstResult}
                  lastResult={lastResult}
                />
              </div>

              <label className="relative flex h-10 min-w-52 items-center rounded-lg border border-white/10 bg-[#151820] pl-3 pr-9 text-xs text-slate-400 focus-within:border-violet-400/60">
                <span className="mr-2 shrink-0">Sort by</span>
                <SortingDropdown
                  ordering={ordering}
                  onOrderingChange={handleOrderingChange}
                  sortOptions={sortOptions}
                />
                <RiArrowDownSLine
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 size-4"
                />
              </label>
            </div>

            {filterError && (
              <p className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/6 px-4 py-3 text-sm text-amber-200">
                {filterError}
              </p>
            )}

            {error ? (
              <ErrorMessage error={error} onRetry={retry} />
            ) : loading ? (
              <Skeleton />
            ) : games.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {games.map((game) => (
                  <GameCard game={game} key={game.id} />
                ))}
              </div>
            ) : (
              <Refresh onClear={clearSearchAndFilters} />
            )}

            {!error && !loading && games.length > 0 && (
              <Pagination
                onPageChange={setPage}
                page={page}
                totalPages={totalPages}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
