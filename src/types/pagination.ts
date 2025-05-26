export interface IPagination {
  offset: number;
  limit: number;
  total?: number; // Optional, can be used to store total count of items
}

export const PER_PAGE = 12; // Number of items per page
