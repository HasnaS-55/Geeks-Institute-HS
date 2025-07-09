const textInput = document.getElementById("textInput");
const errorMessage = document.getElementById("errorMessage");

textInput.addEventListener("input", function (e) {
  // Get current value
  let value = this.value;

  // Remove any non-letter characters using regex
  const newValue = value.replace(/[^a-zA-Z]/g, "");

  // If we removed anything, show error and update value
  if (newValue !== value) {
    errorMessage.textContent = "Only letters are allowed!";
    this.value = newValue;
  } else {
    errorMessage.textContent = "";
  }
});
