import { useState } from "react";
import PaginationComponent from "../components/Pagination";
import ToggleContext from "../context/toggle";
import type { IPagination } from "../types/pagination";
import CardListComponent from "../components/CardListToggle";
import { Toggle } from "../types/toggle";
interface MainComponentProps {
  children?: React.ReactNode;
  loading: boolean;
  error?: string;
  total: number;
  title: string;
  onPageChange: (pagination: IPagination) => void;
}

function MainLayoutComponent({
  children,
  loading,
  error,
  total,
  title,
  onPageChange,
}: MainComponentProps) {
  const [toggle, setToggle] = useState<Toggle>(
    (localStorage.getItem("toggle") as Toggle) || Toggle.Card
  );

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <ToggleContext.Provider value={toggle}>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-5">
        <h1 className="lg:text-5xl md:text-2xl my-10">{title}</h1>
        <CardListComponent onToggleChange={setToggle} toggle={toggle} />
        {loading ? <div>Loading...</div> : children}
        <PaginationComponent total={total} onPageChange={onPageChange} />
      </div>
    </ToggleContext.Provider>
  );
}

export default MainLayoutComponent;
