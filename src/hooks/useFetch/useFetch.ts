import { useState, useEffect, useCallback } from "react";
import { IState, UseFetchInput, UseFetchResult } from "./meta/types";

export function useFetch<T>({
  url,
  method = "GET",
  body,
  onSuccess,
  onFailure,
  immediatelyFetch = true,
}: UseFetchInput<T>): UseFetchResult<T> {
  const [state, setState] = useState<IState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(
    async (inputUrl?: string, inputBody?: any): Promise<T | undefined> => {
      const fetchUrl = inputUrl || url;
      if (!fetchUrl) {
        const errorMsg = "No URL provided for fetch";
        setState((prev) => ({ ...prev, error: errorMsg }));
        onFailure?.(errorMsg);
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(fetchUrl, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body:
            method !== "GET"
              ? JSON.stringify({ ...body, ...inputBody })
              : undefined,
        });

        if (!response.ok) {
          throw new Error(
            `Fetch error: ${response.status} ${response.statusText}`
          );
        }

        const result: T = await response.json();
        setState({ data: result, loading: false, error: null });
        onSuccess?.(result);
        return result;
      } catch (error: any) {
        const errorMessage = error?.message || "Unknown error";
        setState({ data: null, loading: false, error: errorMessage });
        onFailure?.(error);
        return;
      }
    },
    [url, method, body, onFailure, onSuccess]
  );

  useEffect(() => {
    if (immediatelyFetch) {
      fetchData();
    }
  }, [fetchData, immediatelyFetch]);

  return { ...state, fetchData };
}
