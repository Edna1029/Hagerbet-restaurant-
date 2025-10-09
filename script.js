// beverages js
function openModal(title, description, imgSrc) {
  document.getElementById("drinkModal").style.display = "flex";
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = description;
  document.getElementById("modalImg").src = imgSrc;
}

function closeModal() {
  document.getElementById("drinkModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("drinkModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//extra js
function openModal(title, description, imgSrc) {
  document.getElementById("foodModal").style.display = "flex";
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = description;
  document.getElementById("modalImg").src = imgSrc;
}

function closeModal() {
  document.getElementById("foodModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("foodModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//menu js
document.querySelectorAll(".menu-box").forEach((box) => {
  box.addEventListener("click", (e) => {
    // Only navigate if not clicking directly on a link
    if (!e.target.closest("a")) {
      const link = box.querySelector("a.cta");
      if (link) {
        window.location.href = link.href;
      }
    }
  });
});

//review js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const reviewsList = document.getElementById("reviews-list");
  const stars = document.querySelectorAll("#star-rating span");
  let rating = 0;

  // Load reviews from database
  const loadReviews = async () => {
    var response;
    try {
      response = await fetch("get_reviews.php");
      const reviews = await response.json();
      console.log(reviews);
      reviewsList.innerHTML = ""; // Clear existing reviews
      reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        reviewCard.innerHTML = `
          <img src="default-user.jpg" alt="${review.name}">
          <div class="review-content">
            <h3>${review.name}</h3>
            <div class="stars">${"★".repeat(review.rating)}${"☆".repeat(
          5 - review.rating
        )}</div>
            <p>${review.message}</p>
          </div>
        `;
        reviewsList.appendChild(reviewCard);
      });
    } catch (error) {
      console.log(response);
      console.error("Error loading reviews:", error);
    }
  };

  // Initial load of reviews
  loadReviews();

  // Star selection
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      rating = star.getAttribute("data-value");
      stars.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("selected");
      }
    });
  });

  // Submit review
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name && message && rating > 0) {
      try {
        const response = await fetch("add_review.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `name=${encodeURIComponent(
            name
          )}&rating=${rating}&message=${encodeURIComponent(message)}`,
        });
        const data = await response.json();
        alert(data.message); // Replace with better UI notification in production

        if (data.success) {
          // Reset form
          form.reset();
          stars.forEach((s) => s.classList.remove("selected"));
          rating = 0;
          // Reload reviews to include the new one
          await loadReviews();
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error(error);
      }
    } else {
      alert("Please fill in all fields and select a star rating.");
    }
  });
});
