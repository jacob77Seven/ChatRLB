// --- Demo: hard-coded verse suggestions ---
// (kept as reference; live demo data is inside Study Mode section below)
// /*const DEMO_VERSES = [ ... ] */

// keep globals that your CSS/HTML rely on
const main  = document.getElementsByTagName("main")[0];
const body  = document.getElementsByTagName("body")[0];

// Avoid clobbering window.history
const chatHistory = JSON.parse(localStorage.getItem('history')) || [];
function saveChatHistory(){ localStorage.setItem('history', JSON.stringify(chatHistory)); }

// keep your global font size var used by addHistoryMessage/appendMessage
let scaledChatFontSize = 16; 

// small helpers
const $id  = (x) => document.getElementById(x);
const $one = (sel) => document.querySelector(sel);

// central cache/state (non-invasive)
const App = {
  el: {},
  state: {
    isSidebarOpen: true,
    hasChattedOnce: false,
    ttsOn: false,
  }
};

/* =========================================================================
   DOMContentLoaded – single entry point that calls feature inits
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initCacheEls();

  // Sidebar + responsive
  initSidebar();

  // settings button
  initSettingsButton();

  // appearance button under settings
  initAppearanceButton();

  // dark / light / high contrast modes
  initThemes();

  // font size button under settings
  initFontSizeButton();
  initFontScaling(); //Customize text size

  // New Chat button
  initNewChat();

  // ---- SAFE CHAT WIRING ----
  initChatWiring();

  // Welcome typing effect
  initWelcomeTyping();

  //about RLB button
  initAboutPopup();

  // loading chat history as soon as the browser loads
  initHistoryBoot();

  // ============ TTS: Assistant-only reader ============
  initTTS();

  // ================== STT (Web Speech API, no models) ==================
  initSTT();

  // ---------- Study Mode ----------
  initStudyModeNotesPanel();
});

/* =========================================================================
   Element cache (query once)
   ========================================================================= */
function initCacheEls(){
  App.el.aside          = document.getElementsByTagName("aside")[0];
  App.el.toggleBtn      = $id("toggle-sidebar");

  App.el.settingsBtn    = $id('settings-btn');
  App.el.settingsPopup  = document.getElementsByClassName("settings-popup")[0];

  App.el.appearanceBtn  = $id('chat-appearance');
  App.el.appearancePopup= $id("appearance-popup");
  App.el.closeAppearance= $id("close-appearance");

  App.el.darkModeBox    = $id("dark-mode");
  App.el.lightModeBox   = $id("light-mode");
  App.el.contrastModeBox= $id("high-contrast-mode");
  App.el.root           = document.querySelector(':root');
  App.el.logoImg        = document.getElementsByTagName("img")[0];
  App.el.profileBox     = document.getElementsByClassName("profile-icon")[0];
  App.el.logoBox        = document.getElementsByClassName("logo-container")[0];
  App.el.formBox        = $id("chat-form");
  App.el.formInput      = $id("chat-input");

  App.el.sizeBtn        = $id('font-size');
  App.el.fontSizePopup  = $id('textsize-popup');
  App.el.closeSizeBtn   = $id("close-textsize");
  App.el.range          = $id("size-input");

  App.el.newChatBtn     = $id("new-chat-btn");
  App.el.messagesEl     = $id("chat-messages");
  App.el.inputEl        = $id("chat-input");
  App.el.welcomeEl      = $id("welcome-text");
  App.el.chatForm       = $id("chat-form");

  App.el.histPlaceholder= $id("hist-placeholder");
  App.el.chatHistorySec = $id("chat-history");

  App.el.histMenu = $id("edit-history");
  App.el.histClose = $id("history-close");
  App.el.renameBtn = $id("history-rename");
  App.el.deleteBtn = $id("history-delete");

  App.el.aboutLink      = $id('about-link');
  App.el.aboutPopup     = $id('aboutPopup');
  App.el.aboutClose     = $id('popup-close');

  // Study mode / notes panel
  App.el.studyBtn       = $id('study-toggle');
  App.el.studyBar       = $id('study-bar');
  App.el.notesPanel     = $id('notes-panel');
  App.el.notesClose     = $id('notes-close');
  App.el.notesRef       = $id('notes-ref');
  App.el.notesText      = $id('notes-text');
  App.el.notesPoints    = $id('notes-points');

  // TTS / STT buttons (already in HTML)
  App.el.ttsBtn         = $id("tts-btn");
  App.el.sttBtn         = $id("stt-mic-btn");
}

/* =========================================================================
   Sidebar (with responsive media query)
   ========================================================================= */
