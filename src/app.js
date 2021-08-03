const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'JW Kim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'JW Kim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'JW Kim',
        helpText: 'Please contact ',
        email: 'lhouette@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })  
})

app.get('/weather/current', (req, res) => {
    if (!req.query.latitude || !req.query.longitude) {
        return res.send({
            error: 'You must provide your current location'
        })
    }

    const locationString = req.query.longitude + ',' + req.query.latitude

    geocode(locationString, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'JW Kim',
        errorMessage: 'about article not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'JW Kim',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'JW Kim',
        errorMessage: 'Page not found'
    })
})

app.listen(port , () => {
    console.log('server is up on port ' + port)
})