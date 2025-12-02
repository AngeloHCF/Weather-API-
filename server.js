import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import axios from "axios";

const PORT = process.env.PORT;
const KEY = process.env.KEY;

app.use(cors());

app.get("/weather", async (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}`
    );

    // console.log(weatherResponse.data.name);

    res.send({
      temperature: weatherResponse.data.main.temp,
      name: weatherResponse.data.name,
    });
  } catch (error) {
    console.error(`WeatherAPI Error: ${error.message}`);
  }
});

app.get("/hey", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}/weather`);
});