function initSidebar(){
  const aside = App.el.aside, toggleBtn = App.el.toggleBtn;
  if (!aside || !toggleBtn) return;

  function apply(open){
    App.state.isSidebarOpen = open;
    aside.style.left = open ? "-0px" : "-260px";
    toggleBtn.style.left = open ? "200px" : "10px";
    toggleBtn.classList.toggle("fa-window-maximize", open);
    toggleBtn.classList.toggle("fa-bars", !open);
    if (main) main.style.marginLeft = open ? "260px" : "0px";
  }

  toggleBtn.addEventListener('click', () => apply(!App.state.isSidebarOpen));

  /* can make function look nicer later */
  function changeMediaQuery(mediaQuery) {
    // mobile (<=700): hide; desktop: show
    apply(!mediaQuery.matches);
  }
  let mediaQuery = window.matchMedia("(max-width: 700px)");
  changeMediaQuery(mediaQuery);
  mediaQuery.addEventListener("change", function() { changeMediaQuery(mediaQuery); });
}

/* =========================================================================
   // settings button
   ========================================================================= */
let settingsClicked = false; // track settings popup state
function initSettingsButton(){
  const settingsBtn = App.el.settingsBtn, settingsPopup = App.el.settingsPopup;
  const appearancePopup = App.el.appearancePopup;
  const fontSizePopup = App.el.fontSizePopup;
  if (!settingsBtn || !settingsPopup || !appearancePopup || !fontSizePopup) return;

  settingsBtn.addEventListener('mouseover', () => {
    settingsBtn.style.backgroundColor = "var(--mainColor)";
  });

  settingsBtn.addEventListener('mouseout', () => {
    if (!settingsClicked) settingsBtn.style.backgroundColor = "var(--buttonColor)";
  });

  settingsBtn.addEventListener('click', function() {
    settingsClicked = !settingsClicked;
    if (settingsClicked) {
      settingsBtn.style.backgroundColor = "var(--mainColor)";
      settingsPopup.style.opacity = "1";
      document.addEventListener("click", shouldCloseSettings);
    } else {
      closeSettings();
    }
  });

  function shouldCloseSettings(e) {
    if (!settingsPopup.contains(e.target) && !settingsBtn.contains(e.target) && !appearancePopup.contains(e.target) && !fontSizePopup.contains(e.target)){
      settingsClicked = false;
      closeSettings();
    }
  };

  function closeSettings() {
    settingsBtn.style.backgroundColor = "var(--buttonColor)";
    settingsPopup.style.opacity = "0";
    document.removeEventListener("click", shouldCloseSettings);
  };
};

/* =========================================================================
   // appearance button under settings
   ========================================================================= */
let appearanceClicked = false;
function initAppearanceButton(){
  const appearanceBtn = App.el.appearanceBtn;
  const appearancePopup = App.el.appearancePopup;
  const closeAppearanceBtn = App.el.closeAppearance;
  if (!appearanceBtn || !appearancePopup || !closeAppearanceBtn) return;

  appearanceBtn.addEventListener('mouseover', () => {
    if (settingsClicked) appearanceBtn.style.backgroundColor = "var(--mainColor)";
  });
  appearanceBtn.addEventListener('mouseout', () => {
    if (settingsClicked && !appearanceClicked) appearanceBtn.style.backgroundColor = "var(--buttonColor)";
  });

  function handleClick(event) {
    const lightModeBox = App.el.lightModeBox;
    if (lightModeBox) lightModeBox.focus();
    if (event.key === "Enter") {
      handleAppearance();
    }
  }

  appearanceBtn.addEventListener("click", handleAppearance);
  function handleAppearance() {
    if (!settingsClicked) return;
    appearanceClicked = !appearanceClicked;

    if (appearanceClicked) {
      appearanceBtn.style.backgroundColor = "var(--mainColor)";
      appearancePopup.style.opacity = 1; // make appearance pop-up show up
      appearancePopup.style.pointerEvents = "all"; // you can click on the buttons again
      document.addEventListener("keydown", handleClick);
      document.addEventListener("click", shouldCloseAppearance); // close automatically if you click out of popup
    } else {
      appearanceBtn.style.backgroundColor = "var(--buttonColor)";
      appearanceClicked = !appearanceClicked; // this sets the appearanceClicked tracking variable to be right again
      if (App.el.lightModeBox) App.el.lightModeBox.blur();
      if (App.el.darkModeBox) App.el.darkModeBox.blur();
      if (App.el.contrastModeBox) App.el.contrastModeBox.blur();
      closeAppearance();
    }
  }

  function shouldCloseAppearance(e) {
    if(!appearancePopup || !appearanceBtn) return;
    if(!appearancePopup.contains(e.target) && !appearanceBtn.contains(e.target)) closeAppearance();
  };

  closeAppearanceBtn.addEventListener('click', closeAppearance);
  function closeAppearance() {
    const settingsPopup = App.el.settingsPopup;
    appearancePopup.style.opacity = 0; // make popup close
    appearancePopup.style.pointerEvents = "none";
    appearanceClicked = !(appearanceClicked); // unclick appearance button
    appearanceBtn.style.backgroundColor = "var(--buttonColor)"; 
    App.el.settingsBtn.style.backgroundColor = "var(--buttonColor)";
    if (settingsPopup) settingsPopup.style.opacity = "0";
    settingsClicked = false;
    document.removeEventListener("keydown", handleClick);
    document.removeEventListener("click", shouldCloseAppearance);
  }
}

