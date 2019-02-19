'use strict';
const review_key = "5j2OFsyfrQhAQYEZt5F8IvnB5eiDVc0HecM9VEpsr9f5eqtWqhov9p6jsIxHoDhdJNYpuO4Lukeu03zZ1rVaZJyMtwnMjzQvUQK7YsJaJzd3SLJiuCUtgs4NFV5mXHYx";
const review_url = "https://api.yelp.com/v3";
const brewery_url = "https://api.openbrewerydb.org/breweries";

// watchform 
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const citySearch = $('js-search-bar').val();
        getBreweryResults(citySearch);
    })
}

// format query params

// get results from brewery API

// display the results

// click function for reviews

// display review results

// handler 