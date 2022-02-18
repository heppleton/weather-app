const MS_TO_MPH = 2.2369362921;

const makeTempHolder = (temp) => {
    const tempHolder = document.createElement("div")
    tempHolder.classList.add("big-holder");
    const unitTemp = Math.round(temp - 273.15)
    tempHolder.textContent = `${unitTemp}\u2103`;
    return tempHolder;
}

const makeTypeHolder = (type) => {
    const typeHolder = document.createElement("div");
    typeHolder.classList.add("big-holder");
    
    const typeIcon = document.createElement("img");
    typeIcon.src = `../src/icons/${type.icon}@2x.png`;

    typeHolder.appendChild(typeIcon);

    return typeHolder;
}

const makeWindHolder = (speed, degrees) => {
    const windHolder = document.createElement("div");
    windHolder.classList.add("big-holder");
    const unitSpeed = Math.round(speed * MS_TO_MPH);
    windHolder.textContent = unitSpeed;

    const windArrow = document.createElement("div");
    const arrow = document.createElement("img")
    arrow.src = "../src/icons/windarrow.svg";
    arrow.style.setProperty("transform", `rotate(${degrees}deg)`);
    windArrow.classList.add("wind-arrow");
    windArrow.appendChild(arrow);

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
    weather.classList.add("weather")
    weather.append(makeTempHolder(report.current.temp), 
        makeWindHolder(report.current.wind_speed, report.current.wind_deg),
        makeTypeHolder(report.current.weather[0])
        );

    layout.append(placename, state, weather);

    const outer = document.querySelector(".current-outer");
    outer.replaceChildren(layout);

}

const createHourly = (hourly) => {
    const outer = document.querySelector(".hourly-outer");
    outer.replaceChildren();
    outer.textContent = "Next 24 hours"

    const inner = document.createElement("div");
    inner.classList.add("hourly-inner");
    for (let i = 1; i < 25; i++) {
        const hour = hourly[i];
        console.log(hour);

        const hourHolder = document.createElement("div");
        hourHolder.classList.add("small-holder");

        const timeHolder = document.createElement("div");
        console.log(hour.dt);
        const time = new Date(hour.dt * 1000);
        const unitTime = time.getHours();
        timeHolder.textContent = `${unitTime}:00`;

        const typeIcon = document.createElement("img");
        console.log(hour);
        typeIcon.src = `../src/icons/${hour.weather[0].icon}@2x.png`;


        hourHolder.append(timeHolder, typeIcon);
        inner.append(hourHolder);
    }
    outer.appendChild(inner);
}



const displayReport = (report) => {
    createCurrent(report);
    createHourly(report.hourly);
}

export { displayReport }