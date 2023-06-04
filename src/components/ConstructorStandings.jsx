import { useEffect, useState } from "react";
import "../styles/constructorStandings.css";

const ConstructorStandings = () => {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `https://ergast.com/api/f1/current/constructorStandings.json`
      );
      let data = await response.json();
      data = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      setDatos(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="constructorList">
      <h2>Constructor Standings:</h2>
      {isLoading && <img src="yellowTire.svg" className="loading" />}
      <ul>
        {datos.map((team) => {
          return (
            <li key={team.position}>
              <div className="team">
                <div className="teamCar">
                  <img
                    src={`cars/${team.Constructor.constructorId.toLowerCase()}.png`}
                    alt={team.Constructor.constructorId}
                  />
                </div>
                <div className="name-team">
                  <p>{team.position}.</p>
                  <p className="constructorName">{team.Constructor.name}</p>
                </div>
                <span>{team.points} Pts</span>
              </div>
              <div className="separador"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConstructorStandings;