/* =========================================================================
   // dark mode / light mode / high contrast mode
   ========================================================================= */
function initThemes(){
  const darkModeBox = App.el.darkModeBox;
  const lightModeBox = App.el.lightModeBox;
  const contrastModeBox = App.el.contrastModeBox;

  const root = App.el.root;
  const aside2 = App.el.aside;
  const logoImg = App.el.logoImg;
  const profileBox = App.el.profileBox;
  const logoBox = App.el.logoBox;
  const formBox = App.el.formBox;
  const formInput = App.el.formInput;

  if (darkModeBox) darkModeBox.addEventListener("change", () => {
    if (!darkModeBox.checked) return;
    root.style.setProperty('--interfaceColor', '#343541');
    root.style.setProperty('--asideColor', '#202123');
    root.style.setProperty('--textColor', 'rgb(209, 213, 219)');
    root.style.setProperty('--borderColor', 'hsla(0,0%,100%,.2)');
    root.style.setProperty('--buttonColor', '#40414f');
    root.style.setProperty('--headingColor', 'rgb(255,255,255)');
    root.style.setProperty('--mainColor', 'var(--brand-blue)');
    if (profileBox) profileBox.style.border = '1px solid var(--borderColor)';
    if (logoImg) logoImg.style.filter = 'brightness(1) invert(0)'; // default for image
    if (logoBox){ logoBox.style.backgroundColor = 'rgb(60, 60, 73)'; logoBox.style.borderBottom = 'none'; }
    if (aside2) aside2.style.borderRight = 'none';
    if (formBox){ formBox.style.backgroundColor = 'rgb(71, 72, 87)'; formBox.style.border = 'none'; }
    if (formInput) formInput.style.color = 'white';

    root.style.setProperty('--backgroundColorUser', 'var(--brand-red)');
    root.style.setProperty('--ColorUser', 'white');
    root.style.setProperty('--borderUser', 'none');

    root.style.setProperty('--backgroundColorBot', '#2D5D5D');
    root.style.setProperty('--ColorBot', 'white');
    root.style.setProperty('--borderBot', 'none');
  });

  if (lightModeBox) lightModeBox.addEventListener("change", () => {
    if (!lightModeBox.checked) return;
    root.style.setProperty('--interfaceColor', 'rgb(255,255,255)');
    root.style.setProperty('--asideColor', '#d4c6b4');
    root.style.setProperty('--textColor', '#1a1a1a');
    root.style.setProperty('--borderColor', 'rgba(0,0,0,0.2)');
    root.style.setProperty('--buttonColor', '#f0f0f0');
    root.style.setProperty('--headingColor', '#000000');
    root.style.setProperty('--mainColor', 'var(--brand-blue)');
    if (profileBox) profileBox.style.border = 'none';
    if (logoImg) logoImg.style.filter = 'brightness(1) invert(0)'; // default for image
    if (logoBox){ logoBox.style.borderBottom = 'none'; logoBox.style.backgroundColor = '#d4c6b4'; }
    if (aside2) aside2.style.borderRight = 'none';
    if (formBox){ formBox.style.backgroundColor = '#d4c6b4'; formBox.style.border = 'none'; }
    if (formInput) formInput.style.color = 'var(--brand-red)';

    root.style.setProperty('--backgroundColorUser', 'var(--brand-red)');
    root.style.setProperty('--ColorUser', 'white');
    root.style.setProperty('--borderUser', 'none');

    root.style.setProperty('--backgroundColorBot', 'var(--brand-blue)');
    root.style.setProperty('--ColorBot', 'white');
    root.style.setProperty('--borderBot', 'none');
  });

  if (contrastModeBox) contrastModeBox.addEventListener("change", () => {
    if (!contrastModeBox.checked) return;
    root.style.setProperty('--interfaceColor', 'black');
    root.style.setProperty('--asideColor', 'black');
    root.style.setProperty('--textColor', 'white');
    root.style.setProperty('--borderColor', 'white');
    root.style.setProperty('--buttonColor', 'black');
    root.style.setProperty('--headingColor', 'white');
    root.style.setProperty('--mainColor', '#343541');
    if (profileBox) profileBox.style.border = '1px solid var(--borderColor)'; // put border around profile icon
    if (logoImg) logoImg.style.filter = 'brightness(0) invert(1)'; // turns image white
    if (logoBox){ logoBox.style.borderBottom = '1px solid var(--borderColor)'; logoBox.style.backgroundColor = 'black'; }
    if (aside2) aside2.style.borderRight = '1px solid var(--borderColor)';
    if (formBox){ formBox.style.backgroundColor = 'black'; formBox.style.border = '1px solid var(--borderColor)'; }
    if (formInput) formInput.style.color = 'white';

    // for chat messages
    root.style.setProperty('--backgroundColorUser', 'black');
    root.style.setProperty('--ColorUser', '#F16F7C');
    root.style.setProperty('--borderUser', '1px solid #F16F7C');

    root.style.setProperty('--backgroundColorBot', 'black');
    root.style.setProperty('--ColorBot', 'var(--brand-blue)');
    root.style.setProperty('--borderBot', '1px solid var(--brand-blue)');
  });
}

