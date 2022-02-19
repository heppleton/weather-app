const units = (() => {
    const MS_TO_MPH = 2.2369362921;

    const getSpeed = (speed) => {
        return Math.round(speed * MS_TO_MPH);
    }

    const getTemp = (temp) => {
        const unitTemp = Math.round(temp - 273.15)
        return `${unitTemp}\u2103`;
    }

    const getTime = (time) => {
        const timeObject = new Date(time * 1000);
        const unitTime = timeObject.getHours();
        return `${unitTime}:00`;
    }

    return { getSpeed, getTemp, getTime }
})();

export { units }