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

/*
Changes:
2. Add error catching to location to check if place exists.
4. Error checking if takes too long to come back.
5. General error just if something else is thrown.

10. make my own svg icons.

13. Optional: add a ‘loading’ component that displays from the time the 
    form is submitted until the information comes back from the API.
*/