# 🌍 Frontend/Full Stack Intern Task

Hey there! 👋

Thanks for applying to our internship program! This is a small technical task that will be part of the **technical interview** process.

You’ll build a mini app, submit it via a **GitHub pull request**, and we’ll review it together during a **collaborative code review session** — just like we do on the team. We're not expecting a perfect solution — we're more interested in how you **think**, **learn**, and **communicate your decisions**.

If something isn’t finished or you’ve made trade-offs, that’s totally fine — just explain what you would do next or how you approached the problem.

---

## 🧠 Task Overview

Build a small web app that loads a list of cities, fetches geolocation data for each one, calculates the distance from the user, and displays everything in a responsive table.

---

## ✅ Requirements

### 1. Load City List
- Your app should **fetch a list of city names** from the public API:
  [`https://countriesnow.space/api/v0.1/countries`](https://countriesnow.space/api/v0.1/countries).
- From the response, randomly select **20 countries**, and then randomly select **1 city per country**.
- Use these 20 cities as the source list for the rest of the task.

### 2. Fetch Geo Data
- For each city, call the API:  
  `https://geoip.celtra.com/search?q=<city_name>`
- Parse the relevant data from the API response and display:
  - City name
  - Coordinates
  - Country name
  - Country code
- If a city exists in **multiple countries**, research how to differentiate those results and include an **additional column of your choice** to clarify the distinction (e.g., region, timezone, population — your call).

### 3. Get Current Location
- Use the **browser’s Geolocation API** to get the user's current location.

### 4. Calculate Distance
- Add **two distance columns** to your table:
  - `Distance (Your Formula)`: Calculate the distance from the user to each city using **any formula you like** (e.g., Haversine).
    - 📌 Be sure to **explain the formula** briefly in your code or README.
  - `Distance (AI-Generated)`: Recreate the same logic using an **AI-generated implementation** (e.g., using ChatGPT, GitHub Copilot, etc.).
    - Note **how you used AI** (e.g., did it generate the code? help troubleshoot? suggest structure?).

> 💡 We encourage and value the smart use of AI tools in our workflow — show us how you applied them.

---

## 5. Display in a Responsive Table
- Present all results in a styled, scrollable table.
- The table should include the following columns:
  - City Name
  - Country Name
  - Country Code
  - Your custom disambiguation column (if needed)
  - Coordinates
  - Distance (Your Formula)
  - Distance (AI-Generated)
- Make the table **responsive**:
  - On very small screens (**< 200px**), show **only**:
    - City Name
    - Distance (Your Formula)

---

## 🎯 Optional Fun Challenge

If you're up for a bit of fun, try adding one of the following features:

- **Custom Data Column** 📊: Add a column of your choice to enhance the city data — examples include:
  - Current weather
  - Temperature
  - Wind speed
  - Population
  - Local time
  - Map
  - Anything else fun or informative

  Then, provide a **UI toggle (e.g., switch or dropdown)** that lets users filter the table to only show entries that match criteria based on this custom column.
  - For example, show only cities with temperature above 20°C, or population below 1 million.
  - The available filter options should be dynamically based on the data in your column.

This is totally optional — just a chance to show off your creativity and have fun with the task!

---

## 🛠️ Tech Stack

You can use **any tech stack** you're comfortable with.

> 💡 **Bonus Points**  
> We use **Vue 3 (Composition API)** with **Pinia** for state management and **TypeScript**.  
> Using this stack will earn you extra credit during the review.

---

## 🚀 How to Submit

- Push your solution to a **public GitHub repository**.
- Submit it as a **pull request** titled `intern-task`.
- In your README or comments, please include:
  - Instructions for running the app (especially if backend or PHP is involved)
  - A short explanation of your distance formula
  - How you used AI tools (if applicable)
  - Any assumptions or trade-offs you made

---

## 💬 Questions?

If anything is unclear, feel free to reach out to **markopanger** — we're happy to help.

We’re looking forward to seeing your work — good luck and have fun!

