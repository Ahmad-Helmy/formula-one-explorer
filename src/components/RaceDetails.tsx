import { getResults } from "../services/http";
import useFetch from "../hooks/useFetch";
import MainLayoutComponent from "../layouts/main";
import type { IRaceResultsDetails } from "../types/race-details";
import { useParams } from "react-router-dom";
import DataLayoutComponent from "../layouts/data";

function RaceDetailsComponent() {
  const { season, round } = useParams<{ season: string; round: string }>();

  const [data, loading, error, total, setPagination] =
    useFetch<IRaceResultsDetails>(getResults, season, round);

  return (
    <MainLayoutComponent
      total={total}
      loading={loading}
      error={error}
      title={`Race Results for Season ${season} Round ${round}`}
      onPageChange={setPagination}
    >
      <div className="flex flex-wrap w-full">
        {data[0]?.Results.map((result) => (
          <DataLayoutComponent key={result.Driver.driverId}>
            <p>Driver Name: {result.Driver.givenName}</p>
            <p>Nationality: {result.Driver.nationality}</p>
            <p>Team: {result.Constructor.name}</p>
            <p>Position: {result.position}</p>
          </DataLayoutComponent>
        ))}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Driver Name</th>
              <th className="px-6 py-3">Nationality</th>
              <th className="px-6 py-3">Team</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Time (if finished)</th>
            </tr>
          </thead>
          <tbody>
            {data[0]?.Results.map((result) => (
              <tr
                className="bg-white border-b border-gray-200"
                key={result.Driver.driverId}
              >
                <td className="px-6 py-3">{result.position}</td>
                <td className="px-6 py-3">
                  {result.Driver.givenName} {result.Driver.familyName}
                </td>
                <td className="px-6 py-3">{result.Driver.nationality}</td>
                <td className="px-6 py-3">{result.Constructor.name}</td>
                <td className="px-6 py-3">{result.status}</td>
                <td className="px-6 py-3">
                  {result.Time ? result.Time.time : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayoutComponent>
  );
}

export default RaceDetailsComponent;
