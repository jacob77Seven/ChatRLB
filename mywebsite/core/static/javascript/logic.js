// --- Demo: hard-coded verse suggestions ---
const DEMO_VERSES = [
  {
    ref: "John 3:3",
    text: "Jesus answered, “Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God.”",
    notes: [
      "Jesus speaks to Nicodemus about new birth.",
      "Introduces the theme of spiritual rebirth.",
    ]
  },
  {
    ref: "Luke 11:1-4",
    text: "The Lord’s Prayer: Jesus teaches how to pray.",
    notes: [
      "A model for prayer priorities (God’s name, kingdom, daily needs, forgiveness).",
    ]
  },
  {
    ref: "John 17:20-21",
    text: "Jesus prays for future believers to be one.",
    notes: [
      "Unity is a witness to the world.",
      "Prayer shows Jesus’ heart for the church.",
    ]
  }
];


let main = document.getElementsByTagName("main")[0];
let body = document.getElementsByTagName("body")[0];
const history = JSON.parse(localStorage.getItem('history')) || [];

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

    /* can make function look nicer later */
    function changeMediaQuery(mediaQuery) {
        if (mediaQuery.matches) {
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
        isSidebarOpen = !isSidebarOpen;
    }
    let mediaQuery = window.matchMedia("(max-width: 700px"); // create MediaQueryList object
    changeMediaQuery(mediaQuery); // call listener function at runtime
    // attach listener function on state changes
    mediaQuery.addEventListener("change", function() { 
        changeMediaQuery(mediaQuery);
    })

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

function handleClick(event) {
    lightModeBox.focus();
    //console.log("handleClick: " + event.key);
    if (event.key === "Enter") {
        handleAppearance();
    }
}

appearanceBtn.addEventListener("click", handleAppearance);
function handleAppearance() {
    if (settingsClicked) {
        appearanceClicked = !appearanceClicked;

        if (appearanceClicked) {
            appearanceBtn.style.backgroundColor = "var(--mainColor)";
            // add menu display here
            body.style.pointerEvents = "none"; // you cant click on anything else until you click the x button
            appearancePopup.style.opacity = 1; // make appearance pop-up show up
            appearancePopup.style.pointerEvents = "all"; // you can click on the buttons again
            document.addEventListener("keydown", handleClick);
        } else {
            appearanceBtn.style.backgroundColor = "var(--buttonColor)";
            appearanceClicked = !appearanceClicked; // this sets the appearanceClicked tracking variable to be right again
            lightModeBox.blur();
            darkModeBox.blur();
            contrastModeBox.blur();
            closeAppearance();
        }
    }
}

let closeAppearanceBtn = document.getElementById("close-appearance");
closeAppearanceBtn.addEventListener('click', closeAppearance);

function closeAppearance() {
    let settingsPopup = document.getElementsByClassName("settings-popup")[0];

    appearancePopup.style.opacity = 0; // make popup close
    body.style.pointerEvents="all"; // now you can click on everything again
    appearancePopup.style.pointerEvents = "none";
    appearanceClicked = !(appearanceClicked); // unclick appearance button
    appearanceBtn.style.backgroundColor = "var(--buttonColor)"; 
    settingsBtn.style.backgroundColor = "var(--buttonColor)";
    settingsPopup.style.opacity = "0";
    settingsClicked = !settingsClicked;
    document.removeEventListener("keydown", handleClick);
}

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
        profileBox.style.border = '1px solid var(--borderColor)';
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
 
        root.style.setProperty('--backgroundColorBot', '#2D5D5D');
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
        root.style.setProperty('--ColorUser', '#F16F7C');
        root.style.setProperty('--borderUser', '1px solid #F16F7C');

        root.style.setProperty('--backgroundColorBot', 'black');
        root.style.setProperty('--ColorBot', 'var(--brand-blue)');
        root.style.setProperty('--borderBot', '1px solid var(--brand-blue)');
    }
})

// font size button under settings
let sizeClicked = false;
let sizeBtn = document.getElementById('font-size');
let fontSizePopup = document.getElementById('textsize-popup')
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

function handleFontClick(event) {
    range.focus();
    //console.log("handleFontClick : " + event.key);

    if (event.key === "Enter") {
        handleTextSize();
    }
}

sizeBtn.addEventListener("click", handleTextSize);

function handleTextSize() {
    if (settingsClicked) {
        sizeClicked = !sizeClicked;

        if (sizeClicked) {
            sizeBtn.style.backgroundColor = "var(--mainColor)";
            // add menu display here
            body.style.pointerEvents = "none"; // you cant click on anything else until you click the x button
            fontSizePopup.style.opacity = 1; // make pop-up show up
            fontSizePopup.style.pointerEvents = "all"; // you can click on the buttons again
            document.addEventListener("keydown", handleFontClick);
        } else {
            sizeBtn.style.backgroundColor = "var(--buttonColor)";
            sizeClicked = !sizeClicked; // fixes the sizeClicked variable to show correctly
            //document.removeEventListener("keydown", handleFontClick);
            // this is in closeSize so that the event listener will close even if you click on the x button
            range.blur();
            closeSize();
        }
    }
}

