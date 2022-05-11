import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCompetition } from "../services/api-requests";
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "../styles/Competition.module.css";

const Competition = () => {
  const params = useParams();
  const location = useLocation();
  const pathElements = location.pathname.split("/");
  const section = pathElements[pathElements.length - 1];

  const { data, isLoading, isError } = useQuery(
    ["competition", params.competitionId],
    () => fetchCompetition(params.competitionId),
    { retry: 1, staleTime: 3000000, refetchOnWindowFocus: false, refetchOnMount: false });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || Object.keys(data.errors).length > 0) {
    return <Error page="competition" />;
  }

  console.log(data)

  let currentSeason = data.response[0].seasons.find(season => season.current === true);

  return (
    <div className={styles.subColumnTwo}>
      <div>
        <h2 className={styles.subheading}>{data.response[0].league.name}</h2>
        <h3 className={styles.currentSeason}>
          Season{" "}
          {data.response[0].seasons[data.response[0].seasons.length - 1].year}
          /
          {data.response[0].seasons[data.response[0].seasons.length - 1]
            .year + 1}
        </h3>
        <div className="tabs is-centered is-boxed">
          <ul>
            {currentSeason.coverage.standings && (
              <li className={`${section === "standings" ? "is-active" : null}`}>
                <Link
                  to={`/competitions/${params.competitionCountry}/${params.competitionId}/standings?s=${currentSeason.year}`}
                >
                  Standings
                </Link>
              </li>
            )}
            {currentSeason.coverage.fixtures.events && (
              <li className={`${section === "fixtures" ? "is-active" : null}`}>
                <Link
                  to={`/competitions/${params.competitionCountry}/${params.competitionId}/fixtures?s=${currentSeason.year}`}
                >
                  Fixtures
                </Link>
              </li>
            )}
            {currentSeason.coverage.top_scorers && currentSeason.coverage.top_assists && currentSeason.coverage.top_cards && (
              <li className={`${section === "rankings" ? "is-active" : null}`}>
                <Link
                  to={`/competitions/${params.competitionCountry}/${params.competitionId}/rankings?s=${currentSeason.year}`}
                >
                  Rankings
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Competition;