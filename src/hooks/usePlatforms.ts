import { useEffect, useState } from "react";
import { getPlatforms } from "@/services/platformService";
import type { Platform } from "@/types";

function usePlatforms(reloadKey = 0) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    void getPlatforms(controller.signal)
      .then((response) => {
        if (!controller.signal.aborted) {
          setPlatforms(response.results);
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

        setPlatforms([]);
        setHasError(true);
      });

    return () => controller.abort();
  }, [reloadKey]);

  return { platforms, hasError };
}

export default usePlatforms;
