document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  const noBlogsMessage = document.getElementById("no-blogs-message");
  const createBlogButton = document.getElementById("create-blog-button");

  // Load blogs from localStorage
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Render blogs
  function renderBlogs() {
    blogContainer.innerHTML = ""; // Clear the container
    if (blogs.length === 0) {
      noBlogsMessage.style.display = "block"; // Show no blogs message
    } else {
      noBlogsMessage.style.display = "none"; // Hide no blogs message
      blogs.forEach((blog, index) => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.dataset.index = index;

        // Extract blog details
        const { title, content, date } = blog;

        // Add content to the card
        card.innerHTML = `
          <div class="blog-title">${title}</div>
          <div class="blog-description">${content || "No description available."}</div>
          <div class="blog-extra">Created on: ${date || "Unknown date"}</div>
          <button class="delete-btn" onclick="deleteBlog(${index})">Delete</button>
        `;

        // Add click event to open the blog
        card.addEventListener("click", (event) => {
          // Prevent click event when delete button is clicked
          if (event.target.classList.contains("delete-btn")) return;
          openBlog(index);
        });

        blogContainer.appendChild(card); // Append the card to the container
      });
    }
  }

  // Open blog
  function openBlog(index) {
    localStorage.setItem("currentBlog", JSON.stringify(blogs[index]));
    window.location.href = "blogview.html";
  }

  // Navigate to the blog editor
  createBlogButton.addEventListener("click", () => {
    window.location.href = "editor.html";
  });

  // Delete blog
  window.deleteBlog = function (index) {
    blogs.splice(index, 1); // Remove the blog from the array
    localStorage.setItem("blogs", JSON.stringify(blogs)); // Update localStorage
    renderBlogs(); // Re-render the blogs
  };

  renderBlogs(); // Initial render
});
