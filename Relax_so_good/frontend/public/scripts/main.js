// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Homepage loaded!");

    // Example: Change the text after 3 seconds
    setTimeout(() => {
        document.querySelector("section p").textContent = "Enjoy browsing our website!";
    }, 3000);
});
