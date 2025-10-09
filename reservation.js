document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservation-form");
  const bookBtn = document.getElementById("book-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    bookBtn.disabled = true; // Disable button to prevent multiple submissions
    bookBtn.textContent = "Booking...";

    const formData = new FormData(form);
    const data = new URLSearchParams(formData).toString();

    try {
      const response = await fetch("reserve_table.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });
      const result = await response.json();

      alert(result.message); // Replace with better UI notification in production
      if (result.success) {
        form.reset();
      }
    } catch (error) {
      alert("An error occurred. Please try again.", error);
      console.error(error);
    } finally {
      bookBtn.disabled = false;
      bookBtn.textContent = "Book a Table";
    }
  });
});
