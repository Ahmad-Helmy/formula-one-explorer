import type { IServerResponse } from "./response";

export interface ICircuitDetails {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: number;
    long: number;
    locality: string;
    country: string;
  };
}

export interface IRacesDetails {
  season: string;
  round: string;
  url: string;
  raceName: string;
  date: string;
  Circuit: ICircuitDetails;
}

export interface IRaces<T> {
  Races: T[];
}

export type RacesResponse = IServerResponse<{ RaceTable: IRaces<IRacesDetails> }>;
