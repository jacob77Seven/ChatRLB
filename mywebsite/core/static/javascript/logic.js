
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

// settings button
let settingsClicked = false; // track settings popup state
let settingsBtn = document.getElementById('settings-btn');

settingsBtn.addEventListener('mouseover', () => {
    settingsBtn.style.backgroundColor = "var(--mainColor)";
    //console.log("settings mouseover")
});

settingsBtn.addEventListener('mouseout', () => {
    if (!settingsClicked) {
        settingsBtn.style.backgroundColor = "var(--asideColor)";
        //console.log("settings mouseout")
    }
});

settingsBtn.addEventListener('click', function() {
    settingsClicked = !settingsClicked;
    let settingsPopup = document.getElementsByClassName("settings-popup")[0];

    if (settingsClicked) {
        settingsBtn.style.backgroundColor = "var(--mainColor)";
        settingsPopup.style.opacity = "1";
    } else {
        settingsBtn.style.backgroundColor = "var(--asideColor)";
        settingsPopup.style.opacity = "0";
    }

});

// appearance button under settings
let appearanceClicked = false;
let appearanceBtn = document.getElementById('chat-appearance');
let appearancePopup = document.getElementById("appearance-popup");
appearanceBtn.addEventListener('mouseover', () => {
    if (settingsClicked) {
        appearanceBtn.style.backgroundColor = "var(--mainColor)";
    }
})

appearanceBtn.addEventListener('mouseout', () => {
    if (settingsClicked) {
        if (!appearanceClicked) {
            appearanceBtn.style.backgroundColor = "var(--asideColor)";
        }
    }
})

appearanceBtn.addEventListener('click', () => {
    if (settingsClicked) {
        appearanceClicked = !appearanceClicked;

        if (appearanceClicked) {
            appearanceBtn.style.backgroundColor = "var(--mainColor)";
            // add menu display here
            appearancePopup.style.opacity = 1; // make appearance pop-up show up
            appearancePopup.style.pointerEvents = "all"; // you can click on the buttons again
        } else {
            appearanceBtn.style.backgroundColor = "var(--asideColor)";
        }
    }
})

let closeAppearanceBtn = document.getElementById("close-appearance");
closeAppearanceBtn.addEventListener('click', () => {
    appearancePopup.style.opacity = 0; // make popup close
    appearancePopup.style.pointerEvents = "none";
    appearanceClicked = !(appearanceClicked); // unclick appearance button
    appearanceBtn.style.backgroundColor = "var(--asideColor)"; 
})

// font size button under settings
let sizeClicked = false;
let sizeBtn = document.getElementById('font-size');
sizeBtn.addEventListener('mouseover', () => {
    if (settingsClicked) {
        sizeBtn.style.backgroundColor = "var(--mainColor)";
    }
})

sizeBtn.addEventListener('mouseout', () => {
    if (settingsClicked) {
        if (!sizeClicked) {
            sizeBtn.style.backgroundColor = "var(--asideColor)";
        }
    }
})

sizeBtn.addEventListener('click', () => {
    if (settingsClicked) {
        sizeClicked = !sizeClicked;

        if (sizeClicked) {
            sizeBtn.style.backgroundColor = "var(--mainColor)";
            // add menu display here
        } else {
            sizeBtn.style.backgroundColor = "var(--asideColor)";
        }
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const newChatButton = document.getElementById("new-chat-btn"); // Select button by ID
    const chatContainer = document.getElementById("inner"); // Chat area

    if (newChatButton) {
        console.log(" New Chat button found!"); // Debugging

        newChatButton.addEventListener("click", function () {
            console.log(" New Chat button clicked!"); // Debugging when clicked

            // Clear previous chat
            chatContainer.innerHTML = "";

            // Create new chat interface
            const chatBox = document.createElement("div");
            chatBox.classList.add("chat-box");

            chatBox.innerHTML = `
                <div class="chat-message bot">
                    <p>Welcome! Start your conversation...</p>
                </div>
                <div class="searchBox">
                    <form id="chat-form">
                        <textarea id="chat-input" rows="1" placeholder="Type your message..."></textarea>
                        <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            `;

            chatContainer.appendChild(chatBox); // Add to main chat area
            document.getElementById("chat-input").focus(); // Focus on input
        });
    } else {
        console.log(" New Chat button NOT found!");
    }
});
