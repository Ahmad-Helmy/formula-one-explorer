import { Route, Routes } from "react-router-dom";
import "./App.css";
import RaceDetailsView from "./views/RaceDetails";
import RacesView from "./views/Races";
import SeasonsView from "./views/Seasons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SeasonsView />} />
      <Route index element={<SeasonsView />} />
      <Route path="races/:season/:round" element={<RaceDetailsView />} />
      <Route path="races/:season" element={<RacesView />} />
      <Route path="*" element={<SeasonsView />} />
    </Routes>
  );
}

export default App;
