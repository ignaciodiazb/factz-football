import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Country.module.css";

const Country = ({ country }) => {
  return (
    <Link
      to={`/competitions/${country.name.toLowerCase()}`}
      className={`column is-2-desktop is-3-mobile ${styles.countryLink}`}
    >
      <div className={styles.countryContainer}>
        {country.flag ? (
          <>
            <img src={country.flag} alt={country.name} />
            <span>{country.name}</span>
          </>
        ) : (
          <>
            <span className={styles.onlyName}>
              {country.name}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}

export default Country;