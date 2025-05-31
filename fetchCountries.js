const base = "https://restcountries.com/v2/name";

export default function fetchCountries(searchQuery) {
  return fetch(`${base}`).then((res) => {
    if (!res.ok) {
      throw new Error(responce.status);
    }
    return res.json();
  });
}
