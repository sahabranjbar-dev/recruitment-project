export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (inputUrl?: string, inputBody?: any) => Promise<T | undefined>;
}

export type Methods = "GET" | "PUT" | "POST" | "DELETE";

export interface UseFetchInput<T> {
  url?: string;
  method?: Methods;
  body?: any;
  onSuccess?: (data: T) => void;
  onFailure?: (error: any) => void;
  immediatelyFetch?: boolean;
}

export interface IState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
