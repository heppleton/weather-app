"use strict";

import { newRequest } from "./retrieve.js"
import { displayReport } from "./report.js";
import { loadingMessage } from "./error.js";
import { units } from "./units.js"

newRequest("Portland");

document.getElementById("search-button").addEventListener("click", () => {
    const searchInput = document.getElementById("search-input");
    if (searchInput.value) {
        newRequest(searchInput.value);
    }
    searchInput.value = "";
})

document.getElementById("units-toggle").addEventListener("click", () => {
    units.toggleUnits();
    displayReport();
})