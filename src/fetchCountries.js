
function fetchCountries(name) {
    //return promise
    const searchParams = new URLSearchParams({
        fields: "name,capital,flags,population,languages",
    });
    return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);//for fetch() and 404
            }
            return response.json();
        });
}

export { fetchCountries };
