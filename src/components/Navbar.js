import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [navbarExpand, setNavbarExpand] = useState(false);
  return (
    <nav
      className={`navbar ${styles.navbar}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className={`navbar-item ${styles.brandLink}`}>
          <span className={styles.logo}>⚽ Factz Football</span>
        </Link>
        <button
          className={`navbar-burger ${styles.burgerButton} ${navbarExpand ? "is-active" : null}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setNavbarExpand(prevState => setNavbarExpand(!prevState))}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${styles.navItems} ${navbarExpand ? "is-active" : null}`}
      >
        <div className={`navbar-start ${styles.linkContainer}`}>
          <Link to="/competitions" className={`navbar-item ${styles.navLink}`}>
            Competitions
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;