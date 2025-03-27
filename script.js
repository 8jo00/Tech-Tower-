// Countdown Timer
const countdown = () => {
  const targetDate = new Date("March 27, 2025 00:00:00").getTime();
  const timer = document.getElementById("timer");

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      timer.innerHTML = "Sale Live!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const interval = setInterval(updateTimer, 1000);
  updateTimer(); // Initial call to avoid delay
};

// Search Functionality with Fuzzy Matching
const searchProduct = () => {
  const searchTerm = document.querySelector(".search-bar input").value.trim().toLowerCase();
  if (!searchTerm) {
    
    return;
  }

  // Redirect to the Desktops tab with the search term as a URL parameter
  window.location.href = `desktops.html?search=${encodeURIComponent(searchTerm)}`;
};

// Function to filter and highlight items based on fuzzy search
const filterAndHighlightItems = () => {
  // Get the search term from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("search")?.toLowerCase();

  if (!searchTerm) return; // Exit if no search term is found

  // Get all desktop items
  const desktopItems = document.querySelectorAll(".desktop-item");
  let found = false;

  desktopItems.forEach((item) => {
    const productName = item.querySelector("h3").textContent.toLowerCase();

    // Fuzzy match: Check if the search term is partially or closely matching the product name
    if (productName.includes(searchTerm) || isFuzzyMatch(productName, searchTerm)) {
      item.style.display = "block"; // Show the item
      item.scrollIntoView({ behavior: "smooth", block: "center" });
      item.style.border = "2px solid #00ff00"; // Highlight the product
      found = true;
    } else {
      item.style.display = "none"; // Hide the item if it doesn't match
    }
  });

  // Show a message if no items are found
  if (!found) {
    
  }
};

// Fuzzy Match Function (Simple Implementation)
const isFuzzyMatch = (text, searchTerm) => {
  // Check if the search term is a substring or has a close match
  return text.includes(searchTerm) || searchTerm.split("").every((char) => text.includes(char));
};

// Run the filter function when the Desktops tab loads
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("desktops.html")) {
    filterAndHighlightItems();
  }
});
// Initialize Company Name Entrance Animation
const initializeEntranceAnimation = () => {
  const companyInfo = document.querySelector(".company-info");
  if (companyInfo) {
    companyInfo.style.opacity = "0"; // Start with invisible text
    companyInfo.style.transform = "translateY(20px)"; // Start slightly below

    // Delay the animation to ensure it runs after the DOM is ready
    setTimeout(() => {
      companyInfo.style.transition = "opacity 1s ease, transform 1s ease";
      companyInfo.style.opacity = "1"; // Fade in
      companyInfo.style.transform = "translateY(0)"; // Move to original position
    }, 500); // Delay the animation by 500ms
  }
};

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  countdown(); // Initialize the countdown timer
  initializeEntranceAnimation(); // Initialize the entrance animation
});

// ====================
// Cart Functionality
// ====================
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Add an item to the cart
const addToCart = (name, price) => {
  const item = { name, price };
  cartItems.push(item);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  loadCartItems();
};

// Load cart items
const loadCartItems = () => {
  const cartItemsList = document.getElementById("cart-items-list");
  if (!cartItemsList) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItemsList.innerHTML = ""; // Clear the list
  let subtotal = 0;

  // Add each item to the cart list
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");

    // Calculate GST (12.5% of the original price)
    const gst = item.price * 0.125;

    // Calculate subprice (original price minus GST)
    const subprice = item.price - gst;

    // Display product name, original price, subprice, and GST
    li.innerHTML = `
      <span>${item.name}</span>
      <span>Price: $${item.price.toFixed(2)}</span>
      <span>Subprice: $${subprice.toFixed(2)}</span>
      <span>GST: $${gst.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsList.appendChild(li);
    subtotal += subprice; // Add subprice to subtotal
  });

  // Calculate GST and total
  const gst = subtotal * 0.125;
  const total = subtotal + gst;

  // Update the totals
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("gst").textContent = `$${gst.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
};

// Remove an item from the cart
const removeFromCart = (index) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1); // Remove the item
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage
  loadCartItems(); // Reload the cart display
};

// Load cart items when the Cart tab is opened
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("cart.html")) {
    loadCartItems();
  }
});


// ====================
// Subscription Form Functionality
// ====================
document.getElementById("subscribe-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("subscribe-email").value;
  if (email && email.includes("@")) {
    localStorage.setItem("subscribedEmail", email);
    const message = document.getElementById("subscription-message");
    if (message) {
      message.classList.add("visible");
      setTimeout(() => {
        message.classList.remove("visible");
      }, 10000);
    }
    document.getElementById("subscribe-email").value = "";
  } else {
    alert("Please enter a valid email address.");
  }
});

