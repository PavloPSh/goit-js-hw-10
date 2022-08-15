

const BASE_URL = 'https://restcountries.com/v3.1'

function fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`

    return fetch(url).then(response => {
        return response.json();
        })
          
};

export {fetchCountries};