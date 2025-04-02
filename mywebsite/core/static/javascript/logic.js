
let main = document.getElementsByTagName("main")[0];

document.addEventListener("DOMContentLoaded", function() {
    let aside = document.getElementsByTagName("aside")[0];
    let toggleBtn = document.getElementById("toggle-sidebar");

    let isSidebarOpen = true; // Track sidebar state

    toggleBtn.addEventListener('click', () => {
        if (isSidebarOpen) {
            aside.style.left = "-260px";  // Hide sidebar
            toggleBtn.style.left = "10px";  // Keep button on the left edge
            toggleBtn.classList.remove("fa-window-maximize");
            toggleBtn.classList.add("fa-bars"); // Change icon
            main.style.marginLeft = "0px"; // Adjust main content
        } else {
            aside.style.left = "0px"; // Show sidebar
            toggleBtn.style.left = "200px";  // Move button inside sidebar
            toggleBtn.classList.remove("fa-bars");
            toggleBtn.classList.add("fa-window-maximize"); // Change back
            main.style.marginLeft = "260px"; // Adjust main content
        }
        isSidebarOpen = !isSidebarOpen; // Toggle state
    });
});

// set main height here
let logo = document.getElementsByClassName("logo-container")[0];
const logoHeight = logo.offsetHeight;
let mainHeight = main.offsetHeight;
let newMainHeight = mainHeight - logoHeight;
main.style.setProperty('--box-height', newMainHeight + 'px');


let settingsRequested = true; // track settings popup state
document.getElementById('settings-btn').addEventListener('click', function() {
    let settingsPopup = document.getElementsByClassName("settings-popup")[0];

    if (settingsRequested) {
        settingsPopup.style.display = "flex";
    } else {
        settingsPopup.style.display = "none";
    }

    settingsRequested = !settingsRequested;
});


