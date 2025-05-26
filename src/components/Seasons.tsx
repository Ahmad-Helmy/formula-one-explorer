import { getSeasons } from "../services/http";
import useFetch from "../hooks/useFetch";
import type { ISeasonDetails } from "../types/season";
import MainLayoutComponent from "../layouts/main";
import DataLayoutComponent from "../layouts/data";
import { Link } from "react-router-dom";

function SeasonsComponent() {
  const [data, loading, error, total, setPagination] =
    useFetch<ISeasonDetails>(getSeasons);

  return (
    <MainLayoutComponent
      total={total}
      loading={loading}
      error={error}
      title="F1 Seasons"
      onPageChange={setPagination}
    >
      <div className="flex flex-wrap w-full">
        {data.map((season) => (
          <DataLayoutComponent key={season.season}>
            <Link className="text-blue-400" to={`/races/${season.season}`}>
              <p>Season: {season.season}</p>
            </Link>
            <p>URL: {season.url}</p>
          </DataLayoutComponent>
        ))}
      </div>
    </MainLayoutComponent>
  );
}

export default SeasonsComponent;
