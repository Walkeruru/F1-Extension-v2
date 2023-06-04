import "../styles/raceSelector.css";

const RaceSelector = (props) => {
  return (
    <>
      <div className="selectMenu">
        <button className="back-arrow" onClick={props.PrevClick}>
          <img
            src="assets/Next_Arrow.svg.png"
            alt="flecha"
            width="33"
            id="back"
          />
        </button>
        <p> {props.gp ? "Next GP:" : "GP:"} </p>
        <button className="back-arrow" onClick={props.NextClick}>
          <img src="assets/Next_Arrow.svg.png" alt="flecha" width="33" />
        </button>
      </div>
    </>
  );
};

export default RaceSelector;
