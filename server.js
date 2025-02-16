require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = 3000;

app.use(express.json()); // Ensure JSON parsing

const cors = require("cors");
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateActivities = async (city, numFriends) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: `Suggest day-wise activities for a trip to ${city} with ${numFriends} friends.` }],
            max_tokens: 100,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating activities:", error);
        return "Explore the city with friends. Enjoy sightseeing, local cuisine, and cultural spots.";
    }
};



app.post("/plan-trip", async (req, res) => {
    const { numCities, numFriends, cityNames } = req.body;
    if (!numCities || !numFriends || !Array.isArray(cityNames) || cityNames.length === 0) {
        return res.status(400).json({ error: "Invalid input. Please provide all required fields." });
    }

    try {
        const itinerary = await Promise.all(cityNames.map(async (city, i) => ({
            day: i + 1,
            city,
            activities: await generateActivities(city, numFriends)
        })));

        res.json({ itinerary });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "An error occurred while generating the itinerary." });
    }
});

app.get("/", (req, res) => {
    res.send("Server is running! Use POST /plan-trip to get trip plans.");
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
