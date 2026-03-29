import { useState, useRef, useCallback } from "react";

/**
 * Custom hook that fetches AI autocomplete suggestions from the backend.
 * @param {string} type - "title" | "content"
 */
export function useAutocomplete(type) {
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchSuggestion = useCallback(
    async (context) => {
      if (!context || context.trim().length < 5) return;

      // Cancel any in-flight request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ context: context.trim(), type }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to get suggestion");
        }

        const data = await res.json();
        setSuggestion(data.suggestion || "");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setSuggestion("");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [type]
  );

  const clearSuggestion = useCallback(() => {
    setSuggestion("");
    setError(null);
  }, []);

  return { suggestion, isLoading, error, fetchSuggestion, clearSuggestion };
}
