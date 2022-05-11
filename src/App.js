import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Competitions from "./routes/Competitions";
import CountriesList from "./routes/CountriesList";
import CompetitionsByCountry from "./routes/CompetitionsByCountry";
import Competition from "./routes/Competition";
import Standings from "./routes/Standings";
import Fixtures from "./routes/Fixtures";
import Rankings from "./routes/Rankings";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="competitions" element={<Competitions />}>
              <Route index element={<CountriesList />} />
              <Route path=":competitionCountry" element={<CompetitionsByCountry />}>
                <Route path=":competitionId" element={<Competition />}>
                  <Route path="standings" element={<Standings />} />
                  <Route path="fixtures" element={<Fixtures />} />
                  <Route path="rankings" element={<Rankings />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;