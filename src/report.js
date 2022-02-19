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
    typeIcon.src = `../src/icons/${type.icon}.svg`;

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

const createDaily = (daily) => {
    console.log(daily);

    const outer = document.querySelector(".daily-outer");
    outer.replaceChildren();
    outer.textContent = "Next 7 days"
    const inner = document.createElement("div");
    inner.classList.add("daily-inner");
    for (let i = 1; i < 8; i++) {
        const day = daily[i];

        const dayHolder = document.createElement("div");
        dayHolder.classList.add("small-holder");

        const timeHolder = document.createElement("div");
        const time = new Date(day.dt * 1000);
        const unitTime = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(time);
        timeHolder.textContent = unitTime;

        const typeIcon = document.createElement("img");
        typeIcon.src = `../src/icons/${day.weather[0].icon}.svg`;

        const tempHolder = document.createElement("div")
        const unitTemp = Math.round(day.temp.max - 273.15)
        tempHolder.textContent = `${unitTemp}\u2103`;

        const windHolder = document.createElement("div");
        windHolder.classList.add("wind-holder");
        const unitSpeed = Math.round(day.wind_speed * MS_TO_MPH);
        windHolder.textContent = unitSpeed;    
        const windArrow = document.createElement("div");
        const arrow = document.createElement("img")
        arrow.src = "../src/icons/windarrow.svg";
        arrow.classList.add("small-arrow");
        arrow.style.setProperty("transform", `rotate(${day.wind_deg}deg)`);
        windArrow.classList.add("wind-arrow");
        windArrow.appendChild(arrow);
        windHolder.appendChild(windArrow);

        dayHolder.append(timeHolder, typeIcon, tempHolder, windHolder);
        inner.append(dayHolder);
    }
    outer.appendChild(inner);
}

const createHourly = (hourly) => {
    const outer = document.querySelector(".hourly-outer");
    outer.replaceChildren();
    outer.textContent = "Next 24 hours"

    const inner = document.createElement("div");
    inner.classList.add("hourly-inner");
    for (let i = 1; i < 25; i++) {
        const hour = hourly[i];

        const hourHolder = document.createElement("div");
        hourHolder.classList.add("small-holder");

        const timeHolder = document.createElement("div");
        const time = new Date(hour.dt * 1000);
        const unitTime = time.getHours();
        timeHolder.textContent = `${unitTime}:00`;

        const typeIcon = document.createElement("img");
        typeIcon.src = `../src/icons/${hour.weather[0].icon}.svg`;

        const tempHolder = document.createElement("div")
        const unitTemp = Math.round(hour.temp - 273.15)
        tempHolder.textContent = `${unitTemp}\u2103`;

        const windHolder = document.createElement("div");
        windHolder.classList.add("wind-holder");
        const unitSpeed = Math.round(hour.wind_speed * MS_TO_MPH);
        windHolder.textContent = unitSpeed;    
        const windArrow = document.createElement("div");
        const arrow = document.createElement("img")
        arrow.src = "../src/icons/windarrow.svg";
        arrow.classList.add("small-arrow");
        arrow.style.setProperty("transform", `rotate(${hour.wind_deg}deg)`);
        windArrow.classList.add("wind-arrow");
        windArrow.appendChild(arrow);
        windHolder.appendChild(windArrow);

        hourHolder.append(timeHolder, typeIcon, tempHolder, windHolder);
        inner.append(hourHolder);
    }
    outer.appendChild(inner);
}



const displayReport = (report) => {
    createCurrent(report);
    createHourly(report.hourly);
    createDaily(report.daily);
}

export { displayReport }