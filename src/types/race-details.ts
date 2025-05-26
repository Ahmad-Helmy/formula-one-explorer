import type { IRaces, IRacesDetails } from "./race";
import type { IServerResponse } from "./response";

export interface IDriver {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}
export interface IConstructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}
export interface ITime {
  millis: string;
  time: string;
}

export interface IResults {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: IDriver;
  Constructor: IConstructor;
  status: string;
  Time?: ITime;
}

export interface IRaceResultsDetails extends IRacesDetails {
  Results: IResults[];
}

export type RaceResultsDetailsResponse = IServerResponse<{
  RaceTable: IRaces<IRaceResultsDetails>;
}>;
