async function retrieve(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok)
      throw new Error(
        `Error fetching from server: ${response.status}, ${response.statusText}`
      );

    const objectStarWars = await response.json();
    console.log(objectStarWars);
  } catch (err) {
    console.log(err);
  }
}

retrieve("https://www.swapi.tech/api/starships/9/")
