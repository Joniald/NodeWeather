const express = require("express");
const app = express();
const path = require("path");
const hds = require("hbs");
const port = process.env.PORT || 3500 ;

// paths
const publicPath = path.join(__dirname, "../public");
const viwesPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// geo path
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

// static html file
app.use(express.static(publicPath))

// dynamic html file
app.set("view engine", "hbs");
// views
app.set("views", viwesPath);
// partials
hds.registerPartials(partialPath);


// render index
app.get("/", (req,res)=>{
    res.render("index", {
        title: "This is an dynamic page",
        paragraphOne: "This is the first paragraph",
        value: 30 
    })
})

// render about
app.get("/about", (req,res)=>{
    res.render("about",{
        title: "About with hbs",
        paragraphOne: "This is about TivAc",
        value: 300 
    })
})

// render help
app.get("/help", (req,res)=>{
    res.render("help", {
        title: "How can we help you",
        paragraphOne: "Provide any quation and we will answer as soon as possible.",
        value: 3 
    })
})


// app weather
app.get("/weather",(req,res)=>{
    if (!req.query.address || !req.query.popularity) {
        return res.render("weather",{
            title: "Please search for a specific city providing a popularity number",
            paragraph: ""
        })
    } 

    geocode(req.query.address, req.query.popularity, (error, {latitude=0,longitude=0}) => {
        if (error) {
            return res.render("weather",{
                title: "Error: " + error,
                paragraph: ""
            })
        }
        forecast(latitude, longitude, (error, {country, region, temperature, weather_descriptions})=>{
            
            if (error) {
                return res.render("weather",{
                    title: "Error: " + error,
                    paragraph: ""
                });
            }
            res.render("weather",{
                title: "Weather",
                paragraph: `In ${country} in more precise, in ${region}, 
                the temprature now is ${temperature} C. ${weather_descriptions}`
            })
        })
        
    })

})



// others 404
app.get("*", (req,res)=>{
    res.render("errorsHandle",{
        title:"Oups....404 error"
    })
})


// portal
app.listen(port, ()=>{
    console.log("Server is up on port" + port)
})