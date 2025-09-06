
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
// ===== SAFE UI LISTENERS (guarded so script never crashes) =====

// SETTINGS BUTTON
let settingsClicked = false; // track settings popup state
const settingsBtn = document.getElementById('settings-btn');
if (settingsBtn) {
  settingsBtn.addEventListener('mouseover', () => {
    settingsBtn.style.backgroundColor = "var(--mainColor)";
  });

  settingsBtn.addEventListener('mouseout', () => {
    if (!settingsClicked) settingsBtn.style.backgroundColor = "#f0f0f0";
  });

  settingsBtn.addEventListener('click', function () {
    settingsClicked = !settingsClicked;
    const settingsPopup = document.getElementsByClassName("settings-popup")[0];
    if (settingsPopup) {
      if (settingsClicked) {
        settingsBtn.style.backgroundColor = "var(--mainColor)";
        settingsPopup.style.opacity = "1";
      } else {
        settingsBtn.style.backgroundColor = "#f0f0f0";
        settingsPopup.style.opacity = "0";
      }
    }
  });
}

// APPEARANCE MENU
let appearanceClicked = false;
const appearanceBtn = document.getElementById('chat-appearance');
const appearancePopup = document.getElementById("appearance-popup");
if (appearanceBtn && appearancePopup && settingsBtn) {
  appearanceBtn.addEventListener('mouseover', () => {
    if (settingsClicked) appearanceBtn.style.backgroundColor = "var(--mainColor)";
  });

  appearanceBtn.addEventListener('mouseout', () => {
    if (settingsClicked && !appearanceClicked) appearanceBtn.style.backgroundColor = "#f0f0f0";
  });

  appearanceBtn.addEventListener('click', () => {
    if (!settingsClicked) return;
    appearanceClicked = !appearanceClicked;

    if (appearanceClicked) {
      appearanceBtn.style.backgroundColor = "var(--mainColor)";
      document.body.style.pointerEvents = "none";
      appearancePopup.style.opacity = 1;
      appearancePopup.style.pointerEvents = "all";
    } else {
      appearanceBtn.style.backgroundColor = "#f0f0f0";
    }
  });

  const closeAppearanceBtn = document.getElementById("close-appearance");
  if (closeAppearanceBtn) {
    closeAppearanceBtn.addEventListener('click', () => {
      appearancePopup.style.opacity = 0;
      document.body.style.pointerEvents = "all";
      appearancePopup.style.pointerEvents = "none";
      appearanceClicked = false;
      appearanceBtn.style.backgroundColor = "#f0f0f0";
    });
  }
}

// THEME TOGGLES
const darkModeBox = document.getElementById("dark-mode");
const lightModeBox = document.getElementById("light-mode");
const contrastModeBox = document.getElementById("high-contrast-mode");
const root = document.querySelector(':root');
const aside2 = document.getElementsByTagName("aside")[0];

if (darkModeBox) {
  darkModeBox.addEventListener("change", () => {
    if (darkModeBox.checked) {
      root.style.setProperty('--interfaceColor', '#343541');
      root.style.setProperty('--asideColor', '#202123');
      root.style.setProperty('--textColor', 'rgb(209, 213, 219)');
      root.style.setProperty('--borderColor', 'hsla(0,0%,100%,.2)');
      if (aside2) aside2.borderRight = 'none';
    }
  });
}

if (lightModeBox) {
  lightModeBox.addEventListener("change", () => {
    if (lightModeBox.checked) {
      root.style.setProperty('--interfaceColor', 'rgb(255,255,255)');
      root.style.setProperty('--asideColor', '#d4c6b4');
      root.style.setProperty('--textColor', '#1a1a1a');
      root.style.setProperty('--borderColor', 'rgba(0,0,0,0.2)');
      if (aside2) aside2.style.borderRight = 'none';
    }
  });
}

