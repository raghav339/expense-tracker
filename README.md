# Expense Tracker

A full-stack expense tracking application built with **React**, **Vite**, **Node.js**, **Express**, and **MongoDB**.

The application allows users to create an account, sign in, record income and expenses, organize transactions by category, filter transactions by month, view balances, and delete transactions.

## Features

- User registration and login
- Password hashing with bcrypt
- Cookie-based login state
- Add income and expense transactions
- Transaction categories
- Automatic balance calculation
- Monthly transaction filtering
- Delete transactions
- Persistent storage with MongoDB
- React frontend with React Router
- Express REST API

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- CSS

### Backend
- Node.js
- Express 5
- MongoDB
- Mongoose
- bcrypt
- cookie-parser
- CORS
- dotenv
- Nodemon

## Project Structure

```text
expense-tracker/
├── backend/
│   ├── models/
│   │   ├── expenseModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── dataRoutes.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── my-react-app/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── App.jsx
│       │   ├── homepage.jsx
│       │   ├── signin.jsx
│       │   ├── signup.jsx
│       │   ├── logout.jsx
│       │   ├── App.css
│       │   └── index.css
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js 18+ recommended
- npm
- MongoDB database (local MongoDB or MongoDB Atlas)

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd expense-tracker
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

Do not commit `.env` to Git.

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend/my-react-app
npm install
```

## Running the Application

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### Start the frontend

From `frontend/my-react-app`:

```bash
npm run dev
```

Vite normally starts the frontend at:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/signup` | Create a new user |
| POST | `/signin` | Sign in a user |
| GET | `/logout` | Clear the login cookie |
| POST | `/` | Add an expense/income transaction |
| GET | `/` | Retrieve the signed-in user's transactions |
| DELETE | `/` | Delete a transaction |

The frontend communicates with the Express backend using `fetch()` requests and credentials-enabled cookies.

## Data Models

### User

Stores:

- Username
- Hashed password

### Expense

Stores:

- Title
- Amount
- Type (`income` or `expense`)
- Category
- Date
- Username
- Transaction ID

## Available Frontend Commands

Inside `frontend/my-react-app`:

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint.

## Important Configuration Note

The current frontend is configured to communicate with:

```text
http://localhost:3000
```

and the backend CORS configuration allows:

```text
http://localhost:5173
```

If you deploy the application, update these URLs/environment variables so the deployed frontend and backend can communicate correctly.

## Security Notes

- Never commit MongoDB connection strings, passwords, API keys, or other secrets.
- Keep `backend/.env` out of Git.
- Use a strong random `SECRET_KEY` in production.
- For production deployment, configure secure cookie settings and HTTPS.
- Restrict CORS to the deployed frontend domain rather than allowing arbitrary origins.

## Development

This project is structured as two independently runnable applications:

1. `frontend/my-react-app` — React/Vite user interface
2. `backend` — Express/MongoDB API

Run both servers during local development.

## License

This project is available for educational and personal use. Add your preferred license before distributing it publicly.
