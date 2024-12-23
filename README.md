# CanSmile
## Project Overview

CanSmile is a web application designed to help canadian users find affordable dental care by connecting them to clinics offering dental tourism services worldwide. It enables users to search for clinics, compare costs, book appointments, and even explore flight options to their chosen destinations.

<img width="1312" alt="image" src="https://github.com/user-attachments/assets/70c9e083-f0f0-4eee-b1c1-a1031f6f8bf6" />


**Features**

    - Search Clinics: Browse and search clinics based on treatments and locations.
    - Price Comparison: Compare treatment costs with travel expenses.
    - Flight Search: Find flights to clinic destinations.
    - User Profiles: Manage personal details and view favorites and appointments.
    - Favorites: Save preferred clinics for easy access.
    - Appointment Booking: Book appointments directly with clinics.

## Installation Instructions
**Prerequisites**

    - Node.js and npm installed on your machine.
    - MongoDB Atlas account or local MongoDB setup.
    - A .env file with the following variables:

```
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
VITE_API_BASE_URL=http://localhost:6000
```

## Backend Setup
Clone the repository:

    git clone <repository-url>
    cd CanSmile/server


Install dependencies:

    npm install

Start the backend server:

    npm start

## Frontend Setup

Navigate to the frontend folder:

    cd ../client

Install dependencies:

    npm install

Start the development server:

    npm run dev

Running the Application

    Access the application at http://localhost:5174 in your browser.

## Usage

    Register or log in to access all features.
    Search for clinics by treatment type or location.
    Compare treatment and travel costs.
    Favorite clinics for future reference.
    Book appointments with your selected clinic.

## Technologies Used
# Frontend

    React.js
    Vite
    Tailwind CSS
    Axios

# Backend

    Node.js
    Express.js
    MongoDB (via Mongoose)
    JWT for authentication

# Other Tools

    Render (deployment)

# Future Improvements

    Interactive Map: Display clinics and their locations visually on a map.
    User Reviews: Enable users to add and view reviews of clinics.
    Notifications: Add email or in-app notifications for booking updates.
    Localization: Support multiple languages for better accessibility.
    Mobile Application: Develop a companion mobile app for CanSmile.
    Advanced Search Filters: Add filters for more precise clinic searches.

    
