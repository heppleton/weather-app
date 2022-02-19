import { units } from "./units";

/*A simple code-reducing function for making common elements.*/
const makeComplexElement = (type, classes = [], text = "", attributes = {}) => {
    const newElement = document.createElement(type);

    newElement.classList.add(...classes);

    for(let key in attributes) {
        newElement.setAttribute(key, attributes[key]);
    }

    if (type === "img") {
        newElement.src = text;
    }
    else {
        newElement.textContent = text;
    }

    return newElement;
}

const makeWindArrow = (speed, degrees, size) => {
    const outer = makeComplexElement("div", ["wind-arrow-outer"],
        units.getSpeed(speed));
    const inner = makeComplexElement("div",
        ["wind-arrow-inner", size === "big" ? "wind-arrow-big" : "wind-arrow-small"]);
    const arrow = document.createElement("img")
    arrow.src = "../src/icons/windarrow.svg";
    arrow.style.setProperty("transform", `rotate(${degrees}deg)`);

    inner.appendChild(arrow);
    outer.appendChild(inner);
    return outer;
}

export { makeComplexElement, makeWindArrow }