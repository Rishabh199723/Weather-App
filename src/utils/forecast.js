const request = require('request')
const forecast = (latitide,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=459f735e0310734e9b8a9ab41d212991&query='+latitide+","+longitude
request({url, json:true},(error,{body})=>{
        if(error){
            callback("Cannot connect to weather stack server",undefined)
        }else if(body.error){
            callback("Something wrong requested",undefined)
        }else{
            callback(undefined,"There is "+body.current.temperature+" temperature."+"There is "+body.current.precip+" chance of rain.")
        }
    })
}
module.exports = forecast