let closeSizeBtn = document.getElementById("close-textsize");
closeSizeBtn.addEventListener("click", closeSize);

function closeSize() {
    let settingsPopup = document.getElementsByClassName("settings-popup")[0];
    fontSizePopup.style.opacity = 0; // make popup close
    body.style.pointerEvents="all"; // now you can click on everything again
    fontSizePopup.style.pointerEvents = "none";
    sizeClicked = !(sizeClicked); // unclick size button
    sizeBtn.style.backgroundColor = "var(--buttonColor)"; 
    settingsBtn.style.backgroundColor = "var(--buttonColor)";
    settingsPopup.style.opacity = "0";
    settingsClicked = !settingsClicked;
    document.removeEventListener("keydown", handleFontClick);
}

//Customize text size
// the scale function is:
// num * (scalefactor)^index
function scaleFunction (num, scalefactor, index)  {
    return num * (scalefactor ** index)
}
const range = document.getElementById("size-input");
let scaledChatFontSize = 16 // storing chat message font size in global var so that you can reference it when creating chat bubbles
range.addEventListener("input", () => {
    let index = range.value;
    const chatMessageSize = 15; // what user and bot chat messages are set to in the CSS
    const inputMessageSize = 16; // what the chat input message is set to in the CSS
    const scalefactor = 1.15;
    let userChatMsg = document.querySelectorAll(".chat-message.user");
    let chatBoxMsg = document.querySelectorAll(".chat-message.bot");
    let userInputMsg = document.querySelector("#chat-input");

    // handle input box first
    if (userInputMsg) {
        userInputMsg.style.fontSize = scaleFunction(inputMessageSize, scalefactor, index) + "px";
    }

    // handle chat messages next if they exist
    scaledChatFontSize = scaleFunction(chatMessageSize, scalefactor, index);
    userChatMsg.forEach(function(userResponse){
        userResponse.style.fontSize = scaledChatFontSize + "px";
    })

    chatBoxMsg.forEach(function(chatResponse){
        chatResponse.style.fontSize = scaledChatFontSize + "px";
   })
});


document.addEventListener("DOMContentLoaded", function () {
  const newChatBtn   = document.getElementById("new-chat-btn");
  const messagesEl   = document.getElementById("chat-messages");
  const inputEl      = document.getElementById("chat-input");
  const welcomeEl    = document.getElementById("welcome-text");

  if (!newChatBtn) return;

  newChatBtn.addEventListener("click", () => {
    // (Optional) save current conversation here before clearing, if you want persistence

    // Clear current messages only
    messagesEl.innerHTML = "";

    // Show the welcome text again if you want (or keep it hidden)
    if (welcomeEl) {
      welcomeEl.style.display = "block";
      welcomeEl.textContent = ""; // reset typing text
      // re-run the typing effect if desired:
      typeWelcomeAgain(welcomeEl, "Welcome to ChatRLB!", 75);
    }

    // Reset and focus input
    inputEl.value = "";
    inputEl.focus();

    // Ensure the messages panel is scrolled to bottom (empty state)
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Update global variable so that chat history still works when new chat button clicked
    hasChattedOnce = false;
  });

  function typeWelcomeAgain(node, msg, speedMs) {
    let i = 0;
    function step() {
      if (i < msg.length) {
        node.textContent += msg.charAt(i++);
        setTimeout(step, speedMs);
      }
    }
    step();
  }
});

let hasChattedOnce = false; // Global so that it can change when new chat button is pressed.

document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-messages");
  const chatForm      = document.getElementById("chat-form");
  const chatInput     = document.getElementById("chat-input");
  // Allow Enter to submit the chat (and Shift+Enter to add a new line)
chatInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();       // stop newline
    chatForm.requestSubmit(); // triggers the form's submit event
  }
});


  if (!chatForm || chatForm.dataset.bound === "1") return;
  chatForm.dataset.bound = "1"; // prevent duplicate listeners

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
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
      appendMessage("bot", data.reply || "No response");

      // create message object to store message
      const messageSet = {
        question: message,
        chatResponse: data.reply
      };
      //console.log(messageSet);
      //console.log("hasChattedOnce? " + hasChattedOnce);

      if (hasChattedOnce === false) {
        // first time chatting
        const chatHistoryEntry = extractMainIdea(data.reply);
        const chatHistoryDate = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit'});
        // create history object to store history, date, and messages
        const historyObject = {
            keyword: chatHistoryEntry,
            date: chatHistoryDate,
            messages: [messageSet]
        };
        //console.log(historyObject);
        history.push(historyObject);
        localStorage.setItem('history', JSON.stringify(history));
        let historyLen = history.length - 1;
        createHistory(history[historyLen].keyword, history[historyLen].date, historyLen); // call global function

        hasChattedOnce = !hasChattedOnce; // only run the if block for the first message

      } else {
        // stored in same history object
        history[history.length - 1].messages.push(messageSet);
        localStorage.setItem('history', JSON.stringify(history));
        //console.log(history);
        //console.log(history.length);
        
      }
    } catch (err) {
      appendMessage("bot", "⚠️ Error: Could not contact server.");
    }
  });

  function appendMessage(sender, text) {
    const welcome = document.querySelector("#welcome-text");
    if (welcome) welcome.style.display = "none";

    const msg = document.createElement("div");
    msg.classList.add("chat-message", sender);
    msg.innerHTML = `<p>${text}</p>`;
    msg.style.fontSize = scaledChatFontSize + "px";
    chatContainer.appendChild(msg);

    // Keep the newest message visible
    chatContainer.scrollTop = chatContainer.scrollHeight;
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

  // sometimes it can return unlikely words
  // if word returned that is undesired, add it to the set of stopWords (for right now)
  function extractMainIdea(text) {
    const stopWords = new Set(["the", "a", "an", "is", "of", "and", "in", "to", "for", "on", "with", "as", "at", "about", "you", "this", "that", "he", "not", "jesus", "god"]);
    const words = text.toLowerCase().match(/\b[a-zA-Z\'\’]+\b/g); // Tokenize and convert to lowercase
    const wordCounts = {};

    // Don't include the stopwords
    for (const word of words) {
        if (!stopWords.has(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    }
    //console.log(wordCounts);

    // Sort by frequency (descending order)
    const sortedKeywords = Object.entries(wordCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([word]) => word);

    //console.log(sortedKeywords);
    const topWord = sortedKeywords[0]; // Get most frequent word
    return topWord.charAt(0).toUpperCase() + topWord.slice(1); // Return most frequent word capitalized
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

// creates history entry in sidebar and sets event listener to load the messages in that history entry
function createHistory(keyword, date, index) {
    let histPlaceHolder = document.getElementById("hist-placeholder");
    if (histPlaceHolder) histPlaceHolder.style.display = "none";
    const newHist = document.createElement('span');
    const keywordP = document.createElement('p');
    keywordP.textContent = `${keyword}`;
    keywordP.classList.add('hist-kw');
    const keywordD = document.createElement('p');
    keywordD.textContent = `${date}`
    newHist.classList.add('history-entry');
    newHist.appendChild(keywordP);
    newHist.appendChild(keywordD);
    histPlaceHolder.insertAdjacentElement("afterend", newHist); // add most recent to top
    keywordP.addEventListener("click", function() {
        loadHistory(index);
    });
}

// loading chat history as soon as the browser loads
document.addEventListener("DOMContentLoaded", function() {
    for (i=0; i<history.length; i++) {
        createHistory(history[i].keyword, history[i].date, i);
    }
});

// loading by index avoids bug if keywords have the same name
function loadHistory(index) {
    const chatContainer = document.getElementById("chat-messages");
    // clear chat before history entry gets loaded
    chatContainer.innerHTML = '';
    // load each message in the history entry
    history[index].messages.forEach(function (message){
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

//DEMO
document.addEventListener('DOMContentLoaded', function () {
  const studyBtn   = document.getElementById('study-toggle');
  const bar        = document.getElementById('study-bar');
  //const notesList  = document.getElementById('notes-list');

  const vm         = document.getElementById('verseModal');
  const vmClose    = document.getElementById('verseModal-close');
  const vmRef      = document.getElementById('vm-ref');
  const vmText     = document.getElementById('vm-text');
  const vmNotes    = document.getElementById('vm-notes');

  let studyOn = false;

  function renderChips(verses) {
    bar.innerHTML = '';
    verses.forEach(v => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = v.ref;
      chip.addEventListener('click', () => openVerse(v));
      bar.appendChild(chip);
    });
  }

  function openVerse(v) {
    // fill modal
    vmRef.textContent  = v.ref;
    vmText.textContent = v.text;
    vmNotes.innerHTML  = '';
    v.notes.forEach(n => {
      const li = document.createElement('li');
      li.textContent = n;
      vmNotes.appendChild(li);
    });

    

    // show modal
    vm.classList.remove('hidden');
  }

  function closeVerseModal() { vm.classList.add('hidden'); }
  vmClose.addEventListener('click', closeVerseModal);
  window.addEventListener('click', (e) => { if (e.target === vm) closeVerseModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !vm.classList.contains('hidden')) closeVerseModal(); });

  // Toggle Study Mode
  if (studyBtn) {
    studyBtn.addEventListener('click', () => {
      studyOn = !studyOn;
      studyBtn.style.backgroundColor = studyOn ? 'var(--mainColor)' : 'var(--buttonColor)';
      bar.classList.toggle('hidden', !studyOn);

      if (studyOn) {
        renderChips(DEMO_VERSES);
      } else {
        bar.innerHTML = '';
      }
    });
  }

  // Optional: also show fresh chips after each user send (fake “AI suggestions”)
  const chatForm  = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', () => {
      if (studyOn) {
        // For demo: re-render the same chips; later plug in real suggestions
        renderChips(DEMO_VERSES);
      }
    });
  }
});

