const request = require('request')

const geocoding = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZ3VyYXNoaXNoYmFnZ2EiLCJhIjoiY2txcWlzZjJwMTZveTJ0bWhsbDZ6bXVlMyJ9.bAt-aOchRzXeqZojdOeQ6Q'
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(!response.body.features[0]){
            callback('Cannot find location', undefined)
        }
        else{
            callback(undefined, {longitude: response.body.features[0].center[0],latitude: response.body.features[0].center[1], location: response.body.features[0].place_name})
        }
    } )
}

module.exports = geocoding