document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const reviewsList = document.getElementById("reviews-list");
  const stars = document.querySelectorAll("#star-rating span");
  let rating = 0;

  // Star selection
  stars.forEach(star => {
    star.addEventListener("click", () => {
      rating = star.getAttribute("data-value");
      stars.forEach(s => s.classList.remove("selected"));
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("selected");
      }
    });
  });

  // Submit review
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name && message && rating > 0) {
      const newReview = document.createElement("div");
      newReview.classList.add("review-card");

      newReview.innerHTML = `
        <div class="review-content">
          <h3>${name}</h3>
          <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
          <p>${message}</p>
        </div>
      `;

      reviewsList.appendChild(newReview);

      // Reset form
      form.reset();
      stars.forEach(s => s.classList.remove("selected"));
      rating = 0;
    } else {
      alert("Please fill in all fields and select a star rating.");
    }
  });
});