/* =========================================================================
   // font size button under settings
   ========================================================================= */
let sizeClicked = false;
function initFontSizeButton(){
  const sizeBtn = App.el.sizeBtn;
  const fontSizePopup = App.el.fontSizePopup;
  const closeSizeBtn = App.el.closeSizeBtn;
  if (!sizeBtn || !fontSizePopup || !closeSizeBtn) return;

  sizeBtn.addEventListener('mouseover', () => {
    if (settingsClicked) sizeBtn.style.backgroundColor = "var(--mainColor)";
  });
  sizeBtn.addEventListener('mouseout', () => {
    if (settingsClicked && !sizeClicked) sizeBtn.style.backgroundColor = "var(--buttonColor)";
  });

  function handleFontClick(event) {
    const range = App.el.range;
    if (range) range.focus();
    if (event.key === "Enter") {
      handleTextSize();
    }
  }

  sizeBtn.addEventListener("click", handleTextSize);
  function handleTextSize() {
    if (!settingsClicked) return;
    sizeClicked = !sizeClicked;

    if (sizeClicked) {
      sizeBtn.style.backgroundColor = "var(--mainColor)";
      fontSizePopup.style.opacity = 1; // make pop-up show up
      fontSizePopup.style.pointerEvents = "all"; // you can click on the buttons again
      document.addEventListener("keydown", handleFontClick);
      document.addEventListener("click", shouldCloseFontSize); // close automatically if you click outside popup
    } else {
      sizeBtn.style.backgroundColor = "var(--buttonColor)";
      sizeClicked = !sizeClicked; // fixes the sizeClicked variable to show correctly
      if (App.el.range) App.el.range.blur();
      closeSize();
    }
  }

  function shouldCloseFontSize(e) {
    if (!fontSizePopup || !sizeBtn) return;
    if (!fontSizePopup.contains(e.target) && !sizeBtn.contains(e.target)) closeSize();
  };

  closeSizeBtn.addEventListener("click", closeSize);
  function closeSize() {
    const settingsPopup = App.el.settingsPopup;
    fontSizePopup.style.opacity = 0; // make popup close
    fontSizePopup.style.pointerEvents = "none";
    sizeClicked = !(sizeClicked); // unclick size button
    sizeBtn.style.backgroundColor = "var(--buttonColor)"; 
    App.el.settingsBtn.style.backgroundColor = "var(--buttonColor)";
    if (settingsPopup) settingsPopup.style.opacity = "0";
    settingsClicked = false;
    document.removeEventListener("keydown", handleFontClick);
    document.removeEventListener("click", shouldCloseFontSize);
  }
}

/* =========================================================================
   //Customize text size
   // the scale function is: num * (scalefactor)^index
   ========================================================================= */
function scaleFunction (num, scalefactor, index)  {
  return num * (scalefactor ** index)
}
function initFontScaling(){
  const range = App.el.range;
  if (!range) return;
  range.addEventListener("input", () => {
    let index = Number(range.value || 0);
    const chatMessageSize = 15; // what user and bot chat messages are set to in the CSS
    const inputMessageSize = 16; // what the chat input message is set to in the CSS
    const scalefactor = 1.15;
    let userChatMsgs = document.querySelectorAll(".chat-message.user");
    let chatBoxMsgs = document.querySelectorAll(".chat-message.bot");
    let userInputMsg = document.querySelector("#chat-input");

    // handle input box first
    if (userInputMsg) {
      userInputMsg.style.fontSize = scaleFunction(inputMessageSize, scalefactor, index) + "px";
    }

    // handle chat messages next if they exist
    scaledChatFontSize = scaleFunction(chatMessageSize, scalefactor, index);
    userChatMsgs.forEach(function(userResponse){
      userResponse.style.fontSize = scaledChatFontSize + "px";
    });
    chatBoxMsgs.forEach(function(chatResponse){
      chatResponse.style.fontSize = scaledChatFontSize + "px";
    });
  });
}

