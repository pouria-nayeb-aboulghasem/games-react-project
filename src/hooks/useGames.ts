import { useEffect, useState } from "react";
import { getGames } from "@/services/gamesService";
import type { Game } from "@/types";

const PAGE_SIZE = 12;

function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [ordering, setOrdering] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();

    void Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) {
          return;
        }

        setLoading(true);
        setError("");

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
        );
      })
      .then((response) => {
        if (response && !controller.signal.aborted) {
          setGames(response.results);
          setTotalCount(response.count);
        }
      })
      .catch((requestError: unknown) => {
        if (
          controller.signal.aborted ||
          (requestError instanceof DOMException &&
            requestError.name === "AbortError")
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
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [page, search, selectedGenre, selectedPlatform, ordering, reloadKey]);

  function handleGenreChange(value: string) {
    setSelectedGenre(value);
    setPage(1);
  }

  function handlePlatformChange(value: string) {
    setSelectedPlatform(value);
    setPage(1);
  }

  function handleOrderingChange(value: string) {
    setOrdering(value);
    setPage(1);
  }

  function clearFilters() {
    setSelectedGenre("");
    setSelectedPlatform("");
    setPage(1);
  }

  function clearSearchAndFilters() {
    setSearchInput("");
    setSearch("");
    clearFilters();
  }

  function retry() {
    setReloadKey((key) => key + 1);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const firstResult = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastResult = Math.min(page * PAGE_SIZE, totalCount);

  return {
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
  };
}

export default useGames;
