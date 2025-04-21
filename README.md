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

   - Create a `.env` file in the backend directory and add the following environment variables:

     ```
     CLIENT_URL=your_client_url
     PORT=your_port
     MONGODB_URI=your_mongo_uri
     BUILD_MODE=your_build_mode
     ACCESS_TOKEN_SECRET_SIGNATURE=your_access_token_secret_signature
     ACCESS_TOKEN_LIFE=your_access_token_life
     REFRESH_TOKEN_SECRET_SIGNATURE=your_refresh_token_secret_signature
     REFRESH_TOKEN_LIFE=your_refresh_token_life
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     BREVO_API_KEY=your_brevo_api_key
     ADMIN_EMAIL_ADDRESS=your_admin_email_address
     ADMIN_EMAIL_NAME=your_admin_email_name
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
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