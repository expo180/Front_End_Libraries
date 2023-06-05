document.addEventListener("DOMContentLoaded", function(event) {
  // Fetch quotes from an API (you can replace this with your own API)
  function getQuotes() {
    return fetch("https://api.quotable.io/quotes")
      .then(response => response.json())
      .then(data => data.results);
  }

  // Display a random quote
  function displayQuote() {
    getQuotes().then(quotes => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];

      document.getElementById("text").textContent = quote.content;
      document.getElementById("author").textContent = "- " + quote.author;
      document.getElementById("tweet-quote").href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + quote.content + '" - ' + quote.author);
    });
  }

  // Event listener for new quote button
  document.getElementById("new-quote").addEventListener("click", displayQuote);

  // Display initial quote
  displayQuote();
});

