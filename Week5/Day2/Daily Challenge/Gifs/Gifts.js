const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const BASE_URL = "https://api.giphy.com/v1/gifs/random";

document.getElementById("gifForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (!searchTerm) return;

    try {
        const gifUrl = `${BASE_URL}?api_key=${API_KEY}&tag=${searchTerm}`;
        const response = await fetch(gifUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        const gifUrlFromApi = data.data.images.original.url;
        displayGif(gifUrlFromApi, searchTerm);
    } catch (err) {
        console.error("Error fetching GIF:", err);
    }
});

function displayGif(gifUrl, searchTerm) {
    const gifsContainer = document.getElementById("gifsContainer");
    const gifWrapper = document.createElement("div");
    gifWrapper.className = "gif-wrapper";

    const img = document.createElement("img");
    img.src = gifUrl;
    img.alt = `GIF of ${searchTerm}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.onclick = () => gifWrapper.remove();

    gifWrapper.appendChild(img);
    gifWrapper.appendChild(deleteBtn);
    gifsContainer.appendChild(gifWrapper);
}

document.getElementById("deleteAll").addEventListener("click", () => {
    document.getElementById("gifsContainer").innerHTML = "";
});