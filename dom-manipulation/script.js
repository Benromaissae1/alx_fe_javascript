let quotes = loadQuotes() || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  const formContainer = document.getElementById("formContainer");
  const controlsContainer = document.getElementById("controlsContainer");
  
  // عرض اقتباس عشوائي
  function showRandomQuote() {
    let filteredQuotes = quotes;
    const selectedCategory = categoryFilter.value;
  
    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());
    }
  
    quoteDisplay.innerHTML = "";
  
    if (filteredQuotes.length === 0) {
      const msg = document.createElement("em");
      msg.textContent = "No quotes available for this category.";
      quoteDisplay.appendChild(msg);
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    const p = document.createElement("p");
    p.textContent = `"${quote.text}"`;
  
    const small = document.createElement("small");
    small.textContent = `— ${quote.category}`;
  
    quoteDisplay.appendChild(p);
    quoteDisplay.appendChild(small);
  
    // حفظ الاقتباس في sessionStorage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
  }
  
  // إضافة اقتباس جديد
  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
  
    if (!text || !category) {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    quotes.push({ text, category });
    saveQuotes();
  
    // تحديث قائمة الفئات
    const exists = [...categoryFilter.options].some(opt => opt.value.toLowerCase() === category.toLowerCase());
    if (!exists) {
      const opt = document.createElement("option");
      opt.value = category;
      opt.textContent = category;
      categoryFilter.appendChild(opt);
    }
  
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  }
  
  // إنشاء نموذج الإضافة
  function createAddQuoteForm() {
    const h2 = document.createElement("h2");
    h2.textContent = "Add Your Own Quote";
    formContainer.appendChild(h2);
  
    const inputText = document.createElement("input");
    inputText.id = "newQuoteText";
    inputText.type = "text";
    inputText.placeholder = "Enter a new quote";
    formContainer.appendChild(inputText);
  
    const inputCat = document.createElement("input");
    inputCat.id = "newQuoteCategory";
    inputCat.type = "text";
    inputCat.placeholder = "Enter quote category";
    formContainer.appendChild(inputCat);
  
    const btn = document.createElement("button");
    btn.textContent = "Add Quote";
    btn.addEventListener("click", addQuote);
    formContainer.appendChild(btn);
  }
  
  // إنشاء أدوات التخزين: استيراد وتصدير
  function createStorageControls() {
    // زر التصدير
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "Export Quotes (JSON)";
    exportBtn.addEventListener("click", exportToJsonFile);
    controlsContainer.appendChild(exportBtn);
  
    // ملف الإدخال
    const importInput = document.createElement("input");
    importInput.type = "file";
    importInput.accept = ".json";
    importInput.addEventListener("change", importFromJsonFile);
    controlsContainer.appendChild(importInput);
  }
  
  // الحفظ في localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // التحميل من localStorage
  function loadQuotes() {
    const data = localStorage.getItem("quotes");
    return data ? JSON.parse(data) : null;
  }
  
  // تصدير الاقتباسات إلى ملف
  function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // استيراد من ملف JSON
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) throw new Error("Invalid format");
  
        quotes.push(...imported);
        saveQuotes();
        updateCategories();
        alert("Quotes imported successfully!");
      } catch {
        alert("Failed to import quotes. Make sure it's a valid JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // تحديث الفئات
  function updateCategories() {
    const existing = new Set();
    quotes.forEach(q => existing.add(q.category));
    categoryFilter.innerHTML = '<option value="all">All</option>';
    existing.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }
  
  // عرض آخر اقتباس من الجلسة
  function restoreLastQuote() {
    const saved = sessionStorage.getItem("lastViewedQuote");
    if (saved) {
      const quote = JSON.parse(saved);
      const p = document.createElement("p");
      p.textContent = `"${quote.text}"`;
      const small = document.createElement("small");
      small.textContent = `— ${quote.category}`;
      quoteDisplay.appendChild(p);
      quoteDisplay.appendChild(small);
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  categoryFilter.addEventListener("change", showRandomQuote);
  
  // Init
  updateCategories();
  createAddQuoteForm();
  createStorageControls();
  restoreLastQuote();
  