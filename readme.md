# Open Remote Peer To Peer Chat Application

This repository contains the codebase for the Open Remote Assessment - Peer to Peer Chat Application

> [!NOTE]
> This project was built to run In-Memory. No data is stored to disk as there is no database service present in the project. All data is stored in and retrieved from memory so while running the program please note that any refreshes on the server process will cause the application to lose all data stored.

## Technologies Used

-   NodeJS
    -   ExpressJS
    -   JsonWebToken
    -   TCP Sockets
-   ReactJS

## Packages Used

-   React-Hot-Toast
-   Socket.IO
-   Socket.IO-Client
-   Zustand
-   Styled-Components
-   MomentJS
-   Axios
-   Cors
-   Body-Parser

## Architecture

-   Global State Management
-   Singleton Services
-   MVC
-   Monolith Application
-   Single Object Responsibility Principle

# Running the Application

To begin, download the source code and make sure you have `nodejs` and `npm` installed on your machine. This will be useful in installing our needed dependencies from the package.json file.

## Frontend

-   [ ] Open up a terminal in the root folder
-   [ ] `cd` into the `client` folder
-   [ ] `cd` into the `chatapp` folder
-   [ ] Run `npm install`
-   [ ] Create a `.env` file in the root folder
-   [ ] Copy the contents of `.env.example` into `.env`
-   [ ] Point the API URL to the backend address suffixed with `/api` and the SOCKET URL to the backend address
-   [ ] Run `npm start`

> [!NOTE]
> The Client is now up and running!

## Backend

-   [ ] Open up a terminal in the root folder
-   [ ] `cd` into the `server` folder
-   [ ] Run `npm install`
-   [ ] Create a `.env` file in the root folder
-   [ ] Copy the contents of `.env.example` into `.env`
-   [ ] Specify a JWT SECRET and also point the CLIENT ORIGIN to the frontend address
-   [ ] Run `npm run dev`

> [!NOTE]
> The Server is now up and running! You should see some basic `PORT` information logged to the console.

## Application Features

-   Authentication - SignIn/SignUp
-   Multiple simultaneous connections
-   Contact Online/Offline Status
-   Contact Search By Email/Phone Number
-   New Message Notification
-   Swift Data Retrieval
-   No I/O Disk Operations
-   Network Offline Status Notification
-   Real-time Data Exchange and Update
-   Graceful Error Handling

Now the application is running. Visit the frontend in the browser and signup.
