# 🎟️ Backend API

> **A robust backend system for managing events, registrations, and attendance.

![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Express](https://img.shields.io/badge/Express-4.18-gray) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)

---

## 📖 About The Project

event management API designed to simplify how communities organize gatherings. It allows organizers to create events, users to register, and staff to manage event-day check-ins securely.

This project uses a **Layered Architecture** (Controller-Service-Model), making it an excellent resource for learning scalable backend development with Node.js and TypeScript.

### 🎯 Core Features
* **Authentication:** Secure User Sign-up & Login (JWT).
* **Event Management:** Create, update, and view events.
* **Registration System:** Users can register for specific events.
* **Attendance Tracking:** QR-style check-in system to track who actually attended.
* **Role-Based Access:** Distinction between Organizers/Admins and regular Attendees.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB (via Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt

---

## 🏗️ Architecture Overview

The project follows a strict **3-Layer Architecture** to ensure Separation of Concerns:

1.  **Controller Layer (`/controllers`):** * "The Receptionist." Handles incoming HTTP requests, validates data, and sends responses.
2.  **Service Layer (`/services`):** * "The Brain." Contains the business logic (e.g., checking if a user is already registered).
3.  **Data Access Layer (`/models`):** * "The Vault." Defines the database schema and communicates directly with MongoDB.

**Data Flow Example:**
`Client Request` → `Route` → `Controller` → `Service` → `Model` → `Database`

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
* [Postman](https://www.postman.com/) (For API testing)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/geekinks/backend](https://github.com/geekinks/backend)
    cd backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the Server**
    ```bash
    # Development mode (with hot reload)
    npm run dev

    # Production build
    npm run build
    npm start
    ```

---

## 🔌 API Endpoints

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user (Organizer/Attendee) |
| `POST` | `/login` | Login and receive a JWT token |

### 2. Events (`/api/events`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get a list of all upcoming events |
| `POST` | `/` | Create a new event (Requires Login) |
| `GET` | `/:id` | Get details of a single event |

### 3. Registration (`/api/registrations`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/:eventId` | Register a user for a specific event |
| `GET` | `/my-events` | See events the logged-in user registered for |

### 4. Attendance (`/api/attendance`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/check-in` | Mark an attendee as "Present" (Staff only) |

---

## 📂 Project Structure

```text
src/
├── config/           # Database connection & env setup
├── controllers/      # Request handlers (req, res)
├── interfaces/       # TypeScript type definitions
├── middlewares/      # Auth checks & Error handling
├── models/           # Mongoose schemas (User, Event, etc.)
├── routes/           # API route definitions
├── services/         # Business logic functions
├── utils/            # Helper functions (e.g., AppError)
└── app.ts            # App entry point