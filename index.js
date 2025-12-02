const dis = document.getElementById("data-display");
const btn = document.getElementById("button");
const input = document.getElementById("location");

btn.addEventListener("click", fetchWeather);

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
  const temp = data.temperature;
  const name = data.name;

  const temperature = convertTemp(temp);

  const name_display = document.createElement("h1");
  name_display.textContent = name;

  const temp_display = document.createElement("p");
  temp_display.textContent = temperature;

  const div = document.createElement("div");
  div.append(name_display, temp_display);

  dis.appendChild(div);
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
