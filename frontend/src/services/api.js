export async function sendPrompt(prompt) {
  const response = await fetch("http://localhost:8080/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error("Erreur serveur");
  }

  return await response.json();
}

export async function getHistory() {
  const response = await fetch("http://localhost:8080/api/history");
  return await response.json();
}
