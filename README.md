# Secure MERN Authentication System

A robust, full-stack application demonstrating secure user registration, login, and session persistence using the MERN stack (or similar Node.js/React architecture).

## ✨ Key Features

* **Token-Based Authentication (JWT):** Securely manage user sessions.
* **Password Hashing:** Implements `bcrypt` for secure password storage.
* **Persistent Login:** Maintains user session across page refreshes using local storage and token verification.
* **Global Auth Context:** Uses React Context API (`useAuth`) for easy state access across components.
* **RESTful API:** Clear separation of client and server logic.
* **Robust Error Handling:** Client-side Axios interceptors and server-side responses for clear error messages.

## 🛠️ Technologies Used

### Backend (Server)
* **Node.js & Express:** Runtime environment and web framework.
* **MongoDB & Mongoose:** Database and ODM for data persistence.
* **Bcrypt:** For secure password hashing.
* **JSON Web Tokens (JWT):** For session creation and verification.
* **CORS:** Middleware for enabling cross-origin requests.

### Frontend (Client)
* **React:** JavaScript library for building user interfaces.
* **React Router:** For client-side navigation.
* **Axios:** HTTP client for API requests.
* **React Context API & Hooks:** For state management (`useState`, `useEffect`, `useContext`).

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (v14+)
* MongoDB instance (local or remote)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd secure-mern-auth
    ```

2.  **Install dependencies for both client and server:**
    ```bash
    # Assuming your backend is in the root directory
    npm install 
    
    # Assuming your frontend is in a 'client' or 'app' directory
    # cd client
    # npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    npm start # Or node index.js
    ```
    The server will run on `http://localhost:5000`.

2.  **Start the Frontend Client:**
    ```bash
    # Navigate to your client directory (if applicable)
    npm run dev # Or npm start
    ```
    The client will run, typically on `http://localhost:5000`.

## ⚙️ API Endpoints

All endpoints are prefixed with `/api/auth`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Creates a new user account. |
| `POST` | `/api/auth/login` | Authenticates a user and returns a JWT. |
| `GET` | `/api/auth/verifyToken` | Verifies the token and retrieves user details for session persistence. |

---

## 🤝 Contribution

Feel free to fork the repository and contribute!
