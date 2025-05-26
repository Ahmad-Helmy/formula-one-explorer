import { getRaces } from "../services/http";
import useFetch from "../hooks/useFetch";
import MainLayoutComponent from "../layouts/main";
import type { IRacesDetails } from "../types/race";
import { Link, useParams } from "react-router-dom";
import DataLayoutComponent from "../layouts/data";
import { useState } from "react";

function RacesComponent() {
  const { season } = useParams<{ season: string }>();
  const [pinnedRaces, setPinnedRace] = useState<Record<string, IRacesDetails>>(
    JSON.parse(localStorage.getItem("pinnedRaces") || "{}")
  );
  const [data, loading, error, total, setPagination] = useFetch<IRacesDetails>(
    getRaces,
    season
  );
  const formateDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const pinRace = (race: IRacesDetails) => {
    const pinndedItems = JSON.parse(
      localStorage.getItem("pinnedRaces") || "{}"
    );
    pinndedItems[`${race.round};${race.season}`] = race;
    localStorage.setItem("pinnedRaces", JSON.stringify(pinndedItems));
    setPinnedRace(pinndedItems);
  };

  const unpinRace = (race: IRacesDetails) => {
    const pinndedItems = JSON.parse(
      localStorage.getItem("pinnedRaces") || "{}"
    );
    delete pinndedItems[`${race.round};${race.season}`];
    localStorage.setItem("pinnedRaces", JSON.stringify(pinndedItems));
    setPinnedRace(pinndedItems);
  };

  const getRaceDetails = (race: IRacesDetails) => {
    return (
      <>
        <Link
          className="text-blue-400"
          to={`/races/${race.season}/${race.round}`}
        >
          <p>Race Name: {race.raceName}</p>
        </Link>
        <p>Race Date: {formateDate(race.date)}</p>
        <p>Race Circuit Name: {race.Circuit.circuitName}</p>
      </>
    );
  };
  return (
    <MainLayoutComponent
      total={total}
      loading={loading}
      error={error}
      title={`Races for Season ${season}`}
      onPageChange={setPagination}
    >
      <div className="flex flex-wrap w-full">
        {/* pinned races */}
        {Object.values(pinnedRaces)
          .filter((race) => race.season === season)
          .map((race) => (
            <DataLayoutComponent key={race.round}>
              <button
                onClick={() => unpinRace(race)}
                className="bg-black text-white px-2 py-1 rounded cursor-pointerr"
              >
                unpin
              </button>
              {getRaceDetails(race)}
            </DataLayoutComponent>
          ))}
        {/* unpinned races */}
        {data
          .filter(
            (race) => !pinnedRaces[`${race.round};${race.season}`] && race
          )
          .map((race) => (
            <DataLayoutComponent key={race.round}>
              <button
                onClick={() => pinRace(race)}
                className="bg-gray-500 text-white px-2 py-1 rounded cursor-pointerr"
              >
                pin
              </button>
              {getRaceDetails(race)}
            </DataLayoutComponent>
          ))}
      </div>
    </MainLayoutComponent>
  );
}

export default RacesComponent;
