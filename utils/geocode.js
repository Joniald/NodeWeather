const request = require("postman-request");


const geocode = (address = '', nrTry = 0, callback) => {
     const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoiam9uaWFsZCIsImEiOiJja295NnJuMDYwZnJpMnhtY3Qxc2EwMTluIn0.xof5thD_hyNgJdKrMTtmrg";
     
     request({ url:urlGeo, json:true}, (error,response)=>{
         if (error) {
             callback("No connection...", undefined)
         }else if (response.body.features.length === 0 ) {
             callback("Something wrong with url", undefined)
         }else{
             callback(undefined, {
                 longitude: response.body.features[nrTry].center[0],

                 latitude: response.body.features[nrTry].center[1],
                 
                 place_name: response.body.features[nrTry].place_name
             })
         }
     })
}

module.exports = geocode