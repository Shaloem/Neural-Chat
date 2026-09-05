# NeuralChat: Advanced Multi-Session AI Chat Interface

NeuralChat is a high-performance, full-stack AI chatbot platform built using Node.js, Express, and SQLite. It features a premium "Glassmorphism" design and integrates the Groq Cloud SDK (Llama 3.1 8B parameter model) for near-instant, context-aware AI conversations.

## Key Features

- **Premium UI:** Sleek, modern dark-mode interface with glassmorphism and smooth animations.
- **Multi-Session Conversations:** Support for creating, renaming, and deleting multiple independent chat threads.
- **AI Intelligence:** Powered by Groq Cloud for ultra-fast, intelligent responses.
- **Contextual Memory:** The AI maintains context within each chat session for coherent long-term conversations.
- **Secure Authentication:** JWT-based user login and registration system with Bcrypt password hashing.
- **Data Persistence:** Relational SQLite database ensuring all messages and sessions are stored locally.

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (Local)
- **AI Engine:** Groq Cloud SDK (Llama 3.1 8B)
- **Security:** JSON Web Tokens (JWT) & Bcrypt
- **Frontend:** Vanilla HTML5, CSS3 (Premium Design System), Asynchronous JavaScript (Fetch API)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shaloem/Neural-Chat.git
   cd NodeJSProject
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5000`.

---
*Created for Project Demonstration Purposes.*
