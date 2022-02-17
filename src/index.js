"use strict";

import { newRequest } from "./retrieve.js"

newRequest("Dublin");

/*
Changes:
2. Add error catching to location to check if place exists.
3. find picture for each weather id code?

https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

    Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
    Set up a simple form that will let users input their location and will fetch the weather info (still just console.log() it).
    Display the information on your webpage!
    Add any styling you like!
    Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.
    Push that baby to github and share your solution below!


    Notes:
    Temperature in Kelvin and wind speed in meter/sec is used by default, 
        so there is no need to use the units parameter in the API call if you want this

What data do I want?
Location: name, state, (lat, lon have already been used at this point)
Weather: 
Today: current.temp, current.wind_speed, current.wind_deg, current.weather (.id, .main, .icon)

Next 24 hours: hourly(as above) + hourly.dt (for unix time)

Next 7 days: daily(as above but temp.day for day temperature) + daily.dt (for time)

*/