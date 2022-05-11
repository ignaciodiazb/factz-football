import { Outlet } from "react-router-dom";
import styles from "../styles/Competitions.module.css";

const Competitions = () => {
  return (
    <div className={`section ${styles.competitionsContainer}`}>
      <h1 className={styles.heading}>Competitions</h1>
      <Outlet />
    </div>
  );
};

export default Competitions;
