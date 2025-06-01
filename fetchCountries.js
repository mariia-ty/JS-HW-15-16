const base = "https://restcountries.com/v2/name";

export default function fetchCountries(searchQuery) {
  return fetch(`${base}/${searchQuery}`).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
