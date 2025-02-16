# Trip Planner

## Description
Trip Planner is a web application that allows users to plan their trips by selecting destinations, specifying the number of travelers, and generating an itinerary with AI-powered suggestions.

## Features
- Custom Itineraries
- Explore Destinations
- Easy Booking
- Real-Time Weather Updates
- Budget Planning
- Group Travel Management

## Technologies Used
- HTML, CSS, JavaScript (Frontend)
- Node.js, Express.js (Backend)
- OpenAI API (AI-powered trip suggestions)
- dotenv, cors

## Installation
### Prerequisites
- Node.js installed
- OpenAI API key

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd trip-planner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your OpenAI API key:
   ```sh
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. Open `index.html` in a browser to access the app.

## Usage
1. Navigate to the homepage (`index.html`).
2. Click "Plan Trip" to enter trip details.
3. Submit the form to generate an AI-powered itinerary.
4. View or clear the generated itinerary.

## API Endpoint
- **POST /plan-trip**
  - Request Body:
    ```json
    {
      "numCities": 3,
      "numFriends": 2,
      "cityNames": ["Paris", "Rome", "Berlin"]
    }
    ```
  - Response:
    ```json
    {
      "itinerary": [
        {"day": 1, "city": "Paris", "activities": "Visit Eiffel Tower"},
        {"day": 2, "city": "Rome", "activities": "Explore Colosseum"},
        {"day": 3, "city": "Berlin", "activities": "Tour Brandenburg Gate"}
      ]
    }
    ```

## License
This project is licensed under the ISC License.

## Contact
For inquiries, contact:
- **Name:** Deshveer Singh
- **Email:** deshveerbatth@gmail.com

