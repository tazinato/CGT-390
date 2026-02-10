import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Profile App</h1>
      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home 
        </NavLink>
        <NavLink to="/add" className="nav-link">
          Add Profile 
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About 
        </NavLink>
        <NavLink to="/other-profiles" className="nav-link">
          Other Profiles 
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;