const request = require('request')
// const inputAddress = require ('../src/app')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1Ijoib3RuaSIsImEiOiJja2ZwaHp3bmcwYmEzMnFyNWlpMnU2Mm1oIn0.z-SE3acq-5pFsSEceRXaLA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to geocode service', undefined)
        }
        else
            if (body.features == undefined || body.features.length === 0) {
                callback('incorrect location', undefined)
            }
            else {
                const longitude = body.features[0].center[0]
                const latitude = body.features[0].center[1]
                const location = body.features[0].place_name
                callback(undefined, {
                    longitude, latitude, location
                })
            }

    }
    )


}


module.exports = geocode



