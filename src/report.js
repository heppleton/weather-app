import { makeComplexElement, makeWindArrow } from "./helper";
import { units } from "./units";

const MS_TO_MPH = 2.2369362921;

const makeTypeHolder = (type, size) => {
    const typeHolder = makeComplexElement("div", []);    
    const typeIcon = makeComplexElement("img",
        [size === "big" ? "weather-icon-big" : "weather-icon-small"],
        `../src/icons/${type.icon}.svg`);
    typeHolder.appendChild(typeIcon);
    return typeHolder;
}

const createCurrent = (report) => {
    const inner = makeComplexElement("div", ["current-inner"]);
    const place = makeComplexElement("div", ["placename"], report.name);
    const country = makeComplexElement("div", ["country"],
        new Intl.DisplayNames(["en"], { type: "region"}).of(report.country));

    const weather = document.createElement("div");
    weather.classList.add("weather")
    weather.append(makeComplexElement("div", [], units.getTemp(report.current.temp)),
        makeWindArrow(report.current.wind_speed, report.current.wind_deg, "big"),
        makeTypeHolder(report.current.weather[0], "big")
        );

    inner.append(place, country, weather);

    const outer = document.querySelector(".current-outer");
    outer.replaceChildren(inner);
}

const createHourly = (hourly) => {
    const outer = document.querySelector(".hourly-outer");
    outer.replaceChildren();
    outer.textContent = "Next 24 hours"

    const inner = makeComplexElement("div", ["hourly-inner"]);
    for (let i = 1; i < 25; i++) {
        const hour = hourly[i];
        const hourHolder = makeComplexElement("div", ["small-holder"]);
        hourHolder.append(
            makeComplexElement("div", [], units.getTime(hour.dt)),
            makeTypeHolder(hour.weather[0], "small"),
            makeComplexElement("div", [], units.getTemp(hour.temp)),
            makeWindArrow(hour.wind_speed, hour.wind_deg, "small")
        );
        inner.append(hourHolder);
    }
    outer.appendChild(inner);
}

const createDaily = (daily) => {
    const outer = document.querySelector(".daily-outer");
    outer.replaceChildren();
    outer.textContent = "Next 7 days"

    const inner = makeComplexElement("div", ["daily-inner"]);

    for (let i = 1; i < 8; i++) {
        const day = daily[i];
        const dayHolder = makeComplexElement("div", ["small-holder"]);

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


const displayReport = (report) => {
    createCurrent(report);
    createHourly(report.hourly);
    createDaily(report.daily);
}

export { displayReport }