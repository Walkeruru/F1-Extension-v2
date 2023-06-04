import "../styles/navbar.css";

const Navbar = (props) => {
  return (
    <>
      <nav>
        <img src="img/icon.png" alt="f1 logo" />
        <label htmlFor="hamburger" className="hamburger-menu">
          <input type="checkbox" id="hamburger" onClick={props.handleClick} />
        </label>
      </nav>
    </>
  );
};

export default Navbar;
