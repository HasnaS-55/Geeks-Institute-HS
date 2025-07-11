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
  // Planet div (container)
  let planetDiv = document.createElement("div");
  planetDiv.classList.add("planet", planet.name.toLowerCase());
  planetDiv.textContent = planet.name;

  // Add moons inside planet
  planet.moons.forEach((moon, index) => {
    let moonDiv = document.createElement("div");
    moonDiv.textContent = moon;
    moonDiv.classList.add("moon");

    // Optional: Add custom position data
    moonDiv.style.transform = `rotate(${index * (360 / planet.moons.length)}deg) translate(35px) rotate(-${index * (360 / planet.moons.length)}deg)`;

    planetDiv.appendChild(moonDiv);
  });

  listPlanets.appendChild(planetDiv);
}
