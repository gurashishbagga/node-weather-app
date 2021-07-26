const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocoding = require('./utils/geocoding.js')
const weather_info = require('./utils/weather-info.js')

const app = express()

console.log(__dirname)

const route = path.join(__dirname, '../public')
const viewsRoute = path.join(__dirname,'../templates/views')
const partialRoute = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialRoute)

app.set('view engine', 'hbs')
app.set('views', viewsRoute)



app.use(express.static(route))


app.get('',(req,res) => {
    res.render('index', {
        title: 'weather',
        name: 'Gurashish',
        age: '23'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help'
    })
})


// app.get('', (req, res) => {
//     res.send('Hi there!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help is here')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide an address',
        })
    }

    geocoding(address, (error, response) => {
        if(error){
            res.send({error: error})
        }
        const{latitude,longitude,location} = response
        //console.log('Location: '+ location)
        weather_info(latitude, longitude, (error, weatherdata) => {
            if(error){
                return res.send({error: error})
            }
           // console.log('It is currently ', (weatherdata),' fahrenheit')
           res.send({
                location: location,
                address: address,
                forecast: weatherdata,
            })
        })
    })

})

app.get('/help/*',(req, res) => {
    res.render('error',{
        message: 'Help artilce not found'
    })
})


app.get('*',(req, res) => {
    res.render('error',{
        message: 'Page not found'
    })
})

app.listen(3001, () => {               // Second argument is optional. It doesn't show to user, only to developer
    console.log('server is running')
})