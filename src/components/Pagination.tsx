import { useEffect, useReducer } from "react";
import { PER_PAGE, type IPagination } from "../types/pagination";

interface PaginationProps {
  total: number;
  onPageChange: (pagination: IPagination) => void;
}

interface ChangePageAction {
  type: "next" | "prev" | "setNumOfPages";
  numOfPages?: number;
}
interface ChangePageState {
  page: number;
  numOfPages: number;
}

function changePageReducer(state: ChangePageState, action: ChangePageAction) {
  switch (action.type) {
    case "next":
      if (state.page < state.numOfPages)
        return {
          ...state,
          page: state.page + 1,
        };
      return state;
    case "prev":
      if (state.page > 1)
        return {
          ...state,
          page: state.page - 1,
        };
      return state;
    case "setNumOfPages":
      return {
        ...state,
        numOfPages: action.numOfPages || 0,
      };
    default:
      return state;
  }
}

function PaginationComponent({ total, onPageChange }: PaginationProps) {
  const [state, dispatch] = useReducer(changePageReducer, {
    page: 1,
    numOfPages: 0,
  });

  useEffect(() => {
    dispatch({
      type: "setNumOfPages",
      numOfPages: Math.ceil(total / PER_PAGE),
    });
  }, [total]);

  useEffect(() => {
    emitPageChange();
  }, [state.page]);

  const emitPageChange = () => {
    onPageChange({ offset: (state.page - 1) * PER_PAGE, limit: PER_PAGE });
  };

  if (total < PER_PAGE) {
    return null; // No pagination needed if total items are less than items per page
  }
  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <button
          className="w-20 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-800 bg-white border  border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => dispatch({ type: "prev" })}
          disabled={state.page === 1}
        >
          Previous
        </button>
        <span className="px-3 h-8 border border-gray-300 flex items-center justify-center ">
          Page {state.page} of {state.numOfPages}
        </span>
        <button
          className="w-20 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-800 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => dispatch({ type: "next" })}
          disabled={state.page === state.numOfPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PaginationComponent;
