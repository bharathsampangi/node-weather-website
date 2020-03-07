const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhhcmF0aHM5NSIsImEiOiJjazdnNjM5d2owOWNuM2ttZmY0NW8wajZvIn0.LYHi1ZliDhCXHAs3KqNd6Q&limit=1'

    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geolocation service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to process your request', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, { latitude, longitude, location })
        }
    })
}

module.exports = geocode