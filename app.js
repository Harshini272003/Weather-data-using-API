const express=require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response)
{
	
response.sendFile(__dirname+"/");
	
});

app.post("/",function(request,response)
{
	const query=request.body.cityName;
	const apiKey="2fb0530efd5abb1649ee8d6fae5b27c9";
	const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;    //getting live info from weather API
	https.get(url,function(res)  //making http get request
	{
		console.log(res.statusCode);
		res.on("data",function(data)
		{
			
            const weatherdata= JSON.parse(data);  //parse json data
            const temp = weatherdata.main.temp;
            const weatherDescription = weatherdata.weather[0].description;
            const icon= weatherdata.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/10d@2x.png";
            response.write("<html><h2>The weather in "+query+" is "+weatherDescription+"</h2></html>");
            response.write("<html><h1>The temperature in "+query+" is "+temp+" degree fahrenhiet</h1></html>");       //display in browser
            response.write("<html><img src="+imgUrl+"></html> ");

            response.send();
		});
	});
})

app.listen(3000,function()
{
	console.log("Server is running on port 3000");
});

/*


	*/
