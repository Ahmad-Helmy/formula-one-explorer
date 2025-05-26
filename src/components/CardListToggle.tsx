import { Toggle } from "../types/toggle";

function CardListComponent({
  toggle,
  onToggleChange,
}: {
  toggle: Toggle;
  onToggleChange: (toggle: Toggle) => void;
}) {
  const setToggleAndSave = (newToggle: Toggle) => {
    onToggleChange(newToggle);
    localStorage.setItem("toggle", newToggle);
  };

  return (
    <div className="mb-4">
      <button
        className={`px-4 py-2 mr-2 rounded ${
          toggle === Toggle.Card ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setToggleAndSave(Toggle.Card)}
      >
        Card View
      </button>
      <button
        className={`px-4 py-2 rounded ${
          toggle === Toggle.List ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setToggleAndSave(Toggle.List)}
      >
        List View
      </button>
    </div>
  );
}

export default CardListComponent;