// ====================
// Entrance Animations
// ====================
const addEntranceAnimations = () => {
  const elements = document.querySelectorAll(".entrance, .newinv, .custom-pc-section");
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    setTimeout(() => {
      element.style.transition = "opacity 1s ease, transform 1s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 300);
  });
};

// ====================
// Modal Functionality
// ====================
const initializeModal = () => {
  const modal = document.querySelector(".modal");
  const confirmButton = document.getElementById("confirm-payment");
  const cancelButton = document.getElementById("cancel-payment");
  const paymentForm = document.getElementById("payment-form");

  // Ensure elements exist before attaching event listeners
  if (!modal || !confirmButton || !cancelButton || !paymentForm) {
    console.error("Modal elements not found!");
    return;
  }

  // Show modal on form submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    modal.style.display = "flex"; // Show the modal
  });

  // Confirm payment
  confirmButton.addEventListener("click", () => {
  
    modal.style.display = "none"; // Hide the modal
    paymentForm.reset(); // Reset the form
  });

  // Cancel payment
  cancelButton.addEventListener("click", () => {
   
    modal.style.display = "none"; // Hide the modal
  });
};

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  initializeModal(); // Initialize the modal functionality
});
// ====================
// Initialize Everything
// ====================
document.addEventListener("DOMContentLoaded", () => {
  countdown();
  addEntranceAnimations();
  initializeModal();

  // Attach search functionality
  const searchButton = document.querySelector(".search-bar button");
  if (searchButton) {
    searchButton.addEventListener("click", searchProduct);
  }

  // Attach "Add to Cart" functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const desktop = button.closest(".desktop");
      const name = desktop.querySelector("h3").textContent;
      const price = parseFloat(desktop.querySelector(".price").textContent.replace("$", ""));
      addToCart(name, price);
    });
  });

  // Load cart items if on the cart page
  if (window.location.pathname.includes("cart.html")) {
    loadCartItems();
  }
});








// Technician Modal Functionality
const technicianModal = document.getElementById("technicianModal");
const askTechnicianBtn = document.getElementById("ask-technician");
const cancelRequestBtn = document.getElementById("cancelRequest");
const submitRequestBtn = document.getElementById("submitRequest");
const technicianForm = document.getElementById("technicianForm");
const closeModalBtn = document.querySelector(".close-modal");
const formContainer = document.getElementById("technicianFormContainer");
const confirmationMessage = document.getElementById("confirmationMessage");
const doneButton = document.getElementById("doneButton");

// Open modal when Ask Technician button is clicked
askTechnicianBtn?.addEventListener("click", () => {
  technicianModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  formContainer.style.display = "block";
  confirmationMessage.style.display = "none";
  technicianForm.reset();
});

// Close modal functions
function closeTechnicianModal() {
  technicianModal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeModalBtn?.addEventListener("click", closeTechnicianModal);
cancelRequestBtn?.addEventListener("click", closeTechnicianModal);
doneButton?.addEventListener("click", closeTechnicianModal);

// Close modal when clicking outside the content
technicianModal?.addEventListener("click", (e) => {
  if (e.target === technicianModal) {
    closeTechnicianModal();
  }
});

// Form submission
technicianForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("clientName").value;
  const number = document.getElementById("whatsappNumber").value;
  
  // Store the request (in a real app, you'd send to a backend)
  localStorage.setItem("technicianRequest", JSON.stringify({
    name,
    number,
    timestamp: new Date().toISOString()
  }));
  
  // Show confirmation message
  formContainer.style.display = "none";
  confirmationMessage.style.display = "block";
  
  // In a real app, you might want to send this to your backend
  // and potentially open WhatsApp with a pre-filled message
  // window.open(`https://wa.me/${number}?text=Hello%20${encodeURIComponent(name)}%20from%20TechTower`);
});





// Custom PC Payment Modal Functionality
const customPcModal = document.getElementById("customPcModal");
const customPcConfirmation = document.getElementById("customPcConfirmation");
const proceedToPaymentBtn = document.getElementById("proceed-to-payment");
const cancelCustomPaymentBtn = document.getElementById("cancel-custom-payment");
const confirmCustomPaymentBtn = document.getElementById("confirm-custom-payment");
const customPcDoneBtn = document.getElementById("custom-pc-done");
const customPcPaymentForm = document.getElementById("custom-pc-payment-form");

// Prices for components - updated to match your select options
const componentPrices = {
  processor: {
    "i9": 1200,
    "ryzen7": 800,
    "ryzen9": 1000
  },
  ram: {
    "16gb": 200,
    "32gb": 350,
    "64gb": 600
  },
  storage: {
    "500gb": 150,
    "1tb": 250,
    "2tb": 400
  },
  chassis: {
    "mid-tower": 300,
    "full-tower": 450,
    "mini-itx": 400
  }
};

