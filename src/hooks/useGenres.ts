import { useEffect, useState } from "react";
import { getGenres } from "@/services/genresService";
import type { Genre } from "@/types";

function useGenres(reloadKey = 0) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    void getGenres(controller.signal)
      .then((response) => {
        if (!controller.signal.aborted) {
          setGenres(response.results);
          setHasError(false);
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

        setGenres([]);
        setHasError(true);
      });

    return () => controller.abort();
  }, [reloadKey]);

  return { genres, hasError };
}

export default useGenres;
