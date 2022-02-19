"use strict";

import { newRequest } from "./retrieve.js"

newRequest("Malaga");

document.getElementById("search-button").addEventListener("click", () => {
    newRequest(document.getElementById("search-input").value);
})

/*
Changes:
2. Add error catching to location to check if place exists.
3. find picture for each weather id code?
4. Error checking if takes too long to come back.
5. General error just if something else is thrown.
6. create Units modules to automatically deal with temp, speed, hours, and days
8. separate little function to make wind arrow, so that it is perfect every time.
9. lookup table for backgrounds.
10. make my own svg icons.
11. ensure hours and days are offset correctly for the timezone.
12. make the search work!
13. Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API.
*/