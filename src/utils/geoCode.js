const request = require('request')


const geoCode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FuZ2VldGFiZyIsImEiOiJja3l3aGFoeGQwMmRxMm9xdjY1NmI5cG1rIn0.8vVHN0r830jk-LYcx35Tog&limit=1'
    request({url:url,json:true},(error,{body})=>{
    
    if(error){
        callback('unable to connect',undefined)

    }else if (body.features.length === 0){
        callback('unable to find location . Try another location',undefined)
    }else{
        callback( undefined,{
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            location: body.features[0].place_name,
            
          })
        }
    }) 
}
 module.exports= geoCode;