# MTG Lore Encyclopedia

## Overview

The **MTG Lore Encyclopedia** is a comprehensive web application that allows users to explore the rich and intricate lore of Magic: The Gathering (MTG). This application provides detailed information on characters and planeswalkers from the MTG universe, including their relationships, histories, and abilities. The application is built using React for the frontend and Apollo Server with Neo4j for the backend, ensuring a robust and scalable architecture.

## Features

- **Character List and Detail Pages**: Browse and view detailed information about various characters in the MTG universe.
- **Planeswalker List and Detail Pages**: Explore the powerful planeswalkers, their abilities, and their histories.
- **Search Functionality**: Easily search for characters and planeswalkers by name.
- **Relationship Visualization**: See the complex relationships between different characters and planeswalkers.
- **3D Graph Visualization**: Interactive 3D visualization of the Neo4j graph database showcasing the connections between characters and planeswalkers.
- **Home Page**: A welcoming home page with links to navigate to characters and planeswalkers.

## Technologies Used

- **Frontend**: React, Apollo Client, react-force-graph-3d
- **Backend**: Apollo Server, Neo4j
- **Development Tools**: Visual Studio Code, Concurrently
- **Deployment**: Neo4j Aura, Local Development

## Installation

### Prerequisites

- Node.js
- npm
- Neo4j Aura instance (or local Neo4j instance)
- Visual Studio Code

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/mtg-lore-encyclopedia.git
   cd mtg-lore-encyclopedia
   ```
2. **Install Dependencies**
    ```bash
    npm install
    cd client
    npm install
    cd ../server
    npm install
    cd ..
    ```
3. **Configure Environment Variables**
    
    Create a .env file in the root directory and add the following variables:
    ```env
    REACT_APP_NEO4J_URI=neo4j+s://<your-neo4j-uri>
    REACT_APP_NEO4J_USER=<your-neo4j-username>
    REACT_APP_NEO4J_PASSWORD=<your-neo4j-password>
    ```
4. **Seed the Database**

    Open the Neo4j Browser for your Aura instance via the Neo4j Aura dashboard, log in with your credentials, and run the provided Cypher commands in the seed.cypher file to populate the database with initial data.

5. **Run the Application**

    Use Concurrently to run both the server and client concurrently:
    ```bash
    npm run dev
    ```

    Alternatively, you can start the server and client separately:
    ```bash
    # In one terminal window
    cd server
    npm start

    # In another terminal window
    cd client
    npm start

    ```

6. **Access the Application**

    Open your web browser and navigate to http://localhost:3000 to access the MTG Lore Encyclopedia.

## Usage
- **Home Page**: Start exploring by navigating to the home page and choosing either characters or planeswalkers.
- **Search**: Use the search bar to quickly find specific characters or planeswalkers by name.
- **Character/Planeswalker Pages**: Click on any character or planeswalker to view detailed information about them, including their abilities, lore, and relationships.
- **Relationships**: Visualize the relationships between different characters and planeswalkers.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or create a pull request.

## License
This project is licensed under the MIT License. 

## Acknowledgments
- Special thanks to the Magic: The Gathering community for the rich lore and inspiring characters.
- This project uses the Neo4j database for storing and querying data.
- **Note**: This project is for educational and entertainment purposes. Magic: The Gathering is a trademark of Wizards of the Coast.