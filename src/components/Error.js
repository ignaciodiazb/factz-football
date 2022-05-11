import React from "react";
import styles from "../styles/Error.module.css";

const Error = (props) => {
  return (
    <div className={styles.errorContainer}>
      oops! An error ocurred while loading the {props.page}. Please try again later.
    </div>
  );
}

export default Error;