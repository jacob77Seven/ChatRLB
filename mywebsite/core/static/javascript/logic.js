
let main = document.getElementsByTagName("main")[0];
let body = document.getElementsByTagName("body")[0];

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
//let logo = document.getElementsByClassName("logo-container")[0];
//const logoHeight = logo.offsetHeight;
//let mainHeight = main.offsetHeight;
//let newMainHeight = mainHeight - logoHeight;
//main.style.setProperty('--box-height', newMainHeight + 'px');

// settings button
let settingsClicked = false; // track settings popup state
let settingsBtn = document.getElementById('settings-btn');

settingsBtn.addEventListener('mouseover', () => {
    settingsBtn.style.backgroundColor = "var(--mainColor)";
    //console.log("settings mouseover")
});

settingsBtn.addEventListener('mouseout', () => {
    if (!settingsClicked) {
        settingsBtn.style.backgroundColor = "var(--buttonColor)";
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
        settingsBtn.style.backgroundColor = "var(--buttonColor)";
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
            appearanceBtn.style.backgroundColor = "var(--buttonColor)";
        }
    }
})

appearanceBtn.addEventListener('click', () => {
    if (settingsClicked) {
        appearanceClicked = !appearanceClicked;

        if (appearanceClicked) {
            appearanceBtn.style.backgroundColor = "var(--mainColor)";
            // add menu display here
            body.style.pointerEvents = "none"; // you cant click on anything else until you click the x button
            appearancePopup.style.opacity = 1; // make appearance pop-up show up
            appearancePopup.style.pointerEvents = "all"; // you can click on the buttons again
        } else {
            appearanceBtn.style.backgroundColor = "var(--buttonColor)";
        }
    }
})

let closeAppearanceBtn = document.getElementById("close-appearance");
closeAppearanceBtn.addEventListener('click', () => {
    let settingsPopup = document.getElementsByClassName("settings-popup")[0];

    appearancePopup.style.opacity = 0; // make popup close
    body.style.pointerEvents="all"; // now you can click on everything again
    appearancePopup.style.pointerEvents = "none";
    appearanceClicked = !(appearanceClicked); // unclick appearance button
    appearanceBtn.style.backgroundColor = "var(--buttonColor)"; 
    settingsBtn.style.backgroundColor = "var(--buttonColor)";
    settingsPopup.style.opacity = "0";
    settingsClicked = !settingsClicked;
})

// dark mode
let darkModeBox = document.getElementById("dark-mode");
let lightModeBox = document.getElementById("light-mode");
let contrastModeBox = document.getElementById("high-contrast-mode");
let root = document.querySelector(':root');
let aside2 = document.getElementsByTagName("aside")[0];
let logoImg = document.getElementsByTagName("img")[0];
let profileBox = document.getElementsByClassName("profile-icon")[0];
let logoBox = document.getElementsByClassName("logo-container")[0];
let formBox = document.getElementById("chat-form");
let formInput = document.getElementById("chat-input");

darkModeBox.addEventListener("change", () => {
    if (darkModeBox.checked) {
        root.style.setProperty('--interfaceColor', '#343541');
        root.style.setProperty('--asideColor', '#202123');
        root.style.setProperty('--textColor', 'rgb(209, 213, 219)');
        root.style.setProperty('--borderColor', 'hsla(0,0%,100%,.2)');
        root.style.setProperty('--buttonColor', '#40414f');
        root.style.setProperty('--headingColor', 'rgb(255,255,255)');
        root.style.setProperty('--mainColor', 'var(--brand-blue)');
        profileBox.style.border = 'none';
        logoImg.style.filter = 'brightness(1) invert(0)'; // default for image
        logoBox.style.backgroundColor = 'rgb(60, 60, 73)';
        logoBox.style.borderBottom = 'none';
        aside2.style.borderRight = 'none';
        formBox.style.backgroundColor = 'rgb(71, 72, 87)';
        formBox.style.border = 'none';
        formInput.style.color = 'white';

        root.style.setProperty('--backgroundColorUser', 'var(--brand-red)');
        root.style.setProperty('--ColorUser', 'white');
        root.style.setProperty('--borderUser', 'none');
 
        root.style.setProperty('--backgroundColorBot', 'var(--brand-blue)');
        root.style.setProperty('--ColorBot', 'white');
        root.style.setProperty('--borderBot', 'none');
    }
})