/* =========================================================================
   New Chat button
   ========================================================================= */
function initNewChat(){
  const newChatBtn = App.el.newChatBtn;
  const messagesEl = App.el.messagesEl;
  const inputEl    = App.el.inputEl;
  const welcomeEl  = App.el.welcomeEl;

  if (!newChatBtn || !messagesEl || !inputEl) return;

  newChatBtn.addEventListener("click", () => {
    // Clear current messages only
    messagesEl.innerHTML = "";

    // Show the welcome text again if you want (or keep it hidden)
    if (welcomeEl) {
      welcomeEl.style.display = "block";
      welcomeEl.textContent = ""; // reset typing text
      // re-run the typing effect if desired:
      let i = 0; const msg = "Welcome to ChatRLB!";
      (function step(){
        if (i < msg.length) { welcomeEl.textContent += msg.charAt(i++); setTimeout(step, 75); }
      })();
    }

    // Reset and focus input
    inputEl.value = "";
    inputEl.focus();

    // Ensure the messages panel is scrolled to bottom (empty state)
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Update global variable so that chat history still works when new chat button clicked
    App.state.hasChattedOnce = false;
  });
}

/* =========================================================================
   // ---- SAFE CHAT WIRING ----
   ========================================================================= */
function initChatWiring(){
  const chatContainer = App.el.messagesEl;
  const chatForm      = App.el.chatForm;
  const chatInput     = App.el.inputEl;

  if (!chatForm || !chatInput || !chatContainer) {
    console.warn("[chat] missing form/input/container");
    return;
  }

  // Allow Enter to submit (Shift+Enter = newline)
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.requestSubmit();
    }
  });

  // Prevent double-binding
  if (chatForm.dataset.bound === "1") return;
  chatForm.dataset.bound = "1";

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage("user", message, chatContainer);
    chatInput.value = "";

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
      const botText = data.reply || "No response";
      appendMessage("bot", botText, chatContainer);

      // --- history handling ---
      const messageSet = { question: message, chatResponse: botText };
      if (App.state.hasChattedOnce === false) {
        const chatHistoryEntry = extractMainIdea(botText);
        const chatHistoryDate  = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' });
        const historyObject = { keyword: chatHistoryEntry, date: chatHistoryDate, messages: [messageSet] };
        chatHistory.push(historyObject);
        saveChatHistory();
        const idx = chatHistory.length - 1;
        createHistory(chatHistory[idx].keyword, chatHistory[idx].date, idx);
        App.state.hasChattedOnce = true;
      } else {
        chatHistory[chatHistory.length - 1].messages.push(messageSet);
        saveChatHistory();
      }
    } catch (err) {
      appendMessage("bot", "⚠️ Error: Could not contact server.", chatContainer);
      console.warn("[chat] fetch error:", err);
    }
  });
}

/* =========================================================================
   Append message helper (fires TTS event for bot)
   ========================================================================= */
function appendMessage(sender, text, containerEl) {
  const container = containerEl || document.getElementById("chat-messages");
  if (!container) return;

  const welcome = document.querySelector("#welcome-text");
  if (welcome) welcome.style.display = "none";

  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.innerHTML = `<p>${text}</p>`;
  msg.style.fontSize = (typeof scaledChatFontSize !== "undefined" ? scaledChatFontSize : 16) + "px";
  container.appendChild(msg);

  container.scrollTop = container.scrollHeight;

  if (sender === "bot") {
    const event = new CustomEvent("assistant-appended", { detail: { text } });
    document.dispatchEvent(event);
  }
}

/* =========================================================================
   // CSRF helper
   ========================================================================= */
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

/* =========================================================================
   // Keyword extraction for history
   ========================================================================= */
