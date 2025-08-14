let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  const formContainer = document.getElementById("formContainer");
  
  // Function: Show random quote
  function showRandomQuote() {
    let filteredQuotes = quotes;
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
    
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <small>— ${quote.category}</small>
    `;
  }
  
  // Function: Add new quote
  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
  
    if (!text || !category) {
      alert("Please enter both a quote and category.");
      return;
    }
  
    quotes.push({ text, category });
  
    // Update category dropdown if new category
    const existingCategories = Array.from(categoryFilter.options).map(opt => opt.value.toLowerCase());
    if (!existingCategories.includes(category.toLowerCase())) {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    }
  
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  
    alert("Quote added successfully!");
  }
  
  // Function: Dynamically create the add-quote form
  function createAddQuoteForm() {
    formContainer.innerHTML = `
      <h2>Add Your Own Quote</h2>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    `;
  
    // Attach event listener to the new button
    document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  }
  
  // Function: Populate category dropdown
  function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
      categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  categoryFilter.addEventListener("change", showRandomQuote);
  
  // Initial setup
  populateCategories();
  createAddQuoteForm();
  