const textInput = document.getElementById("textInput");
const errorMessage = document.getElementById("errorMessage");

textInput.addEventListener("input", function (e) {

  let value = this.value;

  const newValue = value.replace(/[^a-zA-Z]/g, "");

 
  if (newValue !== value) {
    errorMessage.textContent = "Only letters are allowed!";
    this.value = newValue;
  } else {
    errorMessage.textContent = "";
  }
});
