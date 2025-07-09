let form = document.querySelector("form");
let story = document.getElementById("story");
const btn = document.getElementById("lin-button")

form.addEventListener('submit', function (event) {
  event.preventDefault();

  let noun = document.getElementById("noun").value;
  let adjective = document.getElementById("adjective").value;
  let person = document.getElementById("person").value;
  let verb = document.getElementById("verb").value;
  let place = document.getElementById("place").value;

   if (!noun || !adjective || !person || !verb || !place) {
    alert("Fill all inputs please");
    return
  }

  story.textContent = `One day in ${place}, ${person} found a ${adjective} ${noun}. Without hesitation, they decided to ${verb} with it, creating a memory that would last forever!`;

  form.reset()
});
