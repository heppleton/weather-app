import { displayReport } from "./report.js";

const OWM_API_KEY = "0ec437db8343a627d6380c3290f18de6";

/*Take location and weather data and returns as a single object.*/
const createReport = ({ name, state, country }, { current, hourly, daily, timezone_offset }) => {
    return { name, state, country, current, hourly, daily, timezone_offset }
}

const getLatLon = async (placename) => {
    const geocodingPromise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${placename}&limit=1&appid=${OWM_API_KEY}`)
    const locationPromise = await geocodingPromise.json()
    return locationPromise;
}

const getWeather = async ({ lat, lon }) => {
    const openWeatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${OWM_API_KEY}`);
    const weatherPromise = await openWeatherPromise.json();
    return weatherPromise;
}

const newRequest = async (searchQuery) => {
    try {
        const locationData = await getLatLon(searchQuery).then(data => data[0]);
        const weatherData = await getWeather(locationData)
        const weatherReport = createReport(locationData, weatherData);
        displayReport(weatherReport);
    }
    catch (error) {
        console.log(error);
    }
}

export { newRequest }