if (contrastModeBox) {
  contrastModeBox.addEventListener("change", () => {
    if (contrastModeBox.checked) {
      root.style.setProperty('--interfaceColor', 'black');
      root.style.setProperty('--asideColor', 'black');
      root.style.setProperty('--textColor', 'yellow');
      root.style.setProperty('--borderColor', 'white');
      if (aside2) aside2.style.borderRight = "1px solid var(--borderColor)";
    }
  });
}

// FONT SIZE BUTTON
const sizeBtn = document.getElementById('font-size');
let sizeClicked = false;
if (sizeBtn && settingsBtn) {
  sizeBtn.addEventListener('mouseover', () => {
    if (settingsClicked) sizeBtn.style.backgroundColor = "var(--mainColor)";
  });
  sizeBtn.addEventListener('mouseout', () => {
    if (settingsClicked && !sizeClicked) sizeBtn.style.backgroundColor = "#f0f0f0";
  });
  sizeBtn.addEventListener('click', () => {
    if (!settingsClicked) return;
    sizeClicked = !sizeClicked;
    sizeBtn.style.backgroundColor = sizeClicked ? "var(--mainColor)" : "#f0f0f0";
  });
}


/*let settingsClicked = false; // track settings popup state
let settingsBtn = document.getElementById('settings-btn');

settingsBtn.addEventListener('mouseover', () => {
    settingsBtn.style.backgroundColor = "var(--mainColor)";
    //console.log("settings mouseover")
});

settingsBtn.addEventListener('mouseout', () => {
    if (!settingsClicked) {
        settingsBtn.style.backgroundColor = "#f0f0f0";
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
        settingsBtn.style.backgroundColor = "#f0f0f0";
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
            appearanceBtn.style.backgroundColor = "#f0f0f0";
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
            appearanceBtn.style.backgroundColor = "#f0f0f0";
        }
    }
})

let closeAppearanceBtn = document.getElementById("close-appearance");
closeAppearanceBtn.addEventListener('click', () => {
    appearancePopup.style.opacity = 0; // make popup close
    body.style.pointerEvents="all"; // now you can click on everything again
    appearancePopup.style.pointerEvents = "none";
    appearanceClicked = !(appearanceClicked); // unclick appearance button
    appearanceBtn.style.backgroundColor = "#f0f0f0"; 
})

// dark mode
let darkModeBox = document.getElementById("dark-mode");
let lightModeBox = document.getElementById("light-mode");
let contrastModeBox = document.getElementById("high-contrast-mode");
let root = document.querySelector(':root');
let aside2 = document.getElementsByTagName("aside")[0];

darkModeBox.addEventListener("change", () => {
    if (darkModeBox.checked) {
        root.style.setProperty('--interfaceColor', '#343541');
        root.style.setProperty('--asideColor', '#202123');
        root.style.setProperty('--textColor', 'rgb(209, 213, 219)');
        root.style.setProperty('--borderColor', 'hsla(0,0%,100%,.2)');
        aside2.borderRight = 'none';
    }
})

lightModeBox.addEventListener("change", () => {
    if (lightModeBox.checked) {
        //root.style.setProperty('--interfaceColor', 'rgb(126,114,114)');
        root.style.setProperty('--interfaceColor', 'rgb(255,255,255)');
        root.style.setProperty('--asideColor', '#d4c6b4');
        root.style.setProperty('--textColor', '#1a1a1a');
        root.style.setProperty('--borderColor', 'rgba(0,0,0,0.2)');
        aside2.style.borderRight = 'none';
    }
})

contrastModeBox.addEventListener("change", () => {
    if (contrastModeBox.checked) {
        root.style.setProperty('--interfaceColor', 'black');
        root.style.setProperty('--asideColor', 'black');
        root.style.setProperty('--textColor', 'yellow');
        root.style.setProperty('--borderColor', 'white');
        aside2.style.borderRight = "1px solid var(--borderColor)";
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
            sizeBtn.style.backgroundColor = "#f0f0f0";
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
            sizeBtn.style.backgroundColor = "#f0f0f0";
        }
    }
})
*/
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

                <!-- speaker (TTS) - placeholder, no JS yet -->
                    <button type="button" id="tts-btn" class="icon-btn" title="Voice replies">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>

                <!-- microphone (STT) - placeholder, no JS yet -->
                    <button type="button" id="stt-mic-btn" class="icon-btn" title="Speak">
                        <i class="fa-solid fa-microphone"></i>
                    </button>

                <!-- existing Send -->
                    <button type="submit" class="icon-btn send">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
            `;
            chatBox.style.width = "100%"; // this sets the width of the chatbox to the size of #inner block

            chatContainer.appendChild(chatBox); // Add to main chat area
            wireChatForm({
                form: document.getElementById("chat-form"),
                input: document.getElementById("chat-input"),
                container: chatContainer
                });

            document.getElementById("chat-input").focus(); // Focus on input

            wireChatForm({
                form: document.getElementById("chat-form"),
                input: document.getElementById("chat-input"),
                container: chatContainer // send/receive messages inside #inner for this view
                });

        });
    } else {
        console.log(" New Chat button NOT found!");
    }
})

document.addEventListener("DOMContentLoaded", function () {
  const existingForm = document.getElementById("chat-form");
  const existingInput = document.getElementById("chat-input");
  const preferredContainer =
    document.getElementById("chat-messages") ||
    document.getElementById("inner") ||
    (existingForm && existingForm.parentElement);

  if (existingForm && existingInput) {
    wireChatForm({
      form: existingForm,
      input: existingInput,
      container: preferredContainer
    });
  }
});


/*document.addEventListener("DOMContentLoaded", function () {
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
    }); */

    // Append message to chat box
    function appendMessage(sender, text) {
        const welcome = document.querySelector("welcome-text");
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

// --- CHAT WIRING + SPEECH-TO-TEXT + TEXT-TO-SPEECH ---
function wireChatForm({ form, input, container }) {
  if (!form || !input) return;
  if (form.dataset.wired === "1") return; // avoid double-binding
  form.dataset.wired = "1";

  // Where to append messages
  const chatContainer =
    container ||
    document.getElementById("chat-messages") ||
    document.getElementById("inner") ||
    form.parentElement;

  // Helper: append message bubble
  function appendMessage(sender, text) {
    const welcome = document.querySelector("welcome-text");
    if (welcome) welcome.style.display = "none";

    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender); // 'user' or 'bot'
    msg.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 🔊 Speak bot replies if enabled
    if (sender === "bot") speak(text);
  }

  // Helper: CSRF for Django
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

  // ---------- 🔊 Text-to-Speech (TTS) toggle ----------
  const ttsBtn = document.createElement("button");
  ttsBtn.type = "button";
  ttsBtn.id = "tts-btn";
  ttsBtn.title = "Toggle voice for AI replies";
  ttsBtn.style.marginLeft = "8px";
  ttsBtn.style.minWidth = "42px";
  ttsBtn.style.height = "42px";
  ttsBtn.style.borderRadius = "8px";
  ttsBtn.style.border = "1px solid var(--borderColor, rgba(0,0,0,0.2))";
  ttsBtn.style.cursor = "pointer";

  let ttsEnabled = true;              // default ON
  const hasTTS = "speechSynthesis" in window;
  ttsBtn.textContent = hasTTS ? "🔊" : "🚫";
  if (!hasTTS) ttsBtn.disabled = true;

  function speak(text) {
    if (!ttsEnabled || !hasTTS) return;
    try {
      window.speechSynthesis.cancel();  // stop anything already talking
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 1;    // tweak if you want faster/slower
      u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("TTS error:", e);
    }
  }

  ttsBtn.addEventListener("click", () => {
    ttsEnabled = !ttsEnabled;
    ttsBtn.textContent = ttsEnabled ? "🔊" : "🔇";
    if (!ttsEnabled && hasTTS) window.speechSynthesis.cancel();
  });

  // ---------- 🎤 Speech-to-Text (STT) mic ----------
  const micBtn = document.createElement("button");
  micBtn.type = "button";
  micBtn.id = "stt-mic-btn";
  micBtn.title = "Hold to talk (or click to toggle)";
  micBtn.style.marginLeft = "8px";
  micBtn.style.minWidth = "42px";
  micBtn.style.height = "42px";
  micBtn.style.borderRadius = "8px";
  micBtn.style.border = "1px solid var(--borderColor, rgba(0,0,0,0.2))";
  micBtn.style.cursor = "pointer";
  micBtn.textContent = "🎤";

  const hasSTT = ("SpeechRecognition" in window) || ("webkitSpeechRecognition" in window);
  let recognition = null;
  let listening = false;

  if (hasSTT) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;    // one utterance per start()
    recognition.interimResults = true; // show partials

    const setMicUI = (active) => {
      listening = active;
      micBtn.textContent = active ? "🎙️" : "🎤";
      micBtn.style.background = active ? "var(--mainColor, #dfe7ff)" : "";
    };

    recognition.onstart = () => setMicUI(true);

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += chunk;
        else interim += chunk;
      }

      // Show interim cue in placeholder (non-destructive)
      if (interim) {
        input.placeholder = interim;
      } else {
        input.placeholder = input.getAttribute("data-ph") || input.placeholder || "What does Jesus say about...";
      }

      // Commit final text into the input
      if (final) {
        input.value = input.value
          ? (input.value.trim() + " " + final.trim())
          : final.trim();
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error || e);
      setMicUI(false);
    };

    recognition.onend = () => {
      // Reset interim UI
      input.placeholder = input.getAttribute("data-ph") || input.placeholder || "What does Jesus say about...";
      setMicUI(false);

      // ✅ Auto-send after you stop speaking
      if (input.value.trim()) form.requestSubmit();
    };

    // Click = toggle; press & hold works too
    micBtn.addEventListener("click", () => {
      if (!listening) recognition.start();
      else recognition.stop();
    });
    micBtn.addEventListener("mousedown", () => {
      if (!listening) recognition.start();
    });
    micBtn.addEventListener("mouseup", () => {
      if (listening) recognition.stop();
    });
    micBtn.addEventListener("mouseleave", () => {
      if (listening) recognition.stop();
    });
    micBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (!listening) recognition.start();
    }, { passive: false });
    micBtn.addEventListener("touchend", () => {
      if (listening) recognition.stop();
    });
  } else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported by this browser";
    micBtn.textContent = "🚫";
  }

  // Add buttons to the form (order: Send, 🔊, 🎤). Change order if you prefer.
  form.appendChild(ttsBtn);
  form.appendChild(micBtn);
  // If you want mic before Send, use: form.insertBefore(micBtn, form.lastElementChild);

  // ---------- Submit handler (POST to /chatbot/) ----------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendMessage("user", message);
    input.value = "";

    try {
      const response = await fetch("/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      appendMessage("bot", data.reply || "No response");
    } catch (err) {
      appendMessage("bot", "⚠️ Error: Could not contact server.");
    }
  });
}

// --- CHAT WIRING + SPEECH-TO-TEXT + TEXT-TO-SPEECH ---
function wireChatForm({ form, input, container }) {
  if (!form || !input) return;
  if (form.dataset.wired === "1") return;
  form.dataset.wired = "1";

  const chatContainer =
    container ||
    document.getElementById("chat-messages") ||
    document.getElementById("inner") ||
    form.parentElement;

  function appendMessage(sender, text) {
    const welcome = document.querySelector("#welcome-text");
    if (welcome) welcome.style.display = "none";
    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender);
    msg.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    if (sender === "bot") speak(text);
  }

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

  // 🔊 TTS toggle
  const ttsBtn = document.createElement("button");
  ttsBtn.type = "button";
  ttsBtn.id = "tts-btn";
  ttsBtn.title = "Toggle voice for AI replies";
  ttsBtn.style.marginLeft = "8px";
  ttsBtn.style.minWidth = "42px";
  ttsBtn.style.height = "42px";
  ttsBtn.style.borderRadius = "8px";
  ttsBtn.style.border = "1px solid var(--borderColor, rgba(0,0,0,0.2))";
  ttsBtn.style.cursor = "pointer";

  let ttsEnabled = true;
  const hasTTS = "speechSynthesis" in window;
  ttsBtn.textContent = hasTTS ? "🔊" : "🚫";
  if (!hasTTS) ttsBtn.disabled = true;

  function speak(text) {
    if (!ttsEnabled || !hasTTS) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 1;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch {}
  }
  ttsBtn.addEventListener("click", () => {
    ttsEnabled = !ttsEnabled;
    ttsBtn.textContent = ttsEnabled ? "🔊" : "🔇";
    if (!ttsEnabled && hasTTS) window.speechSynthesis.cancel();
  });

  // 🎤 STT mic
  const micBtn = document.createElement("button");
  micBtn.type = "button";
  micBtn.id = "stt-mic-btn";
  micBtn.title = "Hold to talk (or click to toggle)";
  micBtn.style.marginLeft = "8px";
  micBtn.style.minWidth = "42px";
  micBtn.style.height = "42px";
  micBtn.style.borderRadius = "8px";
  micBtn.style.border = "1px solid var(--borderColor, rgba(0,0,0,0.2))";
  micBtn.style.cursor = "pointer";
  micBtn.textContent = "🎤";

  const hasSTT = ("SpeechRecognition" in window) || ("webkitSpeechRecognition" in window);
  let recognition = null, listening = false;

  if (hasSTT) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    const setMicUI = (active) => {
      listening = active;
      micBtn.textContent = active ? "🎙️" : "🎤";
      micBtn.style.background = active ? "var(--mainColor, #dfe7ff)" : "";
    };

    recognition.onstart = () => setMicUI(true);
    recognition.onresult = (e) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += chunk; else interim += chunk;
      }
      if (interim) {
        input.placeholder = interim;
      } else {
        input.placeholder = input.getAttribute("data-ph") || input.placeholder || "What does Jesus say about...";
      }
      if (final) {
        input.value = input.value ? (input.value.trim() + " " + final.trim()) : final.trim();
      }
    };
    recognition.onerror = () => setMicUI(false);
    recognition.onend = () => {
      input.placeholder = input.getAttribute("data-ph") || input.placeholder || "What does Jesus say about...";
      setMicUI(false);
      if (input.value.trim()) form.requestSubmit(); // auto-send after speaking
    };

    micBtn.addEventListener("click", () => (!listening ? recognition.start() : recognition.stop()));
    micBtn.addEventListener("mousedown", () => { if (!listening) recognition.start(); });
    micBtn.addEventListener("mouseup",   () => { if (listening)  recognition.stop(); });
    micBtn.addEventListener("mouseleave",() => { if (listening)  recognition.stop(); });
    micBtn.addEventListener("touchstart", (e) => { e.preventDefault(); if (!listening) recognition.start(); }, { passive:false });
    micBtn.addEventListener("touchend",   () => { if (listening) recognition.stop(); });
  } else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported by this browser";
    micBtn.textContent = "🚫";
  }

  // Add buttons after Send (change order if you want)
  form.appendChild(ttsBtn);
  form.appendChild(micBtn);

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    appendMessage("user", message);
    input.value = "";
    try {
      const r = await fetch("/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": getCSRFToken() },
        body: JSON.stringify({ message })
      });
      const data = await r.json();
      appendMessage("bot", data.reply || "No response");
    } catch {
      appendMessage("bot", "⚠️ Error: Could not contact server.");
    }
  });
}





