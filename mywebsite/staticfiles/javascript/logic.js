
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
                        <button type="button" id="tts-btn" class="icon-btn" title="Text-To-Speech"><i class="fa-solid fa-volume-high"></i></button>
                        <button type="button" id="stt-mic-btn" class="icon-btn" title="Speech-To-Text"><i class="fa-solid fa-microphone"></i></button>
                        <button type="submit" class="icon-btn send" title="Enter"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
            `;
            chatBox.style.width = "100%"; // this sets the width of the chatbox to the size of #inner block

            chatContainer.appendChild(chatBox); // Add to main chat area
            document.getElementById("chat-input").focus(); // Focus on input
            wireChatForm({
                form: document.getElementById('chat-form'),
                input: document.getElementById('chat-input'),
                container: document.getElementById('inner') || document.getElementById('chat-messages')
            });
            document.getElementById('chat-form')?.dataset.wired



        });
    } else {
        console.log(" New Chat button NOT found!");
    }
})

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const container =
    document.getElementById("chat-messages") ||
    document.getElementById("inner") ||
    (form && form.parentElement);

  if (form && input) {
    wireChatForm({ form, input, container });
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
  if (form.dataset.wired === "1") return;  // avoid double-binding
  form.dataset.wired = "1";

  const chatContainer =
    container ||
    document.getElementById("chat-messages") ||
    document.getElementById("inner") ||
    form.parentElement;

  // -- helpers inside the form scope --
  function appendMessage(sender, text) {
    const welcome = document.querySelector("#welcome-text");
    if (welcome) welcome.style.display = "none";
    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender);
    msg.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    if (sender === "bot") speak(text); // TTS on bot replies
  }

  function getCSRFToken() {
    let cookieValue = null;
    document.cookie.split(";").forEach((cookie) => {
      const t = cookie.trim();
      if (t.startsWith("csrftoken=")) cookieValue = t.substring("csrftoken=".length);
    });
    return cookieValue;
  }

  // --- Reuse existing buttons (from markup) or create if missing ---
  let ttsBtn = form.querySelector("#tts-btn");
  if (!ttsBtn) {
    ttsBtn = document.createElement("button");
    ttsBtn.type = "button";
    ttsBtn.id = "tts-btn";
    ttsBtn.className = "icon-btn";
    ttsBtn.title = "Voice replies";
    ttsBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }

  let micBtn = form.querySelector("#stt-mic-btn");
  if (!micBtn) {
    micBtn = document.createElement("button");
    micBtn.type = "button";
    micBtn.id = "stt-mic-btn";
    micBtn.className = "icon-btn";
    micBtn.title = "Speak";
    micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
  }

  // Place them just before the Send button (keeps layout neat)
  const submitBtn = form.querySelector('button[type="submit"]') || form.lastElementChild;
  if (ttsBtn.parentElement !== form) form.insertBefore(ttsBtn, submitBtn);
  if (micBtn.parentElement !== form) form.insertBefore(micBtn, submitBtn);


// --- 🔊 TTS (voice for AI replies) ---
let ttsEnabled = true;
const hasTTS = "speechSynthesis" in window;
if (!hasTTS) {
  ttsBtn.disabled = true;
  ttsBtn.title = "Voice not supported (try Chrome/Edge/Safari)";
  ttsBtn.innerHTML = '<i class="fa-solid fa-ban"></i>';
}

function speak(text) {
  if (!ttsEnabled || !hasTTS || !text) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 1; u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch (err) {
    console.warn("[TTS] speak() error:", err);
  }
}

// Toggle voice; when turning ON, read the most recent bot message immediately
ttsBtn.addEventListener("click", () => {
  ttsEnabled = !ttsEnabled;
  ttsBtn.innerHTML = ttsEnabled
    ? '<i class="fa-solid fa-volume-high"></i>'
    : '<i class="fa-solid fa-volume-xmark"></i>';
  console.log("[TTS] toggled:", ttsEnabled ? "ON" : "OFF");

  if (!ttsEnabled && hasTTS) window.speechSynthesis.cancel();
  if (ttsEnabled) {
    const scope = container || document.getElementById("chat-messages") || document.getElementById("inner") || document.body;
    const lastBot = Array.from(scope.querySelectorAll(".chat-message.bot")).pop();
    const text = lastBot?.textContent?.trim();
    if (text) speak(text);
  }
});

// Auto-speak future bot replies
const ttsObserver = new MutationObserver((mutations) => {
  if (!ttsEnabled) return;
  for (const m of mutations) {
    for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      if (n.classList?.contains("chat-message") && n.classList?.contains("bot")) {
        const text = n.textContent?.trim();
        if (text) speak(text);
      }
    }
  }
});
ttsObserver.observe(
  container || document.getElementById("chat-messages") || document.getElementById("inner") || document.body,
  { childList: true, subtree: true }
);



// --- 🎤 STT (speech input) ---
const hasSTT = ("SpeechRecognition" in window) || ("webkitSpeechRecognition" in window);
let recognition = null, listening = false;

if (hasSTT) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = true;

  function setMicUI(active) {
    listening = active;
    micBtn.classList.toggle("listening", active);
    micBtn.innerHTML = active
      ? '<i class="fa-solid fa-microphone-lines"></i>'
      : '<i class="fa-solid fa-microphone"></i>';
  }

  recognition.onstart = () => {
    console.log("[STT] recognition started");
    setMicUI(true);
  };

  recognition.onresult = (e) => {
    let interim = "", finalTxt = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalTxt += t; else interim += t;
    }
    input.setAttribute("data-ph", input.getAttribute("data-ph") || input.placeholder || "");
    input.placeholder = interim || input.getAttribute("data-ph");
    if (finalTxt) {
      input.value = input.value ? (input.value.trim() + " " + finalTxt.trim()) : finalTxt.trim();
    }
  };

  recognition.onerror = (e) => {
    console.warn("[STT] error:", e?.error || e);
    setMicUI(false);
  };

  recognition.onend = () => {
    console.log("[STT] recognition ended");
    input.placeholder = input.getAttribute("data-ph") || input.placeholder;
    setMicUI(false);
    if (input.value.trim()) form.requestSubmit();
  };

  micBtn.addEventListener("click", () => {
    console.log("[STT] mic clicked. Currently listening:", listening);
    if (!listening) recognition.start(); else recognition.stop();
  });
} else {
  micBtn.disabled = true;
  micBtn.title = "Speech recognition not supported (use Chrome, Edge, or Safari)";
  micBtn.innerHTML = '<i class="fa-solid fa-ban"></i>';
  console.warn("[STT] Not supported in this browser.");
}


  // --- Submit handler (single source of truth) ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendMessage("user", message);
    input.value = "";

    try {
      const response = await fetch("/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": getCSRFToken() },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      appendMessage("bot", data.reply || "No response");
    } catch (err) {
      appendMessage("bot", "⚠️ Error: Could not contact server.");
    }
  });
}






