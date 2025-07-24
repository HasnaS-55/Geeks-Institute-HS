const API = "https://www.swapi.tech";

const btn = document.getElementById("btn");
function display(json) {
  console.log(json);
  const conti = document.querySelector(".info");
  conti.innerHTML = `
    <h3>${json.result.properties.name}</h3>
    <h4>${json.result.properties.height}</h4>
    <h4>${json.result.properties.gender}</h4>
    <h4>${json.result.properties.birth_year}</h4>
    <img src="${json.result.properties.homeworld}">
    `;
}
btn.addEventListener("click", async () => {
  const preloader = document.querySelector(".fa-3x");
  preloader.classList.remove("hidden");

  try {
    const random = Math.floor(Math.random() * 10) + 1;
    const response = await fetch(`${API}/api/people/${random}`);
    if (!response.ok)
      throw new Error(`Error: ${response.status}, ${response.text}`);
    const data = await response.json();

    display(data);
  } catch (err) {
    console.error(err);
  } finally {
    preloader.classList.add("hidden");
  }
});
