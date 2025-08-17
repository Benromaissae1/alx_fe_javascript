// ============================
// Dynamic Quote Generator
// With Local Storage + Filtering + JSON Import/Export + Sync Simulation
// ============================

// Quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // DOM references
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");
  
  // ============================
  // Storage Helpers
  // ============================
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function loadLastFilter() {
    const savedFilter = localStorage.getItem("lastFilter") || "all";
    categoryFilter.value = savedFilter;
  }
  
  // ============================
  // Quote Display
  // ============================
  function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>- ${quote.category}</small>`;
  }
  
  // ============================
  // Adding Quotes
  // ============================
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories();
      textInput.value = "";
      categoryInput.value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please enter both text and category.");
    }
  }
  
  // ============================
  // Category Filtering
  // ============================
  function populateCategories() {
    const categories = ["all", ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = categories
      .map(cat => `<option value="${cat}">${cat}</option>`)
      .join("");
  
    loadLastFilter();
  }
  
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem("lastFilter", selectedCategory);
    showRandomQuote();
  }
  
  // ============================
  // Import / Export JSON
  // ============================
  function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ============================
  // Sync with Server (Simulation)
  // ============================
  function fetchServerQuotes() {
    return new Promise(resolve => {
      const mockServerQuotes = [
        { text: "Server quote 1", category: "Motivation" },
        { text: "Server quote 2", category: "Life" }
      ];
      setTimeout(() => resolve(mockServerQuotes), 1000);
    });
  }
  
  function syncWithServer() {
    fetchServerQuotes().then(serverQuotes => {
      const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
      let newQuotes = [];
  
      serverQuotes.forEach(serverQuote => {
        const existsLocally = localQuotes.some(
          localQuote => localQuote.text === serverQuote.text && localQuote.category === serverQuote.category
        );
        if (!existsLocally) {
          newQuotes.push(serverQuote);
        }
      });
  
      if (newQuotes.length > 0) {
        quotes.push(...newQuotes);
        saveQuotes();
        populateCategories();
        notifyUser(`${newQuotes.length} new quotes synced from server.`);
      }
    });
  }
  
  function notifyUser(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
  
  // ============================
  // Event Listeners
  // ============================
  newQuoteBtn.addEventListener("click", showRandomQuote);
  categoryFilter.addEventListener("change", filterQuotes);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
  
  // ============================
  // Initialize
  // ============================
  populateCategories();
  showRandomQuote();
  

  setInterval(syncWithServer, 60000);
  