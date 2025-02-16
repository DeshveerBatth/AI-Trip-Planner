document.addEventListener("DOMContentLoaded", () => {
    const tripForm = document.getElementById("trip-form");
    const outputDiv = document.getElementById("output");
    const itineraryList = document.getElementById("itinerary-list");
    const clearItineraryButton = document.getElementById("clear-itinerary");

    if (!tripForm) {
        console.error("Form element not found.");
        return;
    }

    tripForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const numCities = parseInt(document.getElementById("num-cities").value, 10);
        const numFriends = parseInt(document.getElementById("num-friends").value, 10);
        const cityNamesInput = document.getElementById("city-names").value;

        if (!Number.isInteger(numCities) || !Number.isInteger(numFriends) || !cityNamesInput.trim()) {
            outputDiv.innerHTML = "<p style='color:red;'>Please enter valid inputs.</p>";
            outputDiv.style.display = "block";
            return;
        }

        const cityNames = cityNamesInput.split(",").map(city => city.trim()).filter(city => city !== "");

        if (cityNames.length !== numCities) {
            outputDiv.innerHTML = "<p style='color:red;'>Number of cities does not match the input list.</p>";
            outputDiv.style.display = "block";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/plan-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ numCities, numFriends, cityNames })
            });

            if (!response.ok) throw new Error(`Failed to fetch trip plan. Status: ${response.status}`);
            const data = await response.json();

            if (data.itinerary && Array.isArray(data.itinerary)) {
                itineraryList.innerHTML = data.itinerary.map(item => `
                    <li>
                        <strong>Day ${item.day} (${item.city}):</strong> ${item.activities || 'No activities available'}
                    </li>
                `).join("");
                outputDiv.style.display = "block";
            } else {
                throw new Error("No valid itinerary received from server.");
            }
        } catch (error) {
            console.error("Error:", error);
            outputDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
            outputDiv.style.display = "block";
        }
    });

    clearItineraryButton.addEventListener("click", () => {
        itineraryList.innerHTML = "";
        outputDiv.style.display = "none";
    });
});