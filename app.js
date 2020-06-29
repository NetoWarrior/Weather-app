require('dotenv').config()
const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/",function (req, res){

  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = process.env.API_KEY;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+unit+"&appid="+apiKey;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> The Weather is currently " + description+ "<p>");
      res.write("<h1>The Temperature in "+ query +" is "+temp+" degrees Celcius.<h1>");
      res.write("<img src="+ imageURL + " alt='Weather image'>");
      res.send();

    })
  })

})

app.listen(3000,function(){
  console.log("Server is running at port 3000::");
})

