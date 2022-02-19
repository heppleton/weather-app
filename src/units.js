const units = (() => {
    let chosenUnits = "metric";

    const CONVERSION = {
        "metric": {
            "speed" : 3.6,
            "temp" : temp => temp - 273.15,
            "symbol" : "\u2103"
        },
        "customary": {
            "speed" : 2.2369362921,
            "temp" : temp => 1.8 * (temp - 273.15) + 32,
            "symbol" : "\u2109"
        }
    }

    const getDay = (time) => {
        const timeObject = new Date(time * 1000);
        const unitDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(timeObject);
        return unitDay;
    }

    const getSpeed = (speed) => {
        return Math.round(speed * CONVERSION[chosenUnits]["speed"]);
    }

    const getTemp = (temp) => {
        const unitTemp = Math.round(CONVERSION[chosenUnits]["temp"](temp));
        return `${unitTemp}${CONVERSION[chosenUnits]["symbol"]}`;
    }

    const getTime = (time, timezone) => {
        const timeObject = new Date((time + timezone) * 1000);
        const unitTime = timeObject.getHours();
        return `${unitTime}:00`;
    }

    const toggleUnits = () => {
        if (chosenUnits === "metric") {
            chosenUnits = "customary";
        }
        else {
            chosenUnits = "metric";
        }
    }

    return { getDay, getSpeed, getTemp, getTime, toggleUnits }
})();

export { units }