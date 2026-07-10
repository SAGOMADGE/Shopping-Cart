export type FetchFunction<T> = (signal: AbortSignal) => Promise<T>;
