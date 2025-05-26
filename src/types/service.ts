import type { IPagination } from "./pagination";
import type { IResponse } from "./response";

export interface IService<T> {
  (pagination: IPagination, ...args: any): Promise<IResponse<T>>;
}
