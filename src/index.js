import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY) );


function onSearchBoxInput(event) {
   
    const inputText = event.target.value.toLowerCase().trim()
    if(inputText === ''){
        return    
    }

    fetchCountries(inputText)
    .then(renderInt)
    .catch(errorInt)
    
  
};

function renderInt (countries) {
    // console.log(countries)
    if (countries.length > 10){
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length <= 10 && countries.length > 1){
        countryList.textContent = '';
        countryInfo.textContent = '';
        return renderCountriesList(countries, countryList)
    } else {
        countryList.textContent = '';
        countryInfo.textContent = '';
        return renderCountryInfo (countries, countryInfo)
    }

    

}

function errorInt(error) {
    return Notiflix.Notify.failure("Oops, there is no country with that name")
}

function renderCountriesList (countries, listRef) {
    const createList = countries
    .map(({  
        flags: { svg }, 
        name: { official } 
    }) =>
        `
        <li class="country-list__item">
            <img src="${svg}" alt="country-flag" width="30" height="18">
            <p class="country-list__title">${official}</p>
        </li>`
    ).join('');

    return (listRef.innerHTML = createList);

}

function renderCountryInfo(countries, infoRef) {
    const createInfo = countries
    .map(({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
    }) => 
        `<div class="country-info__container">
            <img src="${svg}" alt="country-flag" width="30" height="18">
            <h1 class="country-info__main-title">${official}</h1>
                <ul class="country-info__list">
                    <li class="country-info__item">
                        <h2 class="country-info___title">Capital:</h2>
                        <p class="country-info___text">${capital}</p>
                    </li>
                    <li class="country-info__item">
                        <h2 class="country-info___title">Population:</h2>
                        <p class="country-info___text">${population}</p>
                    </li>
                    <li class="country-info__item">
                        <h2 class="country-info___title">Languages:</h2>
                        <p class="country-info___text">${Object.values(languages)}</p>
                    </li>
                </ul>
        </div>`   
    ).join('');

    return infoRef.innerHTML = createInfo;
}






