// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".pickle-card");
    const productName = card.querySelector("h3").textContent;
    const price = card.querySelector(".price").textContent;

    // Add animation
    button.textContent = "Added!";
    button.style.backgroundColor = "#27ae60";

    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.backgroundColor = "#2c3e50";
    }, 2000);

    // Here you would typically add the item to a cart
    console.log(`Added ${productName} (${price}) to cart`);
  });
});

// Feedback Form
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = feedbackForm.querySelector("input").value;
    const feedback = feedbackForm.querySelector("textarea").value;
    const rating = feedbackForm.querySelector(".stars").textContent.length;

    // Create new feedback card
    const feedbackCard = document.createElement("div");
    feedbackCard.className = "feedback-card";
    feedbackCard.innerHTML = `
            <div class="feedback-header">
                <img src="https://picsum.photos/50/50?random=${Math.random()}" alt="User Avatar" class="user-avatar">
                <div class="user-info">
                    <h4>${name}</h4>
                    <div class="rating">${"★".repeat(rating)}${"☆".repeat(
      5 - rating
    )}</div>
                </div>
            </div>
            <p class="feedback-text">"${feedback}"</p>
        `;

    // Add to feedback container
    document.querySelector(".feedback-container").prepend(feedbackCard);

    // Reset form
    feedbackForm.reset();

    // Show success message
    alert("Thank you for your feedback!");
  });
}

// Star Rating
const stars = document.querySelectorAll(".stars");
stars.forEach((starContainer) => {
  const stars = starContainer.textContent;
  starContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.textContent = "☆";
    star.style.cursor = "pointer";
    star.style.fontSize = "1.5rem";
    star.style.color = "#f1c40f";

    star.addEventListener("mouseover", () => {
      for (let j = 0; j <= i; j++) {
        starContainer.children[j].textContent = "★";
      }
    });

    star.addEventListener("mouseout", () => {
      for (let j = 0; j < 5; j++) {
        starContainer.children[j].textContent = "☆";
      }
    });

    star.addEventListener("click", () => {
      for (let j = 0; j < 5; j++) {
        starContainer.children[j].textContent = j <= i ? "★" : "☆";
      }
    });

    starContainer.appendChild(star);
  }
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".pickle-card, .feedback-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});
