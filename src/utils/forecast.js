const request = require('request')
const forecast = (longitude,latitude,callback) =>{
    const url = "https://api.weatherstack.com/current?access_key=191cfd1c9e77ea3d77e716f0085ba3f9&query=' + latitude + ',' + longitude + '&units=f"
    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('unable to connect to weather services!',undefined)
         }else if (body.error) { 
            callback('unable to find')
        } else {
            callback (undefined,body.current.weather_descriptions[0] + ". it is currently " + body.current.temperature + " degrees  out. there is a " + body.current.feelslike + " % chance of rain ")
        }
    })
}




module.exports = forecast