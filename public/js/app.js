// console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=aman').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log('unable to fetch data')
//         }
//         console.log({
//             location: data.location,
//             forecast: data.forecast
//         })
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    const location = search.value
    // if (!location)
    //     return messageTwo.textContent = 'no location chosen'

    fetch('weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageTwo.textContent = data.error
            }
              
             messageOne.textContent = data.location
             messageTwo.textContent = data.forecast

        })
    })
})


// const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/rio.json?access_token=pk.eyJ1Ijoib3RuaSIsImEiOiJja2ZwaHp3bmcwYmEzMnFyNWlpMnU2Mm1oIn0.z-SE3acq-5pFsSEceRXaLA&limit=1'
// fetch(geoCodeURL).then((response)=>{
//     response.json().then((geocodeData)=>{
//         if(!geocodeData)
//         console.log(error)
//         else{
//             // console.log(geocodeData)
//             const longitude = geocodeData.features[0].center[0]
//                 const latitude = geocodeData.features[0].center[1]
//                 const location = geocodeData.features[0].place_name
//                 // console.log('longitude: '+longitude, 'latitude: '+ latitude, 'location: '+location  )
//                 const forecastURL = 'http://api.weatherstack.com/current?access_key=3f88d8d9abf7de7c32698699beca3658&query=' + latitude + ',' + longitude + '&units=f'
//                 fetch(forecastURL).then((response)=>{
//                     response.json().then((forecastData)=>{
//                         if(forecastData.error){
//                             console.log("unable to show forecast")
//                             console.log(forecastData.error)
//                         }
//                         else{
//                             console.log(forecastData)
//                         console.log( 'Generally speaking, the weather is ' + forecastData.current.weather_descriptions[0] + ', the temprature out is ' + forecastData.current.temperature + ' deg, but it sure feels like ' + forecastData.current.feelslike + ' deg')

//                          }
//                     })
//                 })
//         }
//     })
// })