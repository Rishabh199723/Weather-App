const request = require('request')
const geocode =(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmlzaGFiaC0xIiwiYSI6ImNrYWlvNnRpeTAyb3UycW13ZWFidTE3eHgifQ.6wIwGK2u5dNvWtC62g5OoQ&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to location server",undefined)
        }else if(body.features.length===0){
            callback("Wrong params entered",undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
        
    })
}
module.exports =geocode