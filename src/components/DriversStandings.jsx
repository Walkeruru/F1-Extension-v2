import { useEffect, useState } from "react";
import "../styles/driversStandings.css";

const DriverStandings = () => {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `https://ergast.com/api/f1/current/driverStandings.json`
      );
      let data = await response.json();
      data = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setDatos(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="driversList">
      <h2>Drivers Standings:</h2>
      {isLoading && <img src="yellowTire.svg" className="loading" />}
      <ul>
        {datos.map((driver) => {
          return (
            <li key={driver.position}>
              <div className="winner">
                <div className="bg-winner">
                  <img
                    src={`drivers/${driver.Driver.familyName.toLowerCase()}.png`}
                    alt={driver.Driver.familyName}
                  />
                </div>
                <div className="name-winner">
                  <p>{driver.position}.</p>
                  <p className="nombre">{driver.Driver.givenName}</p>
                  <p className="apellido">{driver.Driver.familyName}</p>
                </div>
                <span>{driver.points} Pts</span>
              </div>
              <div className="separador"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DriverStandings;