// Function to update the estimated total in the form
const updateEstimatedTotal = () => {
  const processor = document.getElementById("processor").value;
  const ram = document.getElementById("ram").value;
  const storage = document.getElementById("storage").value;
  const chassis = document.getElementById("chassis").value;
  
  // Calculate prices
  const processorPrice = componentPrices.processor[processor] || 0;
  const ramPrice = componentPrices.ram[ram] || 0;
  const storagePrice = componentPrices.storage[storage] || 0;
  const chassisPrice = componentPrices.chassis[chassis] || 0;
  
  const subtotal = processorPrice + ramPrice + storagePrice + chassisPrice;
  document.getElementById("custom-pc-total").textContent = `$${subtotal.toFixed(2)} BZD`;
};

// Add event listeners to update total when selections change
document.getElementById("processor").addEventListener("change", updateEstimatedTotal);
document.getElementById("ram").addEventListener("change", updateEstimatedTotal);
document.getElementById("storage").addEventListener("change", updateEstimatedTotal);
document.getElementById("chassis").addEventListener("change", updateEstimatedTotal);

// Open modal when Proceed to Payment is clicked
proceedToPaymentBtn?.addEventListener("click", () => {
  const processor = document.getElementById("processor").value;
  const ram = document.getElementById("ram").value;
  const storage = document.getElementById("storage").value;
  const chassis = document.getElementById("chassis").value;
  
  if (processor === "select" || ram === "select" || storage === "select" || chassis === "select") {
    alert("Please select all components before proceeding to payment");
    return;
  }
  
  // Calculate prices
  const processorPrice = componentPrices.processor[processor] || 0;
  const ramPrice = componentPrices.ram[ram] || 0;
  const storagePrice = componentPrices.storage[storage] || 0;
  const chassisPrice = componentPrices.chassis[chassis] || 0;
  
  const subtotal = processorPrice + ramPrice + storagePrice + chassisPrice;
  const gst = subtotal * 0.125;
  const total = subtotal + gst;
  
  // Populate receipt
  const receipt = document.getElementById("custom-pc-receipt");
  receipt.innerHTML = `
    <div class="receipt-item">
      <span>Processor (${processor})</span>
      <span>$${processorPrice.toFixed(2)}</span>
    </div>
    <div class="receipt-item">
      <span>RAM (${ram})</span>
      <span>$${ramPrice.toFixed(2)}</span>
    </div>
    <div class="receipt-item">
      <span>Storage (${storage})</span>
      <span>$${storagePrice.toFixed(2)}</span>
    </div>
    <div class="receipt-item">
      <span>Chassis (${chassis})</span>
      <span>$${chassisPrice.toFixed(2)}</span>
    </div>
  `;
  
  // Update totals
  document.getElementById("custom-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("custom-gst").textContent = `$${gst.toFixed(2)}`;
  document.getElementById("custom-total").textContent = `$${total.toFixed(2)}`;
  
  // Show modal
  customPcModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// Close modal functions
function closeCustomPcModal() {
  customPcModal.style.display = "none";
  document.body.style.overflow = "auto";
}

function closeCustomPcConfirmation() {
  customPcConfirmation.style.display = "none";
  document.body.style.overflow = "auto";
}

// Event listeners for closing modals
document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    closeCustomPcModal();
  });
});

cancelCustomPaymentBtn?.addEventListener("click", closeCustomPcModal);
customPcDoneBtn?.addEventListener("click", closeCustomPcConfirmation);

// Close modals when clicking outside
customPcModal?.addEventListener("click", (e) => {
  if (e.target === customPcModal) {
    closeCustomPcModal();
  }
});

customPcConfirmation?.addEventListener("click", (e) => {
  if (e.target === customPcConfirmation) {
    closeCustomPcConfirmation();
  }
});

// Form submission
customPcPaymentForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get form values
  const cardName = document.getElementById("card-name").value;
  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvv = document.getElementById("cvv").value;
  const billingAddress = document.getElementById("billing-address").value;
  
  // Validate form
  if (!cardName || !cardNumber || !expiryDate || !cvv || !billingAddress) {
    alert("Please fill in all payment details");
    return;
  }
  
  // Save the order
  const processor = document.getElementById("processor").value;
  const ram = document.getElementById("ram").value;
  const storage = document.getElementById("storage").value;
  const chassis = document.getElementById("chassis").value;
  const total = document.getElementById("custom-total").textContent;
  
  const order = {
    processor,
    ram,
    storage,
    chassis,
    total,
    paymentInfo: {
      cardName,
      cardLastFour: cardNumber.slice(-4),
      expiryDate
    },
    billingAddress,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem("customPcOrder", JSON.stringify(order));
  
  // Close payment modal and show confirmation
  closeCustomPcModal();
  customPcConfirmation.style.display = "flex";
  
  // Reset form
  customPcPaymentForm.reset();
});

// Initialize the estimated total on page load
document.addEventListener("DOMContentLoaded", () => {
  updateEstimatedTotal();
});








