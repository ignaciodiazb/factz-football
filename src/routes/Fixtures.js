import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchFixtures } from "../services/api-requests";
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "../styles/Fixtures.module.css";
import stadiumIcon from "../assets/stadium-icon.png";
import moment from "moment";

const Fixtures = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let season = searchParams.get("s");
  let nextMatches = 10;

  const { data, isLoading, isError } = useQuery(
    ["fixtures", params.competitionId, season, nextMatches],
    () => fetchFixtures(params.competitionId, season, nextMatches),
    { retry: 1, staleTime: 300000, refetchOnWindowFocus: false, refetchOnMount: false }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || Object.keys(data.errors).length > 0) {
    return <Error page="fixtures" />;
  }

  console.log(data)

  return (
    <div className={styles.container}>
      <h3 className={styles.subheading}>Next matches</h3>
      <div>
        <div>
          {data.response.map((match) => (
            <div key={match.fixture.id} className={styles.matchContainer}>
              <div className={styles.dateContainer}>
                <time className={styles.fixtureDate}>
                  {moment(match.fixture.date).format("MMMM Do YYYY, h:mm a")}
                </time>
              </div>
              <div className={styles.teamsContainer}>
                <div className={styles.team}>
                  <img
                    src={match.teams.home.logo}
                    alt={match.teams.home.name}
                    className={styles.teamLogo}
                  />
                  <p>{match.teams.home.name}</p>
                </div>
                <div className={styles.stadiumContainer}>
                  <img
                    src={stadiumIcon}
                    alt="stadium"
                    className={styles.stadium}
                  />
                  <p>
                    {match.fixture.venue.name}, {match.fixture.venue.city}
                  </p>
                </div>
                <div className={styles.team}>
                  <img
                    src={match.teams.away.logo}
                    alt={match.teams.away.name}
                    className={styles.teamLogo}
                  />
                  <p>{match.teams.away.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fixtures;