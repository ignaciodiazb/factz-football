import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchRankings } from "../services/api-requests";
import Loading from "./Loading";
import Error from "./Error";
import styles from "../styles/RankingCategory.module.css";

const RankingCategory = (props) => {
  let params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let season = searchParams.get("s");

  const initialList = 3;
  const fullList = 20;
  const [results, setResults] = useState(initialList);
  const statisticPath = props.extra.split(".");

  const { data, isLoading, isError } = useQuery(
    [`ranking ${props.query}`, props.query, season, params.competitionId],
    () => fetchRankings(props.query, season, params.competitionId),
    { retry: 1, staleTime: 3000000, refetchOnWindowFocus: false, refetchOnMount: false });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || Object.keys(data.errors).length > 0) {
    return <Error page="rankings" />;
  }

  return (
    <div className="column">
      <h4 className={styles.categoryHeading}>{props.category}</h4>
      <div className={styles.tableContainer}>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>{props.statistic}</th>
            </tr>
          </thead>
          <tbody>
            {data && data.response.slice(0, results).map(({ player, statistics }) => (
              <tr key={player.name} className={styles.tableCell}>
                <td className={styles.photoCell}>
                  <figure className="image is-48x48">
                    <img src={player.photo} alt={player.name} className={`is-rounded ${styles.playerPhoto}`} />
                  </figure>
                </td>
                <td className={styles.playerName}>
                  {player.name}
                </td>
                <th className={styles.playerStatistics}>
                  {statistics[0][statisticPath[0]][statisticPath[1]]}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {results === 3 ? (
        <button className={styles.resultsButton} onClick={() => setResults(fullList)}>More results</button>
      ) : (
        <button className={styles.resultsButton} onClick={() => setResults(initialList)}>Less results</button>
      )}
    </div>
  );
}

export default RankingCategory;