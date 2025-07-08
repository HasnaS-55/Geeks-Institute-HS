setTimeout(() => {
  alert("Hello World");
}, 2000);

setTimeout(() => {
  const container = document.getElementById("container");
  container.innerHTML += "<p>Hello World</p>";
}, 2000);


let paragraphCount = 1; 
const maxParagraphs = 5;
const container = document.getElementById("container");
const clearBtn = document.getElementById("clear");
let intervalId;

function addParagraph() {
  if (paragraphCount >= maxParagraphs) {
    clearInterval(intervalId);
    return;
  }

  container.innerHTML += "<p>Hello World</p>";
  paragraphCount++;
}


intervalId = setInterval(addParagraph, 2000);


clearBtn.addEventListener("click", () => {
  clearInterval(intervalId);
});
