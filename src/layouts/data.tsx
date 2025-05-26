import { useContext } from "react";
import ToggleContext from "../context/toggle";
interface IDataLayoutComponentProps {
  children: React.ReactNode;
}

function DataLayoutComponent({ children }: IDataLayoutComponentProps) {
  const toggle = useContext(ToggleContext);
  const isCardView = toggle === "card";
  return (
    <div className={`${isCardView && "lg:w-1/3 md:w-1/2"} w-full p-2 relative`}>
      <div
        className={` flex gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100
                     ${isCardView && "block!"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default DataLayoutComponent;
