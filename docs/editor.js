document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tool-button");
  const selects = document.querySelectorAll(".tool-select");
  const fileInput = document.getElementById("file-input");
  const insertUrlButton = document.getElementById("insert-url");
  const uploadFileButton = document.getElementById("upload-file");
  const saveButton = document.getElementById("save-button");
  const categorySelect = document.querySelector(".category-select");

  // Toolbar button commands
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const command = button.getAttribute("data-command");
      if (command) {
        document.execCommand(command, false, null);
      }
    });
  });

  // Toolbar select dropdowns
  selects.forEach((select) => {
    select.addEventListener("change", () => {
      const command = select.getAttribute("data-command");
      const value = select.value;
      document.execCommand(command, false, value);
    });
  });

  // Insert image via URL
  insertUrlButton.addEventListener("click", () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      insertResizedImage(url);
    }
  });

  // Upload image from file
  uploadFileButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        insertResizedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Function to insert resized image
  function insertResizedImage(imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.width = 150;
    img.height = 200;
    const editor = document.querySelector(".editor");
    editor.appendChild(img);
  }

  // Save blog functionality
  saveButton.addEventListener("click", () => {
    const title = document.querySelector(".editor-title").value;
    const content = document.querySelector(".editor").innerHTML;
    const category = categorySelect.value;

    // Check if title and content are filled
    if (title.trim() === "") {
      alert("Title is required.");
      return;
    }

    if (content.trim() === "") {
      alert("Content cannot be empty.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }

    // Create new blog object
    const blog = {
      title,
      content,
      category,
      date: new Date().toLocaleDateString(),
    };

    // Retrieve existing blogs from localStorage or initialize an empty array
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // Add the new blog to the list
    blogs.push(blog);

    // Save the updated blogs list to localStorage
    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog saved successfully!");
    window.location.href = "./displayblog.html"; // Ensure the file path is correct
  });

  // Color Picker functionality
  const colorPickerToggle = document.getElementById("color-picker-toggle");
  const colorPickerContainer = document.querySelector(".color-picker-container");

  colorPickerToggle.addEventListener("click", () => {
    colorPickerContainer.style.display =
      colorPickerContainer.style.display === "none" ? "block" : "none";
  });

  document
    .getElementById("text-color-picker")
    .addEventListener("input", function (event) {
      document.execCommand("foreColor", false, event.target.value);
    });
});
