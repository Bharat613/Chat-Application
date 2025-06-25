Real-Time Chat Application

This is a full-stack Real-Time Chat Application built using React for the frontend and Node.js with Express and Socket.IO for the backend. It allows users to join chat rooms and communicate instantly in real time.

Features

- Basic user login with room name (no authentication)
- Real-time messaging using WebSockets (Socket.IO)
- Maintains chat history during active sessions
- Displays all active users in the room
- Shows online status and room data
- Fully responsive design for mobile and desktop
- Deployed on Vercel (frontend) and Render (backend)

Technologies Used

Frontend:
- React.js
- React Router
- CSS
- Socket.IO Client

Backend:
- Node.js
- Express.js
- Socket.IO
- CORS
- dotenv

Project Structure

Real-Time-ChatApp/
├── client/        React Frontend
│   └── src/
│       └── components/
│           ├── Chat/
│           ├── InfoBar/
│           ├── Input/
│           ├── Messages/
│           └── TextContainer/
│
├── server/        Node Backend
│   ├── index.js
│   ├── users.js
│   ├── router.js
│   └── .env

How to Run Locally

1. Clone the Repository

git clone https://github.com/Bharat613/Chat-Application.git
cd Chat-Application

2. Install Backend Dependencies

cd server
npm install

3. Create .env File in server/

PORT=5000

4. Start Backend

npm start

5. Install Frontend Dependencies

cd ../client
npm install

6. Create .env File in client/

REACT_APP_BACKEND_URL=http://localhost:5000

7. Start Frontend

npm start

Live Demo

Frontend: https://chat-application-your.vercel.app
Backend: Hosted on Render

Architecture and Flow

1. User enters their name and room, then is redirected to the chat page.
2. Socket connects to the backend server.
3. Backend tracks users using addUser and manages chat rooms.
4. All messages are exchanged using Socket.IO in real-time.
5. User list and messages are updated live in the UI.
6. On disconnect, the backend removes the user and updates the room data.

Optional Features (Bonus)

- Typing indicators (to be added)
- Online status (implemented)
- Deployment to cloud platforms (done)

Author

Bharat Siva  
GitHub: https://github.com/Bharat613

License

This project is open-source and free to use.
