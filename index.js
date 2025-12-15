const dis = document.getElementById("data-display");
const input = document.getElementById("location");

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchWeather();
    input.value = "";
  }
});

async function fetchWeather() {
  const location = input.value.trim();
  if (location === "") return;

  axios
    .get("http://localhost:5000/weather", {
      params: {
        location: location,
      },
    })
    .then((res) => {
      const data = res.data;
      displayData(data);
    })
    .catch((error) => console.error(error));
}

async function displayData(data) {
  const nameSPAN = document.getElementById("place");
  const tempSPAN = document.getElementById("temperature");

  const temp = data.temperature;
  const name = data.name;

  const temperature = convertTemp(temp);

  nameSPAN.innerText = name;
  tempSPAN.innerText = temperature;
}

function convertTemp(temp) {
  const selected = document.querySelector(`input[name="temp"]:checked`).id;
  switch (selected) {
    case "fahrenheit":
      return Math.round(((temp - 273.15) * 9) / 5 + 32);
    case "celsius":
      return Math.round(temp - 273.15);
    case "kelvin":
      return Math.round(temp);
  }
}
