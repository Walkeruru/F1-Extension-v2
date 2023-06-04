import RaceSelector from "./RaceSelector";
import { useEffect, useState } from "react";
import tinydate from "tinydate";
import "../styles/raceInfo.css";

const RaceInfo = () => {
  return <Child></Child>;
};

const Child = () => {
  const [nextRace, setNextRace] = useState("Next");
  const [current, setCurrent] = useState("");
  const [gpName, setGpName] = useState("");
  const [raceId, setRaceId] = useState("");
  const [raceDay, setRaceDay] = useState("");
  const [qualyDay, setQualyDay] = useState("");
  const [country, setCountry] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  //date formatter
  const stamp = tinydate(`{DD} de {MMMM}`, {
    MMMM: (d) => d.toLocaleString("default", { month: "long" }),
    DD: (d) => d.getDate(),
  });
  const formatHour = tinydate("{HH}:{mm}");
  const raceDate = new Date(raceDay);
  const qualyDate = new Date(qualyDay);
  //
  useEffect(() => {
    setIsOpen(false); //cierra la tabla de resultados al cambiar de carrera;

    const fetchRaceData = async (url) => {
      try {
        let response = await fetch(url);
        let data = await response.json();
        setNextRace(data.MRData.RaceTable.round);
        if (nextRace == "Next") {
          setCurrent(data.MRData.RaceTable.round); // setea la carrera mas cercana en el primer load
        }
        data = data.MRData.RaceTable.Races[0];
        setGpName(data.raceName.replace("Grand Prix", ""));
        setRaceId(data.Circuit.circuitId);
        setRaceDay(`${data.date}, ${data.time}`);
        setQualyDay(`${data.Qualifying.date}, ${data.Qualifying.time}`);
        setCountry(data.Circuit.Location.country.toLowerCase());
      } catch (error) {
        console.error(error);
      }
    };

    const fetchResultData = async (url) => {
      try {
        let response = await fetch(url);
        let data = await response.json();
        data = data.MRData.RaceTable.Races[0].Results;
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRaceData(`https://ergast.com/api/f1/current/${nextRace}.json`);
    if (Number(nextRace) < Number(current)) {
      fetchResultData(
        `http://ergast.com/api/f1/current/${nextRace}/results.json`
      );
    }
  }, [nextRace]);

  const handlePrevClick = () => {
    if (nextRace == 1) {
      alert("Esta es la primera carrera de la temporada");
    } else return setNextRace(Number(nextRace) - 1);
  };
  const handleNextClick = () => {
    if (nextRace == 22) {
      alert("Esta es la ultima carrera de la temporada");
    } else return setNextRace(Number(nextRace) + 1);
  };

  function isRaceDay(fecha) {
    let dia = Date.parse(fecha);
    return Date.now() >= dia;
  }

  return (
    <div className="hideWidth">
      <div className="main">
        <RaceSelector
          gp={Number(current) == Number(nextRace)}
          PrevClick={handlePrevClick}
          NextClick={handleNextClick}
        ></RaceSelector>
        <div className="name">
          <h2>
            {gpName.charAt(0).toUpperCase() + gpName.slice(1).toLowerCase()}
          </h2>
          <img
            src={`countries/${country}.png`}
            alt={`${raceId} flag`}
            width="33"
          />
        </div>
        <img
          src={`circuits/${raceId}.png`}
          alt={`${raceId} circuit`}
          width="490"
        />
        <div className="horarios">
          <p>Dia: {stamp(raceDate)}</p>
          <p>Hora: {formatHour(raceDate)}</p>
          <div className="separador"></div>
          <p>Clasificacion: {stamp(qualyDate)}</p>
          <p>Hora: {formatHour(qualyDate)}</p>
          {isRaceDay(raceDay) && (
            <button
              className={isOpen ? "resultBtn clicked" : "resultBtn"}
              onClick={() => setIsOpen(!isOpen)}
            >
              Resultados
            </button>
          )}

          {isOpen && (
            <div className="listaResultados">
              {results.map((result) => {
                if (result.position == "1") {
                  return (
                    <div className="winner" key={result.position}>
                      <div className="bg-winner">
                        <img
                          src={`drivers/${result.Driver.familyName.toLowerCase()}.png`}
                          alt={result.Driver.familyName}
                        />
                      </div>
                      <div className="name-winner">
                        <p>Winner</p>
                        <p className="nombre">{result.Driver.givenName}</p>
                        <p className="apellido">{result.Driver.familyName}</p>
                      </div>
                      <span>+{result.points} Pts</span>
                    </div>
                  );
                } else {
                  return (
                    <div className="listItem" key={result.position}>
                      <div>
                        <p>
                          {result.position}.{" "}
                          <span className="listNombre">
                            {result.Driver.givenName}
                          </span>{" "}
                          {result.Driver.familyName}
                        </p>
                        <span>+{result.points} Pts</span>
                      </div>
                      <p>{result.Constructor.name}</p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceInfo;
