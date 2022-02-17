const makeTempHolder = (temp) => {
    const tempHolder = document.createElement("div")
    tempHolder.classList.add("big-holder");
    const unitTemp = Math.round(temp - 273.15)
    tempHolder.textContent = `${unitTemp}\u2103`;
    return tempHolder;
}

const makeWindHolder = (speed, degress) => {
    const windHolder = document.createElement("div");
    const windArrow = document.createElement("img");
    windArrow.src = "../src/icons/wind_arrow.svg";

    //wind.textContent = `${report.current.wind_speed}, ${report.current.wind_deg}`;
    windHolder.appendChild(windArrow);
    return windHolder
}

const createCurrent = (report) => {
    const layout = document.createElement("div");
    layout.classList.add("current-layout");

    const placename = document.createElement("div");
    placename.classList.add("placename");
    placename.textContent = report.name;
    const state = document.createElement("div");
    state.classList.add("state");
    state.textContent = report.state;
    
    const weather = document.createElement("div");
    weather.classList.add("weather");
    const type = document.createElement("div");
    type.textContent = "weather";

    weather.append(makeTempHolder(report.current.temp), 
        makeWindHolder(report.current.wind_speed, report.current.wind_deg),
        type);    
    layout.append(placename, state, weather);

    const holder = document.querySelector(".current-holder");
    holder.replaceChildren(layout);

/*Today:
current.temp, 
current.wind_speed, current.wind_deg, 
current.weather (.id, .main, .icon)

need separate little functions for displaying temp, wind, and weather*/
}

const displayReport = (report) => {
    createCurrent(report);

}

export { displayReport }