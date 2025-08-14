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
      quoteDisplay.textContent = "No quotes available for this category.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
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
  
    // Add category to filter if not already present
    const existingCategories = Array.from(categoryFilter.options).map(opt => opt.value.toLowerCase());
    if (!existingCategories.includes(category.toLowerCase())) {
      const newOption = document.createElement("option");
      newOption.value = category;
      newOption.textContent = category;
      categoryFilter.appendChild(newOption);
    }
  
    // Clear inputs
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  
    alert("Quote added successfully!");
  }
  
  // Initialize category dropdown with unique categories
  function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  categoryFilter.addEventListener("change", showRandomQuote);
  
  // Initial setup
  populateCategories();
  