lightModeBox.addEventListener("change", () => {
    if (lightModeBox.checked) {
        //root.style.setProperty('--interfaceColor', 'rgb(126,114,114)');
        root.style.setProperty('--interfaceColor', 'rgb(255,255,255)');
        root.style.setProperty('--asideColor', '#d4c6b4');
        root.style.setProperty('--textColor', '#1a1a1a');
        root.style.setProperty('--borderColor', 'rgba(0,0,0,0.2)');
        root.style.setProperty('--buttonColor', '#f0f0f0');
        root.style.setProperty('--headingColor', '#000000');
        root.style.setProperty('--mainColor', 'var(--brand-blue)');
        profileBox.style.border = 'none';
        logoImg.style.filter = 'brightness(1) invert(0)'; // default for image
        logoBox.style.borderBottom = 'none';
        logoBox.style.backgroundColor = '#d4c6b4';
        aside2.style.borderRight = 'none';
        formBox.style.backgroundColor = '#d4c6b4';
        formBox.style.border = 'none';
        formInput.style.color = 'var(--brand-red)';
 
        root.style.setProperty('--backgroundColorUser', 'var(--brand-red)');
        root.style.setProperty('--ColorUser', 'white');
        root.style.setProperty('--borderUser', 'none');
 
        root.style.setProperty('--backgroundColorBot', 'var(--brand-blue)');
        root.style.setProperty('--ColorBot', 'white');
        root.style.setProperty('--borderBot', 'none');
    }
})

contrastModeBox.addEventListener("change", () => {
    if (contrastModeBox.checked) {
        root.style.setProperty('--interfaceColor', 'black');
        root.style.setProperty('--asideColor', 'black');
        root.style.setProperty('--textColor', 'white');
        root.style.setProperty('--borderColor', 'white');
        root.style.setProperty('--buttonColor', 'black');
        root.style.setProperty('--headingColor', 'white');
        root.style.setProperty('--mainColor', '#343541');
        profileBox.style.border = '1px solid var(--borderColor)'; // put border around profile icon
        logoImg.style.filter = 'brightness(0) invert(1)'; // turns image white
        logoBox.style.borderBottom = '1px solid var(--borderColor)'; 
        logoBox.style.backgroundColor = 'black';
        aside2.style.borderRight = '1px solid var(--borderColor)';
        formBox.style.backgroundColor = 'black';
        formBox.style.border = '1px solid var(--borderColor)';
        formInput.style.color = 'white';

        // for chat messages
        root.style.setProperty('--backgroundColorUser', 'black');
        root.style.setProperty('--ColorUser', 'var(--brand-red)');
        root.style.setProperty('--borderUser', '1px solid var(--brand-red)');

        root.style.setProperty('--backgroundColorBot', 'black');
        root.style.setProperty('--ColorBot', 'var(--brand-blue)');
        root.style.setProperty('--borderBot', '1px solid var(--brand-blue)');
    }
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
            sizeBtn.style.backgroundColor = "var(--buttonColor)";
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
            sizeBtn.style.backgroundColor = "var(--buttonColor)";
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
                <div class="new-chat-message">
                    <p>Welcome! Start your conversation...</p>
                </div>
                <div class="searchBox">
                    <form id="chat-form">
                        <textarea id="chat-input" rows="1" placeholder="What does Jesus say about..."></textarea>
                        <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            `;
            chatBox.style.width = "100%"; // this sets the width of the chatbox to the size of #inner block

            chatContainer.appendChild(chatBox); // Add to main chat area
            document.getElementById("chat-input").focus(); // Focus on input
        });
    } else {
        console.log(" New Chat button NOT found!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-messages"); // Where messages go
    const chatForm = document.getElementById("chat-form");           // The chat form
    const chatInput = document.getElementById("chat-input");         // Text input

    // Submit event for the chat form
    chatForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent page reload

        const message = chatInput.value.trim(); // Get user message
        if (!message) return;

        appendMessage("user", message); // Show user message
        chatInput.value = ""; // Clear input

        try {
            const response = await fetch("/chatbot/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken() // CSRF token for Django
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            appendMessage("bot", data.reply || "No response");
        } catch (err) {
            appendMessage("bot", "⚠️ Error: Could not contact server.");
        }
    });

    // Append message to chat box
    function appendMessage(sender, text) {
        const welcome = document.querySelector("#welcome-text");
        if (welcome) welcome.style.display = "none";
    
        const msg = document.createElement("div");
        msg.classList.add("chat-message", sender); // user or bot
        msg.innerHTML = `<p>${text}</p>`;
        chatContainer.appendChild(msg);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
    }

    // Read CSRF token from cookies (for Django security)
    function getCSRFToken() {
        let cookieValue = null;
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const trimmed = cookie.trim();
            if (trimmed.startsWith("csrftoken=")) {
                cookieValue = trimmed.substring("csrftoken=".length);
                break;
            }
        }
        return cookieValue;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const welcomeText = document.getElementById("welcome-text");
    const message = "Welcome to ChatRLB!";
    let index = 0;

    function typeNextChar() {
        if (index < message.length) {
            welcomeText.textContent += message.charAt(index);
            index++;
            setTimeout(typeNextChar, 75); // Speed in ms
        }
    }

    typeNextChar();
});

//about RLB button
document.addEventListener('DOMContentLoaded', function () {
    const aboutLink = document.getElementById('about-link');
    const popup = document.getElementById('aboutPopup');
    const closePopup = document.getElementById('popup-close');

    aboutLink.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent link jump
        popup.classList.remove('hidden'); // Show popup
    });

    closePopup.addEventListener('click', function () {
        popup.classList.add('hidden'); // Hide popup
    });

    // Close if click outside popup content
    window.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.classList.add('hidden');
        }
    });
});
