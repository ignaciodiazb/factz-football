export const filterCountries = (countries, searchTerm) => {
  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return filteredCountries;
}