const request = require("request")

const weather = (latitude, longitide, callback) => {
 const url = 'http://api.weatherstack.com/current?access_key=b8b55f8d7a1d0ed31af5fd8e9493692e&units=m&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitide)
 request({ url, json: true}, (error, response) => {
    //  if(response){
    //     const {body} = response
    //  }
    if(error){
        callback('Unable to connect', undefined)
    }
    else if(response.body.error){
        callback('Please check your input location', undefined)
    }
    else{
        callback(undefined,response.body.current.temperature)
    }
 })
}

module.exports = weather