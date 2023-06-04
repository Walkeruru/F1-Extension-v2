import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import "../styles/standingsSelector.css";

const StandingSelector = (props) => {
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parent]);

  return (
    <div className="hideWidth" ref={parentRef}>
      <div className="selector">
        <h2>Standings</h2>
        <div className="container">
          <div className="cuadros" onClick={props.handleDriversClick}>
            <h3>Drivers</h3>
            <img src="img/max.png" alt="" className="max" />
          </div>
          <div className="cuadros" onClick={props.handleConstructorClick}>
            <h3>Constructors</h3>
            <img src="img/car.png" alt="" className="car" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingSelector;
