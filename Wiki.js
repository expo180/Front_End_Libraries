const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const resultsDiv = document.getElementById("results");

// Function to search Wikipedia entries
function searchWikipedia() {
    const searchTerm = searchInput.value;
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&utf8=1&origin=*`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch search results.');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data.query.search);
        })
        .catch(error => {
            console.log('Error:', error.message);
        });
}

// Function to display search results
function displayResults(results) {
    resultsDiv.innerHTML = "";

    results.forEach(result => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        const title = document.createElement("h3");
        title.textContent = result.title;

        const snippet = document.createElement("p");
        snippet.textContent = result.snippet;

        const link = document.createElement("a");
        link.href = `https://en.wikipedia.org/wiki/${result.title.replace(/\s+/g, '_')}`;
        link.target = "_blank";
        link.textContent = "Read More";

        articleDiv.appendChild(title);
        articleDiv.appendChild(snippet);
        articleDiv.appendChild(link);

        resultsDiv.appendChild(articleDiv);
    });
}

// Event listeners
searchBtn.addEventListener("click", searchWikipedia);

searchInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        searchWikipedia();
    }
});

randomBtn.addEventListener("click", function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
});

