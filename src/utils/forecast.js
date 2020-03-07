const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e5925ec2b54052bd96bc3a55980c1052/${latitude},${longitude}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = body.currently
            const data = body.daily.data[0].summary + `It is currently degrees ${currently.temperature} out. There is a ${currently.precipProbability}% chance of rain.`
            callback(undefined, data)
        }
    })
}

module.exports = forecast