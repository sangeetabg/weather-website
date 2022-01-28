const request = require('request')

const foreCast=(latitude,longitude,callback)=>{
    const foreurl='http://api.weatherstack.com/current?access_key=2da3888d239c8aa622968a936b3f89b9&query='+ latitude+','+ longitude +'&units=f'
    request({url:foreurl,json:true},(error,{body})=>{
        if(error){
            callback('enable to connect to weather forecast',undefined)
        }else if(body.error){
            callback('enable to find location',undefined)
        }else{
            callback(undefined,
                ` It is ${body.current.weather_descriptions}.It is currently ${body.current.temperature} degress out. There is a ${body.current.cloudcover}% chance of rain.`
               
            )
        }
    })
}
module.exports=foreCast;