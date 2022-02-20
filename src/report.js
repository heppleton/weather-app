import { makeComplexElement, makeWindArrow } from "./helper";
import { units } from "./units";

let savedReport;

const makeTypeHolder = (type, size) => {
    const typeHolder = makeComplexElement("div", []);    
    const typeIcon = makeComplexElement("img",
        [size === "big" ? "weather-icon-big" : "weather-icon-small"],
        `./dist/icons/${type.icon}.svg`);
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

const createHourly = (hourly, timezone) => {
    const outer = document.querySelector(".hourly-outer");
    outer.replaceChildren();
    outer.textContent = "Next 24 hours"

    const inner = makeComplexElement("div", ["hourly-inner"]);
    for (let i = 1; i < 25; i++) {
        const hour = hourly[i];
        const hourHolder = makeComplexElement("div", ["small-holder"]);
        hourHolder.append(
            makeComplexElement("div", [], units.getTime(hour.dt, timezone)),
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
        dayHolder.append(
            makeComplexElement("div", [], units.getDay(day.dt)),
            makeTypeHolder(day.weather[0], "small"),
            makeComplexElement("div", [], units.getTemp(day.temp.max)),
            makeWindArrow(day.wind_speed, day.wind_deg, "small")
        );
        inner.append(dayHolder);
    }
    outer.appendChild(inner);
}

const displayReport = (report = savedReport) => {
    savedReport = report;
    createCurrent(report);
    createHourly(report.hourly, report.timezone_offset);
    createDaily(report.daily);
    document.documentElement.style.setProperty("--weather-image",
        `url("./images/${report.current.weather[0].icon}.jpg")`);
}

export { displayReport }