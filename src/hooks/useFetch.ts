//Filename - useFetch.js

import { useCallback, useEffect, useState } from "react";
import { PER_PAGE, type IPagination } from "../types/pagination";
import type { IService } from "../types/service";
import type { IResponse } from "../types/response";

function useFetch<T>(callbackFunction: IService<T[]>, ...args: any[]) {
  const [memo, setMemo] = useState<Record<number, IResponse<T[]>>>({});
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    offset: 0,
    limit: PER_PAGE,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch();
  }, [pagination.offset]);

  const fetch = useCallback(() => {
    // Check if data is already cached
    if (memo[pagination.offset]) {
      setData(memo[pagination.offset].data);
      setTotal(memo[pagination.offset].pagination.total || 0);
      return;
    }

    setLoading(true);
    callbackFunction(pagination, ...args)
      .then((response) => {
        setData(response.data);
        setTotal(response.pagination.total || 0);
        // Cache the response
        setMemo({ ...memo, [pagination.offset]: response });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pagination]);

  return [data, loading, error, total, setPagination] as const;
}

export default useFetch;
