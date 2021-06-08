const request = require("postman-request");

const forecast = (long=0, lat=0, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e8348d547fc3d12bd4442fa224ce67b3&query="+long+","+lat+"&units=m";

    request({ url:url, json:true }, (error,response)=>{
        
        const {country, region} = response.body.location;
        const {temperature, weather_descriptions} = response.body.current;
        if (error){
            callback("No connection...", undefined)
        }else if (response.body.error){
            callback("Something wrong with url. ("+response.body.error.type+")" , undefined)
        }else{
            callback(undefined,{
                country,
                region,
                temperature,
                weather_descriptions
            })
        }
    })

}


module.exports = forecast