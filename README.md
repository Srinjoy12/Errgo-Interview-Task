# Errgo Code Assessment - Completed

This repository contains the completed solution for the Errgo code assessment. The project consists of a `Frontend` (React/Vite) and a `Backend` (Express/Node.js), which work together to provide a full-stack application experience.

All original `TODO` items have been addressed, and the optional bonus task has been fully implemented.

---

## Features Implemented

### Core Task: Project Management
- **Create Projects**: Users can create new projects by providing a name and description through a form on the frontend.
- **View Projects**: Newly created projects are sent to the backend, stored in memory, and can be viewed on a dedicated project details page.
- **Full Round-Trip**: A complete data flow has been established, from the user interface to the backend API and back.

### Bonus Task: Live Chat
- **Real-Time Messaging**: A live chat page has been implemented using WebSockets (`ws` package).
- **Single Session Chat**: All connected users can communicate in a single, shared chat room.
- **Message History**: The backend stores the chat history in memory, and new users receive the full conversation history upon connecting.
- **Modern UI**: The chat interface has been styled to be modern, centered, and user-friendly.

---

## Getting Started

To run this project, you will need to start both the backend and frontend servers in separate terminal sessions.

### 1. Running the Backend

```bash
# Navigate to the backend directory
cd Backend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The backend server will be running at `http://localhost:3000`.

### 2. Running the Frontend

```bash
# Navigate to the frontend directory
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend application will be available at `http://localhost:5173`.

---

## Project Structure

- **`/Backend`**: Contains the Express.js server, which provides a REST API for project management and a WebSocket server for the live chat.
- **`/Frontend`**: Contains the React application, built with Vite. It includes pages for project creation, project details, and the live chat.

Work was completed with a focus on clean code, conciseness, and clear documentation.

---

**Author:** Srinjoy Roy

