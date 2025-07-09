const cols = 60;
const rows = 30;
const grid = document.getElementById("grid");

for (let i = 0; i < cols * rows; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

let isDrawing = false;
let currentColor = "#ff4444";

const colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach((option) => {
  option.addEventListener("click", function () {
    colorOptions.forEach((opt) => opt.classList.remove("selected"));
    this.classList.add("selected");
    currentColor = this.dataset.color;
  });
});

grid.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("cell")) {
    isDrawing = true;
    e.target.style.backgroundColor = currentColor;
  }
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

grid.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("cell")) {
    e.target.style.backgroundColor = currentColor;
  }
});

document.getElementById("clear-btn").addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
});
