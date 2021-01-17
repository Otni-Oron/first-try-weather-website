const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3f88d8d9abf7de7c32698699beca3658&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        }
        else
            if (response.body.error) {
                callback('unable to find location', undefined)
            }
            else {
                 callback(undefined, 'Generally speaking, the weather is ' + response.body.current.weather_descriptions[0] + ', the temprature out is ' + response.body.current.temperature + ' deg, but it sure feels like ' + response.body.current.feelslike + ' deg. However - the wind-speed is '+response.body.current.wind_speed)
                // callback(undefined, {
                //     forecast: response.body.current.weather_descriptions[0],
                //     temprature: response.body.current.temperature
                // }
                // )
            }
    })
}



    module.exports = forecast
