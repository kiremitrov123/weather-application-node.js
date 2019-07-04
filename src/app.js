const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

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
        title: 'Weather Application',
        name: 'Kire Mitrov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Us',
        message: 'Example message goes here!',
        name: 'Kire Mitrov'
    })
})

app.get('', (req, res) => {
    res.send({
        forecast: 'It is snoing',
        location: 'Philadelphia'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})





app.get('/help/*', (req, res) => {
    res.render('404-articles', {
        title: 'Help articles 404 Page',
        message: 'Article you are looking for does not exist!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Page you are looking for is not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on' + port)
})