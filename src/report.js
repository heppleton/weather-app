const MS_TO_MPH = 2.2369362921;

const makeTempHolder = (temp) => {
    const tempHolder = document.createElement("div")
    tempHolder.classList.add("big-holder");
    const unitTemp = Math.round(temp - 273.15)
    tempHolder.textContent = `${unitTemp}\u2103`;
    return tempHolder;
}

const makeWindHolder = (speed, degrees) => {
    const windHolder = document.createElement("div");
    windHolder.classList.add("big-holder");
    
    const windArrow = document.createElement("img");
    windArrow.src = "../src/icons/windarrow.svg";
    windArrow.style.setProperty("transform", `rotate(${degrees}deg)`);
    windArrow.classList.add("wind-arrow");

    const unitSpeed = Math.round(speed * MS_TO_MPH);
    windHolder.textContent = unitSpeed;
    windHolder.appendChild(windArrow);
    return windHolder;
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