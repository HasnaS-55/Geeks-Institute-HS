let quotes = [
  {
    id: 0,
    author: "Albert Einstein",
    quote: "Imagination is more important than knowledge.",
    likes: 0,
  },
  {
    id: 1,
    author: "Steve Jobs",
    quote: "Stay hungry, stay foolish.",
    likes: 0,
  },
  {
    id: 2,
    author: "Maya Angelou",
    quote:
      "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    likes: 0,
  },
  {
    id: 3,
    author: "Mark Twain",
    quote: "The secret of getting ahead is getting started.",
    likes: 0,
  },
  {
    id: 4,
    author: "Albert Einstein",
    quote:
      "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    likes: 0,
  },
];


const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const likesElement = document.getElementById("likes");
const statsElement = document.getElementById("stats");
const generateBtn = document.getElementById("generate-btn");
const addQuoteForm = document.getElementById("add-quote-form");
const filterForm = document.getElementById("filter-form");
const navigationDiv = document.getElementById("navigation");
const prevBtn = document.getElementById("prev-quote");
const nextBtn = document.getElementById("next-quote");
const filterInfo = document.getElementById("filter-info");


let currentQuote = null;
let previousQuoteId = null;
let filteredQuotes = [];
let currentFilteredIndex = -1;
let isFilterMode = false;


displayQuote(getRandomQuote());


generateBtn.addEventListener("click", function () {
  displayQuote(getRandomQuote());
  isFilterMode = false;
  navigationDiv.style.display = "none";
});

function getRandomQuote() {
  let availableQuotes = quotes;

  if (quotes.length > 1) {
    availableQuotes = quotes.filter((quote) => quote.id !== previousQuoteId);
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  return availableQuotes[randomIndex];
}

function displayQuote(quoteObj) {
  currentQuote = quoteObj;
  quoteElement.textContent = `"${quoteObj.quote}"`;
  authorElement.textContent = `- ${quoteObj.author}`;
  likesElement.textContent = `Likes: ${quoteObj.likes}`;
  previousQuoteId = quoteObj.id;
  statsElement.textContent = "";
}


addQuoteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newQuote = document.getElementById("new-quote").value;
  const newAuthor = document.getElementById("new-author").value;

  if (newQuote && newAuthor) {
    const newId =
      quotes.length > 0 ? Math.max(...quotes.map((q) => q.id)) + 1 : 0;
    const quote = {
      id: newId,
      author: newAuthor,
      quote: newQuote,
      likes: 0,
    };

    quotes.push(quote);
    displayQuote(quote);
    this.reset();

    
    isFilterMode = false;
    navigationDiv.style.display = "none";
  }
});


document
  .getElementById("count-chars-with-spaces")
  .addEventListener("click", function () {
    if (currentQuote) {
      statsElement.textContent = `Character count (with spaces): ${currentQuote.quote.length}`;
    }
  });

document
  .getElementById("count-chars-no-spaces")
  .addEventListener("click", function () {
    if (currentQuote) {
      const count = currentQuote.quote.replace(/\s/g, "").length;
      statsElement.textContent = `Character count (no spaces): ${count}`;
    }
  });

document.getElementById("count-words").addEventListener("click", function () {
  if (currentQuote) {
    const count = currentQuote.quote
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    statsElement.textContent = `Word count: ${count}`;
  }
});

document.getElementById("like-quote").addEventListener("click", function () {
  if (currentQuote) {
    currentQuote.likes++;
    likesElement.textContent = `Likes: ${currentQuote.likes}`;
  }
});


filterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const authorName = document.getElementById("filter-author").value.trim();
  if (authorName) {
    filteredQuotes = quotes.filter((quote) =>
      quote.author.toLowerCase().includes(authorName.toLowerCase())
    );

    if (filteredQuotes.length > 0) {
      isFilterMode = true;
      currentFilteredIndex = 0;
      displayQuote(filteredQuotes[currentFilteredIndex]);
      filterInfo.textContent = `Showing ${currentFilteredIndex + 1} of ${
        filteredQuotes.length
      } quotes by ${authorName}`;
      navigationDiv.style.display = "block";
    } else {
      quoteElement.textContent = "No quotes found for this author.";
      authorElement.textContent = "";
      likesElement.textContent = "";
      navigationDiv.style.display = "none";
    }
  }
});


prevBtn.addEventListener("click", function () {
  if (isFilterMode && filteredQuotes.length > 0) {
    currentFilteredIndex =
      (currentFilteredIndex - 1 + filteredQuotes.length) %
      filteredQuotes.length;
    displayQuote(filteredQuotes[currentFilteredIndex]);
    filterInfo.textContent = `Showing ${currentFilteredIndex + 1} of ${
      filteredQuotes.length
    } quotes`;
  }
});

nextBtn.addEventListener("click", function () {
  if (isFilterMode && filteredQuotes.length > 0) {
    currentFilteredIndex = (currentFilteredIndex + 1) % filteredQuotes.length;
    displayQuote(filteredQuotes[currentFilteredIndex]);
    filterInfo.textContent = `Showing ${currentFilteredIndex + 1} of ${
      filteredQuotes.length
    } quotes`;
  }
});
