'use strict';
const review_key = "5j2OFsyfrQhAQYEZt5F8IvnB5eiDVc0HecM9VEpsr9f5eqtWqhov9p6jsIxHoDhdJNYpuO4Lukeu03zZ1rVaZJyMtwnMjzQvUQK7YsJaJzd3SLJiuCUtgs4NFV5mXHYx";
const review_url = "https://api.yelp.com/v3";
const brewery_url = "https://api.openbrewerydb.org/breweries";

// watchform 
function watchFormBreweries() {
    $('form').submit(event => {
        event.preventDefault();
        const citySearch = $('#js-search-bar').val();
        getBreweryResults(citySearch);
    })
}
// format query params
function formatQueryParams(breweryParams) {
    const queryItems = Object.keys(breweryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(breweryParams[key])}`)
    return queryItems.join('&');
}
// get results from brewery API
function getBreweryResults(query) {
    const breweryParams = {
        by_city : query,
    };
    const queryString = formatQueryParams(breweryParams);
    const url = brewery_url + '?' + queryString;
    fetch(url) 
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            console.log(responseJson)
            displayBreweryResults(responseJson)
        })
        .catch(err => {
            $('#js-error-message').text('something went wrong');
        });
}
//  display the results
function displayBreweryResults(responseJson) {
    $('.brewery-list').empty();
    for (let i = 0; i < responseJson.length; i++) 
        $('.brewery-list').append
            (`<li>
                <h3>${responseJson[i].name}</h3>
                <p>${responseJson[i].street}</br>${responseJson[i].city}, ${responseJson[i].state}</p>
                <a href="${responseJson[i].website_url}" target="_blank">Link to website</a>
            </li>`)
}
// click function for reviews

// get reviews

// display the results for the reviews of brewery

// handler 
$(watchForm);