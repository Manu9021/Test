async function matchAnswer(question) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });
    const data = await response.json();
    if (data.reply) return data.reply;
    return "Désolé, pas de réponse.";
  } catch (error) {
    console.error("Erreur de fetch :", error);
    return "Problème de connexion au serveur.";
  }
}

document.getElementById("reambot-text").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("reambot-send").click();
  }
});

document.getElementById("reambot-send").onclick = async () => {
  const input = document.getElementById("reambot-text");
  const message = input.value.trim();
  if (!message) return;

  const messages = document.getElementById("reambot-messages");
  messages.innerHTML += `<div class="user-message"><div class="bubble">${message}</div></div>`;

  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  const typing = document.createElement("div");
  typing.classList.add("reambot-message");
  typing.id = "typing";
  typing.innerHTML = `<div class="bot-avatar">🤖</div><div class="typing-indicator"><span></span><span></span><span></span></div>`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  const response = await matchAnswer(message);

  typing.remove();
  messages.innerHTML += `<div class="reambot-message"><div class="bot-avatar">🤖</div><div class="bubble">${response}</div></div>`;
  messages.scrollTop = messages.scrollHeight;
};