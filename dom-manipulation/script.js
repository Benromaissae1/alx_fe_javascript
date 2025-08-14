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
  
    // Clear previous display
    quoteDisplay.innerHTML = "";
  
    if (filteredQuotes.length === 0) {
      const noQuoteMsg = document.createElement("em");
      noQuoteMsg.textContent = "No quotes available for this category.";
      quoteDisplay.appendChild(noQuoteMsg);
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    // Create quote paragraph
    const quoteTextEl = document.createElement("p");
    quoteTextEl.textContent = `"${quote.text}"`;
  
    // Create category element
    const quoteCatEl = document.createElement("small");
    quoteCatEl.textContent = `— ${quote.category}`;
  
    // Append to display
    quoteDisplay.appendChild(quoteTextEl);
    quoteDisplay.appendChild(quoteCatEl);
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
  
    // Add category to dropdown if it's new
    const existingCategories = Array.from(categoryFilter.options).map(opt => opt.value.toLowerCase());
    if (!existingCategories.includes(category.toLowerCase())) {
      const newOption = document.createElement("option");
      newOption.value = category;
      newOption.textContent = category;
      categoryFilter.appendChild(newOption);
    }
  
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  
    alert("Quote added successfully!");
  }
  
  // Function: Dynamically create the add-quote form
  function createAddQuoteForm() {
    // Title
    const title = document.createElement("h2");
    title.textContent = "Add Your Own Quote";
    formContainer.appendChild(title);
  
    // Quote input
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
    formContainer.appendChild(quoteInput);
  
    // Category input
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
    formContainer.appendChild(categoryInput);
  
    // Add button
    const addBtn = document.createElement("button");
    addBtn.id = "addQuoteBtn";
    addBtn.textContent = "Add Quote";
    formContainer.appendChild(addBtn);
  
    // Attach listener
    addBtn.addEventListener("click", addQuote);
  }
  
  // Function: Populate category dropdown
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
  categoryFilter.addEventListener("change", showRandomQuote);
  
  // Initial setup
  populateCategories();
  createAddQuoteForm();
  