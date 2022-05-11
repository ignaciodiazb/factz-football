import RankingCategory from "../components/RankingCategory";
import styles from "../styles/Rankings.module.css";

const Rankings = () => {
  return (
    <div className={styles.rankingsContainer}>
      <h3 className={styles.subheading}>Rankings</h3>
      <div className="columns">
        <RankingCategory category="Top Scorers" query="topscorers" statistic="Goals" extra="goals.total" />
        <RankingCategory category="Top Assists" query="topassists" statistic="Assists" extra="goals.assists" />
        <RankingCategory category="Most Yellow Cards" query="topyellowcards" statistic="Yellow Cards" extra="cards.yellow" />
        <RankingCategory category="Most Red Cards" query="topredcards" statistic="Red Cards" extra="cards.red" />
      </div>
    </div >
  );
}

export default Rankings;