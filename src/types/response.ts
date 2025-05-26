import type { IPagination } from "./pagination";

export interface IServerResponse<T extends Record<string, any>> {
  MRData: IPagination & T;
}

export interface IResponse<T> {
  data: T;
  pagination: IPagination;
}
