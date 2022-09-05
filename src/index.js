import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();

  countryList.textContent = "";
  countryInfo.textContent = "";

  const requestValue = evt.target.value.trim();

  if (requestValue === "") {
    return;
  }

  fetchCountries(requestValue)
    .then(data => {
      console.log(data);
    if (data.length == 1) {
      renderCountryInfo(data);
    } else
    if (data.length > 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
      renderCountriesList(data);
    }
  })
  .catch(error => {
    console.log(error);
    if (error.message == 404) {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    }
  });
}

function renderCountriesList(countries) {
  const markup = countries
    .map((country) => {
      return `<li class="country-item">
          <img class="flag" src="${country.flags.png}" alt="flag country" width="32">
          <b>${country.name.common}</b>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}

function renderCountryInfo(country) {
  const markupList = `
    <li class="country-item card">
      <img class="flag" src="${country[0].flags.png}" alt="flag country" width="32">
      <b>${country[0].name.common}</b>
    </li>
    `;
  
  const languages = Object.values(country[0].languages)
    .map((lan) => { return lan }).join(", ");
  
  const markupInfo = `
    <p class="country-info-text"><b>Capital: </b>${country[0].capital[0]}</p>
    <p class="country-info-text"><b>Population: </b>${country[0].population}</p>
    <p class="country-info-text"><b>Language: </b>${languages}</p>
    `;
  
  countryList.innerHTML = markupList;
  countryInfo.innerHTML = markupInfo;
}
