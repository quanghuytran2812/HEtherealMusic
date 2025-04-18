# Advanced Spotify Clone

## Overview

The Advanced Spotify Clone is a modern web application that replicates the core functionalities of Spotify using the MERN stack (MongoDB, Express.js, React.ts, Node.js). This application allows users to stream music, manage playlists, and explore a wide range of tracks in a sleek, responsive interface.

## Features

- **User Authentication**: Secure login and registration with JWT (JSON Web Tokens).
- **Music Streaming**: Stream audio tracks with intuitive playback controls.
- **Playlist Management**: Create, edit, and delete personalized playlists.
- **Search Functionality**: Search for tracks, albums, and artists seamlessly.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Updates**: Implemented using WebSockets for live notifications.

## Tech Stack

- **Frontend**: React.ts, Zustand, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel, MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account (or a local MongoDB instance)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/quanghuytran2812/HEtherealMusic.git
   cd advanced-spotify-clone
   ```

2. **Set Up Backend**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file in the backend directory and add your MongoDB URI and JWT secret:

     ```
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_jwt_secret
     ```

   - Start the server:

     ```bash
     npm run dev
     ```

3. **Set Up Frontend**

   - Navigate to the frontend directory:

     ```bash
     cd ../frontend
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the React application:

     ```bash
     npm start
     ```

### Usage

- Open your browser and navigate to `http://localhost:5170`.
- Sign up or log in to start exploring music and creating playlists.

## Deployment

To deploy the application:

1. Push your code to a GitHub repository.
2. Deploy the backend on Vercel:
   - Create a new Vercel app.
   - Set the necessary environment variables for MongoDB and JWT.
   - Deploy your backend code.
3. For the frontend, use platforms like Vercel or Netlify to host the React app.
4. Ensure that the frontend is configured to connect to the deployed backend URL.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Thanks to the open-source community for their contributions and resources.
- Inspired by the design and functionality of Spotify.