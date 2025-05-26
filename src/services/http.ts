import axios, { type AxiosResponse } from "axios";
import type { IPagination } from "../types/pagination";
import type { ISeasonDetails, SeasonResponse } from "../types/season";
import type { IResponse } from "../types/response";
import type { IRacesDetails, RacesResponse } from "../types/race";
import type {
  IRaceResultsDetails,
  RaceResultsDetailsResponse,
} from "../types/race-details";

function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      "VITE_API_BASE_URL is not defined in the environment variables."
    );
  }
  return baseUrl;
}

function mapResponse<T>(data: T, pagination: IPagination): IResponse<T> {
  return {
    data,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
      total: pagination.total,
    },
  };
}
const http = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export function getSeasons(
  pagination: IPagination
): Promise<IResponse<ISeasonDetails[]>> {
  return http
    .get("/seasons.json", { params: pagination })
    .then((response: AxiosResponse<SeasonResponse>) =>
      mapResponse<ISeasonDetails[]>(
        response.data.MRData.SeasonTable.Seasons,
        response.data.MRData
      )
    );
}

export function getRaces(
  pagination: IPagination,
  season: string
): Promise<IResponse<IRacesDetails[]>> {
  return http
    .get(`/${season}/races.json`, { params: pagination })
    .then((response: AxiosResponse<RacesResponse>) =>
      mapResponse<IRacesDetails[]>(
        response.data.MRData.RaceTable.Races,
        response.data.MRData
      )
    );
}

export function getResults(
  pagination: IPagination,
  season: string,
  round: number
): Promise<IResponse<IRaceResultsDetails[]>> {
  return http
    .get(`/${season}/${round}/results.json`, { params: pagination })
    .then((response: AxiosResponse<RaceResultsDetailsResponse>) =>
      mapResponse<IRaceResultsDetails[]>(
        response.data.MRData.RaceTable.Races,
        response.data.MRData
      )
    );
}
