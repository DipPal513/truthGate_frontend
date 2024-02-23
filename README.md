# TruthGate Frontend Documentation

## Introduction
Welcome to the TruthGate frontend documentation! TruthGate is a social media application built using React.js and Redux. This documentation provides an overview of the frontend structure, features, and how to use them.

## Features
1. **Authentication**
   - Users can securely log in to their accounts.
   - Logout functionality is available to safely log out users.

2. **News Feed**
   - Users can view a personalized news feed displaying posts from people they follow.
   - Posts are displayed in chronological order, with the latest posts appearing at the top.

3. **Interactions**
   - Users can like and comment on posts.
   - Real-time updates are provided when other users interact with posts.

4. **User Search**
   - Users can search for other users by their usernames.
   - Search results are displayed in real-time as users type their queries.

5. **Profile Management**
   - Users can add/edit their bio information to provide additional details about themselves.
   - Profile deletion functionality is available to permanently delete user accounts.

6. **Dark and Light Mode**
   - TruthGate supports both dark and light modes to enhance user experience.
   - Users can toggle between modes based on their preference.

## Technologies Used
- React.js: A JavaScript library for building user interfaces.
- Redux: A predictable state container for managing application state.
- Axios: A promise-based HTTP client for making requests to the backend API.
- React Router: A routing library for navigating between different pages in a React application.
- React-Redux: Official Redux bindings for React to manage state in React components.

## Folder Structure
The frontend codebase follows a standard folder structure to maintain organization and modularity.

truthgate-frontend/

├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Individual pages of the application
│ ├── redux/ # Redux setup and features
│ │── styles/ # Global styles and styling variables
│ ├── utils/ # Utility functions and helpers
│ ├── App.js # Root component of the application
│ └── main.js # Entry point of the application
│
├── public/ # Public assets and index.html
├── .gitignore # Git ignore file
├── package.json # Package configuration file
└── README.md # Project README file

## Getting Started
To run the TruthGate frontend locally, follow these steps:
1. Clone the repository from GitHub: `git clone <repository-url>`.
2. Navigate to the project directory: `cd truthgate-frontend`.
3. Install dependencies: `npm install`.
4. Start the development server: `npm start`.
5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing
Contributions to the TruthGate frontend are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request on GitHub.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact
For any inquiries or support, please contact the project maintainer:
- Name: Dip Pal
- Email: dip.pal.513@gmail.com

Thank you for using TruthGate! We hope you enjoy the experience.
