const planets = [
  { name: "Mercury", moons: [] },
  { name: "Venus", moons: [] },
  { name: "Earth", moons: ["Moon"] },
  { name: "Mars", moons: ["Phobos", "Deimos"] },
  { name: "Jupiter", moons: ["Io", "Europa", "Ganymede", "Callisto"] },
  { name: "Saturn", moons: ["Titan", "Rhea", "Enceladus"] },
  { name: "Uranus", moons: ["Titania", "Oberon"] },
  { name: "Neptune", moons: ["Triton"] },
];
const listPlanets = document.querySelector(".listPlanets");
for (let planet of planets) {
  let divCreat = document.createElement("div");
  divCreat.textContent = planet.name;
  divCreat.classList.add("planet", planet.name.toLowerCase());

  

  planet.moons.forEach((moon) => {
    let moonDiv = document.createElement("div");
    moonDiv.textContent = moon;
    moonDiv.classList.add("moon");
    divCreat.appendChild(moonDiv);
  });
  listPlanets.appendChild(divCreat);
}
