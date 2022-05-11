import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Factz Football: Visualize football data</h1>
      <h3 className={styles.text}>Up to date information about different leagues, standings, fixtures and rankings</h3>
      <Link to="/competitions" className={styles.exploreBtn}>Explore</Link>
    </div>
  );
}

export default Home;