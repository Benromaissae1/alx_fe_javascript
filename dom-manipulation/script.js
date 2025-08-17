let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// ============================
// Storage Helpers
// ============================
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ============================
// Display Quotes
// ============================
function showRandomQuote() {
  const selectedCategory = categoryFilter.value || "all";
  const filtered = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
  if (!filtered.length) {
    quoteDisplay.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }
  const q = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `<p>"${q.text}"</p><small>- ${q.category}</small>`;
}

// ============================
// Add Quote
// ============================
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  if (!text || !category) return alert("Enter text and category.");

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  textInput.value = "";
  categoryInput.value = "";
}

// ============================
// Categories
// ============================
function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");
}
function filterQuotes() {
  showRandomQuote();
  localStorage.setItem("lastFilter", categoryFilter.value);
}

// ============================
// Server Interaction (GET + POST)
// ============================
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data.slice(0, 5).map(p => ({ text: p.title, category: "Server" }));
  } catch (e) {
    console.error("Error fetching:", e);
    return [];
  }
}

async function postNewQuotesToServer(newQuotes) {
  for (const quote of newQuotes) {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quote)
      });
    } catch (e) {
      console.error("POST error:", e);
    }
  }
}

// ============================
// Sync with Server (Required Name: syncQuotes)
// ============================
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const newQuotes = localQuotes.filter(lq => !serverQuotes.some(sq => sq.text === lq.text));

  if (newQuotes.length) {
    await postNewQuotesToServer(newQuotes);
    console.log(`${newQuotes.length} quotes sent to server.`);
  }
  populateCategories();
  showRandomQuote();
}

// ============================
// Init
// ============================
newQuoteBtn.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", filterQuotes);
populateCategories();
showRandomQuote();

// مزامنة تلقائية كل دقيقة
setInterval(syncQuotes, 60000);
