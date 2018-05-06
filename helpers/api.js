const fetch = require('node-fetch');

const API_BASE_URL = 'https://api.wanikani.com';
const INTERNAL_API_BASE_URL = 'https://www.wanikani.com/json'
const API_VERSION = 'v2';
const SEPARATOR = '/';
const ENDPOINTS = {
    reviewStatistics: 'review_statistics',
    item: 'subjects',
    vocabulary: 'vocabulary',
    kanji: 'kanji'
};


const getJsonFromResponse = response => response.json();

const getApiUrl = (endpoint, parameters) => {
    return (
        API_BASE_URL + SEPARATOR + API_VERSION +
        SEPARATOR + ENDPOINTS[endpoint] +
        parameters
    );
};

const getInternalApiUrl = parameters => INTERNAL_API_BASE_URL + parameters;

module.exports = {
    callApi: (endpoint, parameters, token) => {
        return fetch(
            getApiUrl(endpoint, parameters),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(getJsonFromResponse);
    },
    callInternalApi: (parameters, token) => {
        return fetch(
            getInternalApiUrl(parameters),
            {
                headers: {
                    Cookie: token
                }
            }
        ).then(getJsonFromResponse);
    }
};