const handleError = (error) => {
    document.querySelector(".hourly-outer").replaceChildren();
    document.querySelector(".daily-outer").replaceChildren();

    const messageBox = document.querySelector(".current-outer");
    messageBox.replaceChildren();
    messageBox.classList.add("error");
    messageBox.textContent = "Sorry, there was a problem processing your request. Please try again.";
}


export { handleError }