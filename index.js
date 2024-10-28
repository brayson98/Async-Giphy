const API_KEY = ""; // Is in .env file
const baseEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=25&rating=g&lang=en`;

async function getImages(query) {
    console.log("Fetching GIFs...");
    try {
        const endpoint = `${baseEndpoint}&q=${encodeURIComponent(query)}`;
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data); 

      
        if (data.data.length === 0) {
            throw new Error('No results found');
        }

        
        return data.data.map(gif => gif.images.original.url);
    } catch (err) {
        console.error("Error fetching images:", err);
        return [];
    }
}


document.getElementById("gifSearchForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const query = document.getElementById("searchInput").value; 
    const gifContainer = document.getElementById("gifContainer");
    gifContainer.innerHTML = ""; 

    const gifUrls = await getImages(query); 

    if (gifUrls.length > 0) {
        gifUrls.forEach(url => {
            const imgElement = document.createElement("img");
            imgElement.src = url; 
            gifContainer.appendChild(imgElement); 
        });
    } else {
        gifContainer.innerHTML = "No GIFs found."; 
    }
});
