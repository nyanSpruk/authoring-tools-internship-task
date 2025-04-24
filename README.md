# 🌍 Frontend/Full Stack Intern Task

Hey there! 👋

Thanks for applying to our internship program! This is a small technical task that will be part of the **technical interview** process.

You’ll build a mini app, submit it via a **GitHub pull request**, and we’ll review it together during a **collaborative code review session** — just like we do on the team. We're not expecting a perfect solution — we're more interested in how you **think**, **learn**, and **communicate your decisions**.

If something isn’t finished or you’ve made trade-offs, that’s totally fine — just explain what you would do next or how you approached the problem.

---

## 🧠 Task Overview

Build a small web app that loads a list of cities from a local server, calculates the distance from the user, and displays everything in a responsive table.
When the user clicks on a city (a row), the app should recalculate distances from that city to the others.

---

## ✅ Requirements

### 1. Load City List
- Your app should **fetch a list of city names** from a locally spawned server that serves the list of cities [`assets/cities.json`](assets/cities.json).
  Use a public available *json server* of your choice. You can also use a service that hosts the file. 
- From the response, randomly select **25 countries**, and then randomly select **1 city per country**.
- Use these 25 cities as the source list for the rest of the task.

### 2. Get Current Location
- Use the **browser’s Geolocation API** to get the user's current location.

### 3. Calculate Distance
- Add **two distance columns** to your table:
  - `Distance (Your Formula)`: Calculate the distance from the user to each city using **any formula you like** (e.g., Haversine). Be sure to provide your own implementation.
    - 📌 Be sure to **briefly explain your formula** in the code or README.
  - `Distance (AI-Generated)`: Recreate the same logic using an **AI-generated implementation** (e.g., using ChatGPT, GitHub Copilot, etc.).
    - Note **how you used AI** (e.g., did it generate the code? help troubleshoot? suggest structure?).

> 💡 We encourage and value the smart use of AI tools in our workflow — show us how you applied them.

---

### 4. Display in a Responsive Table
- Present all results in a styled, scrollable table.
- The table should include the following columns:
  - City Name
  - Country Name
  - Country Code
  - Coordinates
  - Distance (Your Formula)
  - Distance (AI-Generated)
- Make the table **responsive**:
  - On very small screens (**< 200px**), show **only**:
    - City Name
    - Distance (Your Formula)

### 5. UI Interaction
- When the user clicks on a city name, recalculate distances from the selected city to all the others (instead of the current location).

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

  Then, provide a **UI toggle** (e.g., switch or dropdown) that lets users filter the table to only show entries that match criteria based on this custom column.
  - For example: cities with temperature above 20°C, population below 1 million, or particularly windy places.

This is totally optional — just a chance to show off your creativity and have fun with the task!

---

## 🛠️ Tech Stack

You can use **any tech stack** you're comfortable with, and a **UI framework of your choice**.

> 💡 **Bonus Points**  
> We use **Vue 3 (Composition API)** with **Pinia** for state management and **TypeScript**.  
> Using this stack will earn you extra credit during the review.

---

## 🚀 How to Submit

- Clone this repository and push to a brand new repository before you start your task.
- When you're happy with the result submit a **pull request** and send us the link to the repository.
- In your README or comments, please include:
  - Instructions for running the app (especially if backend or PHP is involved)
  - A short explanation of your distance formula
  - How you used AI tools (if applicable)
  - Any assumptions or trade-offs you made

---

## 💬 Questions?

If anything is unclear, feel free to reach out to `markopangerceltra` — we're happy to help.

We’re looking forward to seeing your work — good luck and have fun!

