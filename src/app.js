const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars' engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

const errorMessage = 'page not found'
const helpErrorMessage = 'Help article not found'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bear1'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bear',
        errorMessage: errorMessage
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help!',
        helpText: 'This is some helpful text.',
        name: 'Bear',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }
    geocode(req.query.address, (error, geocodeData) => {
        if (error) {
            return res.send({ error })
        }

        forecast(geocodeData.longitude, geocodeData.latitude, (error, forecastData={}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData.forecast,
                temprature: forecastData.temprature,
                location: geocodeData.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: helpErrorMessage
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: errorMessage
    })
})

app.listen(port, () => {
    console.log('Server is up on port: '+port)
})







