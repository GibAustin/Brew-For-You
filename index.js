'use strict';
const brewery_url = "https://api.openbrewerydb.org/breweries";
const store = {
    selectedBrewery: []
}
// watchform 
function watchFormBreweries() {
    $('form').submit(event => {
        event.preventDefault();
        const city = $('#js-search-bar').val();
        getBreweryResults(city);
        $('.brewery-list').removeClass('hidden');
    })
}
// get results from brewery API
function getBreweryResults(city) {
    return fetch (`${brewery_url}?by_city=${encodeURIComponent(city)}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            store.selectedBrewery = responseJson;
            console.log(responseJson)
            displayBreweryResults(responseJson)
        })
        .catch(err => {
            $('#js-error-message').text('something went wrong');
        });
}
//display the results
function displayBreweryResults(responseJson) {
    $('.brewery-list').empty();
    for (let i = 0; i < responseJson.length; i++)
        $('.brewery-list').append
            (`<li class="review-link" data-longitude="${responseJson[i].longitude}" data-latitude="${responseJson[i].latitude}">
                <h3>${responseJson[i].name}</h3>
                <p>${responseJson[i].street}</br>${responseJson[i].city}, ${responseJson[i].state}</p>
                <a href="${responseJson[i].website_url}" target="_blank">Link to website</a>
            </li>`)
}
// handler 
watchFormBreweries();
