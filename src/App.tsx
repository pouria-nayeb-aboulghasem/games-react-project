import { useEffect, useState } from "react";
import {
  RiArrowDownSLine,
  RiGamepadLine,
  RiRefreshLine,
} from "@remixicon/react";
import FilterPanel from "@/components/FilterPanel";
import GameCard from "@/components/GameCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { getGames } from "@/services/gamesService";
import { getGenres } from "@/services/genresService";
import { getPlatforms } from "@/services/platformService";
import type { Game, Genre, Platform } from "@/types";

const PAGE_SIZE = 12;

const sortOptions = [
  { label: "Popularity", value: "" },
  { label: "Rating: highest first", value: "-rating" },
  { label: "Release date: newest first", value: "-released" },
  { label: "Name: A to Z", value: "name" },
  { label: "Metacritic score", value: "-metacritic" },
];

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [ordering, setOrdering] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterError, setFilterError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // execute search input after 350ms delay
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);

    // clearing the timer
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    // step 1: cancel all previous incomplete requests
    const controller = new AbortController();

    // send multiple requests
    Promise.allSettled([
      getGenres(controller.signal),
      getPlatforms(controller.signal),
    ]).then((results) => {
      // step 2: cancel all previous incomplete requests
      if (controller.signal.aborted) return;

      const [genreResult, platformResult] = results;
      const errors: string[] = [];

      if (genreResult.status === "fulfilled") {
        // success: genres
        setGenres(genreResult.value.results);
      } else {
        // failure: genres
        errors.push("genres");
      }

      if (platformResult.status === "fulfilled") {
        // success: platforms
        setPlatforms(platformResult.value.results);
      } else {
        // failure: platforms
        errors.push("platforms");
      }

      // manage and display error when genre and platform collections couldn't be loading
      setFilterError(
        errors.length > 0
          ? `Could not load ${errors.join(" and ")}. You can still browse games.`
          : "",
      );
    });

    // step 3: cancel all previous incomplete requests
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    // step 1: cancel all previous incomplete requests
    const controller = new AbortController();

    void Promise.resolve().then(() => {
      // step 2: cancel all previous incomplete requests
      if (controller.signal.aborted) return;

      // display loading
      setLoading(true);
      setError("");

      // send request to get games
      return getGames(
        {
          page,
          pageSize: PAGE_SIZE,
          search,
          genres: selectedGenre,
          platforms: selectedPlatform,
          ordering,
        },
        controller.signal,
      )
        .then((response) => {
          // success
          setGames(response.results);
          setTotalCount(response.count);
        })
        .catch((requestError: unknown) => {
          // failure
          if (
            requestError instanceof DOMException &&
            requestError.name === "AbortError"
          ) {
            return;
          }

          setError(
            requestError instanceof Error
              ? requestError.message
              : "Something went wrong while loading games.",
          );

          setGames([]);
          setTotalCount(0);
        })
        .finally(() => {
          // turn off loading
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    });

    // step 3: cancel all previous incomplete requests
    return () => controller.abort();
  }, [page, search, selectedGenre, selectedPlatform, ordering, reloadKey]);

  // pagination total pages
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  // from 1 - 13 - 26 - ...
  const firstResult = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  // till 12 - 25 - 36 - ...
  const lastResult = Math.min(page * PAGE_SIZE, totalCount);

  function clearFilters() {
    setSelectedGenre("");
    setSelectedPlatform("");
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#0e1016] text-slate-100">
      <header className="border-b border-white/7 bg-[#11131a]">
        <div className="mx-auto flex h-18 max-w-360 items-center justify-between px-5 sm:px-8">
          <a
            className="flex items-center gap-2.5"
            href="/"
            aria-label="Gamegrid home"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-violet-500 text-white shadow-lg shadow-violet-950/40">
              <RiGamepadLine aria-hidden="true" className="size-5" />
            </span>
            <span className="text-lg font-black tracking-tight text-white">
              game<span className="text-violet-400">grid</span>
            </span>
          </a>
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            YOUR NEXT ADVENTURE STARTS HERE
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-360 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
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

        <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <FilterPanel
            genres={genres}
            onClear={clearFilters}
            onGenreChange={(value) => {
              setSelectedGenre(value);
              setPage(1);
            }}
            onPlatformChange={(value) => {
              setSelectedPlatform(value);
              setPage(1);
            }}
            platforms={platforms}
            selectedGenre={selectedGenre}
            selectedPlatform={selectedPlatform}
          />

          {/* game  */}
          <section aria-label="Games">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-white">All games</h2>

                {/* new component */}
                <p aria-live="polite" className="mt-1 text-xs text-slate-500">
                  {loading
                    ? "Finding games..."
                    : totalCount > 0
                      ? `Showing ${firstResult}–${lastResult} of ${totalCount.toLocaleString()} games`
                      : "No games to show"}
                </p>
                {/* /new component */}
              </div>

              <label className="relative flex h-10 min-w-52 items-center rounded-lg border border-white/10 bg-[#151820] pl-3 pr-9 text-xs text-slate-400 focus-within:border-violet-400/60">
                <span className="mr-2 shrink-0">Sort by</span>
                {/* new component */}
                <select
                  aria-label="Sort games"
                  className="h-full min-w-0 flex-1 appearance-none bg-transparent text-xs font-semibold text-slate-200 outline-none"
                  onChange={(event) => {
                    setOrdering(event.target.value);
                    setPage(1);
                  }}
                  value={ordering}
                >
                  {sortOptions.map((option) => (
                    <option
                      className="bg-[#151820]"
                      key={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                {/* /new component */}
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
              <div className="rounded-2xl border border-red-400/20 bg-red-400/6 px-6 py-12 text-center">
                <p className="font-semibold text-white">
                  We couldn’t load the games
                </p>
                <p className="mt-2 text-sm text-slate-400">{error}</p>
                <button
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
                  onClick={() => setReloadKey((key) => key + 1)}
                  type="button"
                >
                  <RiRefreshLine aria-hidden="true" className="size-4" />
                  Try again
                </button>
              </div>
            ) : loading ? (
              // skeleton loading
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
            ) : // skeleton loading
            games.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {games.map((game) => (
                  <GameCard game={game} key={game.id} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/5 text-slate-400">
                  <RiGamepadLine aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-4 font-semibold text-white">
                  No games found
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Try another search or clear your filters.
                </p>
                <button
                  className="mt-4 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    clearFilters();
                  }}
                  type="button"
                >
                  Clear search and filters
                </button>
              </div>
            )}

            {!error && !loading && games.length > 0 && (
              <Pagination
                onPageChange={setPage}
                page={page}
                totalPages={totalPages}
              />
            )}
          </section>
          {/* /game  */}
        </div>
      </main>

      <footer className="border-t border-white/6 py-6 text-center text-xs text-slate-600">
        Discover something great to play.
      </footer>
    </div>
  );
}

export default App;
