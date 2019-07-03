const request = require('request')

const forecast = (lat, long, callback) => {

const url = 'https://api.darksky.net/forecast/852d29105323390e5379023b1f9204dd/'+ lat + ',' + long;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    
    })
}

module.exports = forecast