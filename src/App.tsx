import { useEffect, useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import FilterPanel from "@/components/FilterPanel";
import GameCard from "@/components/GameCard";
import Pagination from "@/components/Pagination";
import { getGames } from "@/services/gamesService";
import { getGenres } from "@/services/genresService";
import { getPlatforms } from "@/services/platformService";
import type { Game, Genre, Platform } from "@/types";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import StatusBar from "./components/StatusBar";
import SortingDropdown from "./components/SortingDropdown";
import ErrorMessage from "./components/ErrorMessage";
import Skeleton from "./components/Skeleton";
import Refresh from "./components/Refresh";
import Footer from "./components/Footer";

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
      <Header />

      <main className="mx-auto max-w-360 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <TopBar searchInput={searchInput} setSearchInput={setSearchInput} />

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
                  setOrdering={setOrdering}
                  setPage={setPage}
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
              <ErrorMessage error={error} setReloadKey={setReloadKey} />
            ) : loading ? (
              <Skeleton />
            ) : games.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {games.map((game) => (
                  <GameCard game={game} key={game.id} />
                ))}
              </div>
            ) : (
              <Refresh
                setSearchInput={setSearchInput}
                setSearch={setSearch}
                clearFilters={clearFilters}
              />
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
