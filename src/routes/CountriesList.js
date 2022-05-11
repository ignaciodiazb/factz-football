import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCountries } from "../services/api-requests";
import { filterCountries } from "../utils/countries";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Country from "../components/Country";
import styles from "../styles/CountriesList.module.css";

const CountriesList = () => {
  const [countrySearch, setCountrySearch] = useState("");

  const { data, isLoading, isError } = useQuery(
    "countries",
    fetchCountries,
    { retry: 1, staleTime: 300000, refetchOnWindowFocus: false, refetchOnMount: false });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || Object.keys(data.errors).length > 0) {
    return <Error page="competitions" />;
  }

  return (
    <div>
      <h2 className={styles.subheading}>
        Select a country to see the competitions available.
      </h2>
      <input
        className={`input is-normal is-focused is-success ${styles.searchInput}`}
        type="text"
        placeholder="Search"
        value={countrySearch}
        onChange={e => setCountrySearch(e.target.value)}
      />
      <div className={`columns is-mobile is-multiline ${styles.columnsParent}`}>
        {filterCountries(data.response, countrySearch).map((country) => (
          <Country key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;