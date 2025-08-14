// Initial quotes array
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Display a random quote
  function showRandomQuote() {
    let filteredQuotes = quotes;
  
    // Apply category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());
    }
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<em>No quotes available for this category.</em>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    // Use innerHTML for formatted output
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>— ${quote.category}</small>
    `;
  }
  
  // Add new quote
  function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
  
    if (!text || !category) {
      alert("Please enter both a quote and category.");
      return;
    }
  
    // Add to array
    quotes.push({ text, category });
  
    // Add category to filter if new
    const existingCategories = Array.from(categoryFilter.options).map(opt => opt.value.toLowerCase());
    if (!existingCategories.includes(category.toLowerCase())) {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    }
  
    // Clear inputs
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  
    alert("Quote added successfully!");
  }
  
  // Populate categories at start
  function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  categoryFilter.addEventListener("change", showRandomQuote);
  
  // Initial setup
  populateCategories();
  