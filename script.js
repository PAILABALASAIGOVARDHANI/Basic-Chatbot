
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const clearBtn = document.getElementById("clearBtn");

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}


function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}-message`;

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;

  const time = document.createElement("span");
  time.className = "time";
  time.textContent = getTime();

  message.appendChild(content);
  message.appendChild(time);
  chatBox.appendChild(message);

  chatBox.scrollTop = chatBox.scrollHeight;
}


function getBotReply(message) {
  const text = message.toLowerCase().trim();

  if (/\b(hi|hello|hey|hai)\b/.test(text)) {
    return "Hello! 😊 How can I help you?";
  }

  if (text.includes("your name")) {
    return "I'm Smart Chatbot, your virtual assistant! 🤖";
  }

  if (text.includes("how are you")) {
    return "I'm doing great! Thanks for asking. How are you?";
  }

  if (text.includes("what can you do") || text.includes("features")) {
    return "I can greet you, answer simple questions, tell jokes, share tips, and chat with you. Try asking me something!";
  }

  if (text.includes("joke")) {
    return "Why do programmers prefer dark mode? Because light attracts bugs! 😂";
  }

  if (text.includes("time")) {
    return "The current time is " + getTime() + ".";
  }

  if (text.includes("date") || text.includes("today")) {
    return "Today's date is " + new Date().toLocaleDateString() + ".";
  }

  if (text.includes("javascript")) {
    return "JavaScript makes websites interactive. It works alongside HTML and CSS to build web applications!";
  }

  if (text.includes("html")) {
    return "HTML creates the structure of a webpage, like headings, buttons, forms, and chat messages.";
  }

  if (text.includes("css")) {
    return "CSS styles a webpage with colors, layouts, animations, spacing, and responsive designs.";
  }

  if (text.includes("help")) {
    return "I'm here to help! Ask me about HTML, CSS, JavaScript, the date, the time, or tell me to share a joke.";
  }

  if (/\b(thank you|thanks|thank u)\b/.test(text)) {
    return "You're welcome! 😊 Happy to help.";
  }

  if (/\b(bye|goodbye)\b/.test(text)) {
    return "Goodbye! 👋 Have a wonderful day!";
  }

  return "That's an interesting question! 🤔 I'm a basic chatbot, so I don't know the answer to everything yet. Try asking about HTML, CSS, JavaScript, or tell me to share a joke.";
}


function sendMessage(message) {
  const text = message.trim();

  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";
  userInput.focus();

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "Bot is typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  
  setTimeout(() => {
    typing.remove();
    addMessage(getBotReply(text), "bot");
  }, 600);
}


chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  sendMessage(userInput.value);
});


document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.message);
  });
});


clearBtn.addEventListener("click", () => {
  chatBox.replaceChildren();

  addMessage(
    "Hello! 👋 Welcome to Smart Chatbot. How can I help you today?",
    "bot"
  );

  userInput.focus();
});