function extractMainIdea(text) {
  const stopWords = new Set(["the","a","an","is","of","and","in","to","for","on","with","as","at","about","you","this","that","he","not","jesus","god"]);
  // parse text to get rid of html markdown first
  const parser = new DOMParser();
  const words = (parser.parseFromString(text || "", 'text/html').body.textContent.toLowerCase().match(/\b[a-zA-Z\'\’]+\b/g) || [])
    .filter(w => !stopWords.has(w));
  const counts = {};
  for (const w of words) counts[w] = (counts[w] || 0) + 1;
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  if (!top) return "Conversation";
  const word = top[0];
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* =========================================================================
   Welcome typing (original behavior)
   ========================================================================= */
function initWelcomeTyping(){
  const welcomeText = $id("welcome-text");
  if (!welcomeText) return;
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
}

/* =========================================================================
   //about RLB button
   ========================================================================= */
function initAboutPopup(){
  const aboutLink = App.el.aboutLink;
  const popup = App.el.aboutPopup;
  const closePopup = App.el.aboutClose;
  if (!aboutLink || !popup || !closePopup) return;

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
}

/* =========================================================================
   // creates history entry in sidebar and sets event listener to load the messages in that history entry
   ========================================================================= */
function createHistory(keyword, date, index) {
  let histPlaceHolder = document.getElementById("hist-placeholder");
  const host = App.el.chatHistorySec || histPlaceHolder?.parentElement || $one("aside") || document.body;

  if (histPlaceHolder) histPlaceHolder.style.display = "none";
  const newHist = document.createElement('span');
  const keywordT = document.createElement('p');
  keywordT.textContent = `${keyword || "Conversation"}`;
  keywordT.classList.add('hist-kw');
  const histLeftSpan = document.createElement('span');
  histLeftSpan.classList.add('hist-left-span');
  const keywordD = document.createElement('p');
  keywordD.textContent = `${date || ""}`;
  const histIconCircle = document.createElement('div');
  const histIcon = document.createElement('i');
  histIcon.classList.add('fa-solid');
  histIcon.classList.add('fa-ellipsis-vertical');
  histIconCircle.classList.add('hist-icon-circle');
  histIconCircle.appendChild(histIcon);
  histLeftSpan.appendChild(keywordD);
  histLeftSpan.appendChild(histIconCircle);
  newHist.classList.add('history-entry');
  newHist.appendChild(keywordT);
  newHist.appendChild(histLeftSpan);

  if (histPlaceHolder) {
    histPlaceHolder.insertAdjacentElement("afterend", newHist); // add most recent to top
  } else {
    host.prepend(newHist);
  }

  newHist.addEventListener('mouseover', () => {
    newHist.style.backgroundColor= "var(--mainColor)";
    newHist.style.color = "var(--headingColor)";
  });

  newHist.addEventListener('mouseout', () => {
    newHist.style.backgroundColor = "var(--asideColor)";
    newHist.style.color = "var(--textColor)";
  });
  
  newHist.addEventListener("click", e => {
    if(notOpeningHistoryMenu(e)) loadHistory(index);
  });

  histIconCircle.addEventListener("click", e => {
    const targetEntry = e.target.closest('.history-entry');
    const targetKeyword = targetEntry.querySelector('.hist-kw');
    openHistMenu(e.clientY, index, targetKeyword);
  });
}

function openHistMenu(y, index, keyword) {
  const histMenu = App.el.histMenu;
  const histClose = App.el.histClose;
  const renameBtn = App.el.renameBtn;
  const deleteBtn = App.el.deleteBtn;
  if (!histMenu || !histClose || !renameBtn || !deleteBtn) return;
  histMenu.style.display = 'block';
  histMenu.style.top = `${y-15}px`;

  histClose.addEventListener("click", () => closeHist());

  document.addEventListener("click", e => {
    if (notOpeningHistoryMenu(e) && !histMenu.contains(e.target)) closeHist();
  });

  renameBtn.onclick = () => renameHist(index, keyword);

  deleteBtn.onclick = () => deleteHist(index);
};

function notOpeningHistoryMenu(e) {
  return (e.target.className != 'fa-solid fa-ellipsis-vertical' && e.target.className != 'hist-icon-circle');
};

function closeHist() {
  const histMenu = App.el.histMenu;
  if (histMenu) histMenu.style.display = 'none';
};

function renameHist(index, keyword) {
  keyword.contentEditable = 'true';
  keyword.focus();
  // create range and select entire content
  const keywordRangeEl = document.createRange();
  keywordRangeEl.selectNodeContents(keyword);
  // get selection object and apply new range
  const keywordSelection = window.getSelection();
  keywordSelection.removeAllRanges();
  keywordSelection.addRange(keywordRangeEl);

  keyword.addEventListener("keydown", e => {
    if (e.key === "Enter") keyword.blur()
  });

  keyword.addEventListener("blur", () => {
    keyword.contentEditable = 'false';
    chatHistory[index].keyword = keyword.textContent;
    saveChatHistory();
    closeHist();
  });
};

function deleteHist(index) {
  const historySection = App.el.chatHistorySec;
  const chatContainer = App.el.messagesEl;
  const welcomeText = App.el.welcomeEl;
  if (!historySection || !chatContainer) return;
  chatHistory.splice(index, 1); // removes the specified index
  saveChatHistory();

  // clear required sections before reloading history
  historySection.innerHTML = '';
  chatContainer.innerHTML = '';
  initHistoryBoot();

  // reset global variable so that history will work if user tries to enter question w/o clicking new chat btn
  App.state.hasChattedOnce = false;

  const histHr = document.createElement("hr"); // for line at top
  if (chatHistory.length === 0) {
    const histPlaceHolder = document.createElement('p');
    histPlaceHolder.textContent = "Start a new chat to begin...";
    histPlaceHolder.id = "hist-placeholder";
    historySection.insertAdjacentElement('afterbegin', histPlaceHolder);
  }
  historySection.insertAdjacentElement('afterbegin', histHr);

  // rerun welcome animation
  if (welcomeText){ 
    welcomeText.textContent = ''; // clear so it doesn't print same thing twice
    welcomeText.style.display = "block";
  }
  initWelcomeTyping();
  closeHist();
};

// loading chat history as soon as the browser loads
function initHistoryBoot(){
  for (let i=0; i<chatHistory.length; i++) {
    createHistory(chatHistory[i].keyword, chatHistory[i].date, i);
  }
}

// loading by index avoids bug if keywords have the same name
function loadHistory(index) {
  const chatContainer = document.getElementById("chat-messages");
  if (!chatContainer) return;
  // clear chat before history entry gets loaded
  chatContainer.innerHTML = '';
  // load each message in the history entry
  (chatHistory[index]?.messages || []).forEach(function (message){
    addHistoryMessage("user", message.question, chatContainer);
    addHistoryMessage("bot", message.chatResponse, chatContainer);
  });
};

// load the chat messages back
function addHistoryMessage(sender, text, container) {
  const welcome = document.querySelector("#welcome-text");

  if (welcome) welcome.style.display = "none";
  const msg = document.createElement("div");
  msg.classList.add("chat-message", sender);
  msg.innerHTML = `<p>${text}</p>`;
  msg.style.fontSize = scaledChatFontSize + "px";
  container.appendChild(msg);

  // Keep the newest message visible
  container.scrollTop = container.scrollHeight;
};

/* =========================================================================
   // ============ TTS: Assistant-only reader ============
   ========================================================================= */
function initTTS(){
  console.log("[tts] loaded");
  const synth = window.speechSynthesis || null;
  if (!synth) { console.warn("[tts] no window.speechSynthesis available"); return; }

  let ttsOn = false;
  function updateTtsBtn() {
    const btn = document.getElementById("tts-btn");
    if (!btn) return;
    btn.title = ttsOn ? "Reading: ON" : "Reading: OFF";
    btn.classList.toggle("is-on", ttsOn);
  }

  function ensureTtsBtn() {
    let btn = document.getElementById("tts-btn");
    if (!btn) {
      // attach to your chat form area
      const toolbar = document.getElementById("chat-form") || document.body;
      btn = document.createElement("button");
      btn.type = "button";
      btn.id = "tts-btn";
      btn.className = "icon-btn";
      btn.style.marginLeft = "8px";
      btn.innerHTML = '<i class="fa fa-volume-up"></i>';
      toolbar.appendChild(btn);
    }
    btn.addEventListener("click", () => {
      ttsOn = !ttsOn;
      try { if (!ttsOn && speechSynthesis.speaking) speechSynthesis.cancel(); } catch(e){}
      updateTtsBtn();
    });
    updateTtsBtn();
  }

  function speak(text) {
    if (!ttsOn || !text) return;
    try {
      if (synth.speaking) synth.cancel();
      const uttr = new SpeechSynthesisUtterance(text);
      synth.speak(uttr);
    } catch (e) {
      console.warn("[tts] speak error", e);
    }
  }

  // Listen for a custom event fired when a bot message is appended (see patch in appendMessage below)
  document.addEventListener("assistant-appended", (ev) => {
    const text = (ev.detail && ev.detail.text) ? String(ev.detail.text).trim() : "";
    if (text) speak(text);
  });

  ensureTtsBtn();
}

/* =========================================================================
   // ================== STT (Web Speech API, no models) ==================
   ========================================================================= */
function initSTT(){
  (function () {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    const form  = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    if (!form || !input) return;

    // Reuse an existing mic button if present; otherwise create one.
    let micBtn =
      document.getElementById("stt-mic-btn") ||
      document.getElementById("stt-btn") || // if you already had this id
      null;

    if (!micBtn) {
      const submitBtn = form.querySelector('button[type="submit"]') || form.lastElementChild;
      micBtn = document.createElement("button");
      micBtn.type = "button";
      micBtn.id = "stt-mic-btn";
      micBtn.className = "icon-btn";
      micBtn.title = "Speak";
      micBtn.style.marginLeft = "8px";
      micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      form.insertBefore(micBtn, submitBtn);
    }

    if (!SR) {
      micBtn.disabled = true;
      micBtn.title = "Speech recognition not supported (try Chrome/Edge/Safari)";
      micBtn.innerHTML = '<i class="fa-solid fa-ban"></i>';
      console.warn("[STT] Web Speech API not supported.");
      return;
    }

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;     // one utterance per click
    rec.interimResults = true;  // show live words in placeholder

    let listening = false;
    const originalPH = input.placeholder;

    function setMicUI(active) {
      listening = active;
      micBtn.classList.toggle("listening", active);
      micBtn.innerHTML = active
        ? '<i class="fa-solid fa-microphone-lines"></i>'
        : '<i class="fa-solid fa-microphone"></i>';
      micBtn.title = active ? "Listening…" : "Speak";
    }

    rec.onstart = () => {
      setMicUI(true);
      input.selectionStart = input.selectionEnd = input.value.length;
    };

    rec.onresult = (e) => {
      let interim = "", finalTxt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalTxt += t; else interim += t;
      }
      input.placeholder = interim || originalPH;

      if (finalTxt) {
        input.value = (input.value ? input.value.trim() + " " : "") + finalTxt.trim();
      }
    };

    rec.onerror = (e) => {
      console.warn("[STT] error:", e.error || e);
      input.placeholder = originalPH;
      setMicUI(false);
    };

    rec.onend = () => {
      input.placeholder = originalPH;
      setMicUI(false);
      if (input.value.trim()) form.requestSubmit();
    };

    micBtn.addEventListener("click", () => {
      if (!listening) {
        try { rec.start(); } catch (err) { console.warn("[STT] start error:", err); }
      } else {
        rec.stop();
      }
    });
  })();
}

/* =========================================================================
   // ---------- Study Mode ----------
   (Notes panel version)
   ========================================================================= */
function initStudyModeNotesPanel(){
  const studyBtn  = App.el.studyBtn;
  const bar       = App.el.studyBar;
  const panel     = App.el.notesPanel;
  const closeBtn  = App.el.notesClose;
  const refEl     = App.el.notesRef;
  const textEl    = App.el.notesText;
  const pointsEl  = App.el.notesPoints;

  if (!studyBtn || !bar || !panel || !closeBtn || !refEl || !textEl || !pointsEl) return;

  const DEMO_VERSES = [
    {
      ref: "John 3:3",
      text: "Jesus answered, 'Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God.'",
      notes: ["Spiritual rebirth is required to perceive God's kingdom.", "Context: Nicodemus."]
    },
    {
      ref: "Luke 11:1–4",
      text: "Jesus teaches the Lord’s Prayer as a model for prayer.",
      notes: ["Prioritizes God’s name and kingdom.", "Daily dependence, forgiveness, protection from temptation."]
    },
    {
      ref: "John 17:20–21",
      text: "Jesus prays for future believers to be one, so the world may believe.",
      notes: ["Unity among believers is a witness.", "From the High Priestly Prayer."]
    }
  ];

  function renderChips(verses = []) {
    const bar = document.getElementById('study-bar');
  bar.classList.remove('hidden');      // show slot
  bar.innerHTML = '';
  verses.forEach(v => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = v.ref;
    chip.addEventListener('click', () => openNotes(v));
    bar.appendChild(chip);
  });
  }

  function openNotes(verse) {
    refEl.textContent = verse.ref || '';
    textEl.textContent = verse.text || '';
    pointsEl.innerHTML = '';
    (verse.notes || []).forEach(n => {
      const li = document.createElement('li');
      li.textContent = n;
      pointsEl.appendChild(li);
    });
    panel.classList.remove('hidden');
    document.body.classList.add('with-notes');     // <-- enable split layout
    document.getElementById('notes-panel').classList.remove('hidden');
  }

  function closeNotes() {
    document.getElementById('notes-panel').classList.add('hidden');
    document.body.classList.remove('with-notes');
  }

  closeBtn.addEventListener('click', closeNotes);

  let studyOn = false;
  studyBtn.addEventListener('click', () => {
    studyOn = !studyOn;
    if (studyOn) {
      renderChips(DEMO_VERSES);
    } else {
      bar.innerHTML = '';
      bar.classList.add('hidden'); 
      closeNotes();
    }
  });

  // Optional: also show fresh chips after each user send (fake “AI suggestions”)
  const chatForm  = App.el.chatForm;
  if (chatForm) {
    chatForm.addEventListener('submit', () => {
      if (studyOn) {
        // For demo: re-render the same chips; later plug in real suggestions
        renderChips(DEMO_VERSES);
      }
    });
  }
}

