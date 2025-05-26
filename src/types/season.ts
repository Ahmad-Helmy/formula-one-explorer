import type { IServerResponse } from "./response";

export interface ISeasonDetails {
    season: string;
    url: string;
}

export interface ISeason {
  Seasons: ISeasonDetails[];
}

export type SeasonResponse = IServerResponse<{ SeasonTable: ISeason }>;
