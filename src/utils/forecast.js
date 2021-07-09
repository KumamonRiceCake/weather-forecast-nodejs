const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=08c107bc8b07c4ce4436e54632ba3b37&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to coonect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] +'. It is currently ' +
                body.current.temperature + ' degrees out. It feels like ' +
                body.current.feelslike + ' degrees out. The humidity is ' +
                body.current.humidity + '%.')
        }
   })
}

module.exports = forecast