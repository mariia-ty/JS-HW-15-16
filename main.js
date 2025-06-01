import debounce from "lodash.debounce";
import { error, info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const box = document.getElementById("search-box");
const list = document.querySelector(".result");

box.addEventListener("input", debounce(onInput, 500));

function countryInfo(country) {
  const info = `
    <li>
    <h2>${country.name}</h2>
    <img src="${country.flags.svg}" width="60px">
    <p><strong>Capital:</strong> ${country.capital} </p>
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Languages:</strong></p>
    <ul>
    ${country.languages.map((lang) => `<li>${lang.name}</li>`).join("")}
    </ul>
    </li>
    `;
  list.innerHTML = info;
}

function renderCountryList(countries) {
  let countryList = "";

  countries.forEach((country) => {
    countryList += `<li>${country.name}</li>`;
  });
  list.innerHTML = countryList;
}

function onInput(entry) {
  const query = entry.target.value.trim();

  if (!query) {
    list.innerHTML = "";
    return;
  }

  fetchCountries(query)
    .then((countries) => {
      list.innerHTML = "";

      if (countries.length > 10) {
        info({
          text: "Too many matches found. Please enter a more specific name.",
        });
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
      } else if (countries.length === 1) {
        countryInfo(countries[0]);
      } else {
        error({ text: "No country found with that name." });
      }
    })
    .catch(() => {
      error({ text: "Oops! Something went wrong with the request." });
    });
}
