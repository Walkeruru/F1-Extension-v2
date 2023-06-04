import Navbar from "./components/Navbar";
import RaceInfo from "./components/RaceInfo";
import StandingSelector from "./components/StandingsSelector";
import DriverStandings from "./components/DriversStandings";
import ConstructorStandings from "./components/ConstructorStandings";
import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDriversTableOpen, setIsDriversTableOpen] = useState(false);
  const [isConstructorOpen, setIsConstructorOpen] = useState(false);

  return (
    <div className="App">
      <Navbar
        handleClick={() => {
          setIsOpen((current) => !current);
          setIsDriversTableOpen(false);
          setIsConstructorOpen(false);
        }}
      />
      {isDriversTableOpen && <DriverStandings />}
      {isConstructorOpen && <ConstructorStandings />}
      {!isOpen && !isDriversTableOpen && !isConstructorOpen && <RaceInfo />}
      {isOpen && !isDriversTableOpen && !isConstructorOpen && (
        <StandingSelector
          handleDriversClick={() => setIsDriversTableOpen(!isDriversTableOpen)}
          handleConstructorClick={() =>
            setIsConstructorOpen(!isConstructorOpen)
          }
        />
      )}
    </div>
  );
}

export default App;
