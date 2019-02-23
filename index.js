'use strict';
const brewery_url = "https://api.openbrewerydb.org/breweries";
// Searchbar animation
var searchEx = ['Want some suggestions?', 'Chicago', 'San Francisco', 'Austin', 'New York', 'Nashville', 'Atlanta', 'Portland', 'Denver', 'Raleigh', 'Detroit', 'San Diego',];
setInterval(function () {
    $("input#js-search-bar").attr("placeholder", searchEx[searchEx.push(searchEx.shift()) - 1]);
}, 3000);
// event listener for when the user searches a specific city
function watchFormBreweries() {
    $('form').submit(event => {
        event.preventDefault();
        const city = $('#js-search-bar').val();
        if (city === "") {
            $('#js-search-bar').attr("placeholder", "Try out a city here...");
        }
        else {
            getBreweryResults(city);
            $('.brewery-list').removeClass('hidden');
        }
    })
}
// fetch the results for search query from brewery_url
function getBreweryResults(city) {
    return fetch(`${brewery_url}?by_city=${encodeURIComponent(city)}`)
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
// display the search results for breweries
function displayBreweryResults(responseJson) {
    $('.brewery-list').empty();
    $('.error-message').empty();
    for (let i = 0; i < responseJson.length; i++)
        $('.brewery-list').append
            (`<li class="review-link">
                <a href="${responseJson[i].website_url}" target="_blank">
                <h3>${responseJson[i].name}</h3>
                <p>${responseJson[i].street.length > 0 ? `${responseJson[i].street} </br>` : ''}${responseJson[i].city}, ${responseJson[i].state}</p>
                </a>
            </li>`)
    if (responseJson.length === 0) {
        $('#js-error-message').text('No results. Try again.');
    }
}
watchFormBreweries();
