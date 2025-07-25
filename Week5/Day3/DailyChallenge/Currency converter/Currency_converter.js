const API =
  "https://v6.exchangerate-api.com/v6/cae325c2f32effe879d9e5a2/latest/USD";
const from = document.getElementById("from-currency");
const to = document.getElementById("to-currency");

function options(json) {
  from.innerHTML = "";
  to.innerHTML = "";
  for (let item in json) {
    const option = document.createElement("option");
    option.textContent = `${item}`;
    from.appendChild(option);

    const option1 = document.createElement("option");
    option1.textContent = `${item}`;
    to.appendChild(option1);
  }

  from.value = "USD";
  to.value = "EUR";
}

async function retrieveData() {
  try {
    const response = await fetch(API);
    if (!response.ok) console.log("Could not fetch");
    const data = await response.json();
    console.log(data.conversion_rates);
    const conversion_data = data.conversion_rates;
    options(conversion_data);
    document.getElementById("btn").addEventListener("click", () => {
      const amount = document.getElementById("amount").value;
      const result = document.getElementById("result");
      const fromRate = conversion_data[from.value];
      const toRate = conversion_data[to.value];
      if (!amount) {
        alert("Please enter a valid number in amount");
      }

      const calculation = ((amount / fromRate) * toRate).toFixed(2);

      result.innerHTML = `<p>${calculation}${from.value}</p>`;
    });
  } catch (err) {
    console.error(err);
  }
}

retrieveData();
