import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchStandings } from "../services/api-requests";
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "../styles/Standings.module.css";

const Standings = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let season = searchParams.get("s");

  const { data, isLoading, isError } = useQuery(
    ["standings", params.competitionId, season],
    () => fetchStandings(params.competitionId, season),
    { retry: 1, staleTime: 3000000, refetchOnWindowFocus: false, refetchOnMount: false });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error page="standings" />;
  }

  // console.log(data)

  return (
    <div className={styles.container}>
      <h3 className={styles.subheading}>Standings</h3>
      <div className="table-container">
        <table className="table is-bordered is-narrow">
          <thead>
            <tr>
              <th><abbr title="Position">P</abbr></th>
              <th>Team</th>
              <th><abbr title="Matches played">MP</abbr></th>
              <th><abbr title="Wom">W</abbr></th>
              <th><abbr title="Drawn">D</abbr></th>
              <th><abbr title="Lost">L</abbr></th>
              <th><abbr title="Goals for">GF</abbr></th>
              <th><abbr title="Goals against">GA</abbr></th>
              <th><abbr title="Goal difference">GD</abbr></th>
              <th><abbr title="Points">PTS</abbr></th>
              <th>Promotion/Relegation</th>
            </tr>
          </thead>
          <tbody>
            {data.response[0].league.standings[0].map((position) => (
              <tr key={position.rank}>
                <td>{position.rank}</td>
                <td>{position.team.name}</td>
                <td>{position.all.played}</td>
                <td>{position.all.win}</td>
                <td>{position.all.draw}</td>
                <td>{position.all.lose}</td>
                <td>{position.all.goals.for}</td>
                <td>{position.all.goals.against}</td>
                <td>{position.goalsDiff}</td>
                <td>
                  <b>{position.points}</b>
                </td>
                <td>{position.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;