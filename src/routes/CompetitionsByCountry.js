import { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCompetitions } from "../services/api-requests";
import Loading from "../components/Loading";
import Error from "../components/Error";
import styles from "../styles/CompetitionsByCountry.module.css";

const CompetitionsByCountry = () => {
  let params = useParams();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const handleDropdownMenu = () => {
    setIsDropdownActive(!isDropdownActive);
  }
  useEffect(() => {
    setIsDropdownActive(false);
  }, [params.competitionId]);


  const { data, isLoading, isError } = useQuery(
    ["competitions", params.competitionCountry],
    () => fetchCompetitions(params.competitionCountry),
    { retry: 1, staleTime: 3000000, refetchOnWindowFocus: false, refetchOnMount: false });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error page="competitions" />
  }

  // console.log(data)

  return (
    <div className={styles.parent}>
      <h2 className={styles.subheading}>
        {params.competitionCountry.charAt(0).toUpperCase() +
          params.competitionCountry.slice(1)}
      </h2>
      <div className={styles.subColumnParent}>
        <div className={`is-success ${styles.subColumnOne}`}>
          <div style={{ "width": "100%" }} className={`dropdown ${isDropdownActive ? "is-active" : null}`}>
            <div style={{ "width": "100%" }} className="dropdown-trigger">
              <button style={{ "width": "100%" }} className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleDropdownMenu}>
                <span>{selectedCompetition ? selectedCompetition : "Select a competition"}</span>
                <span className="icon is-small">
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className={`dropdown-content ${styles.dropdownContent}`}>
                {data.response.map(competition => (
                  <Link
                    to={`/competitions/${params.competitionCountry.toLowerCase()}/${competition.league.id}`}
                    key={competition.league.id}
                    className={`dropdown-item ${selectedCompetition === competition.league.name ? "is-active" : null}`}
                    onClick={() => setSelectedCompetition(competition.league.name)}
                  >
                    {competition.league.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default CompetitionsByCountry;