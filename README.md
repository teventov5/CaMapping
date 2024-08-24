# CaMapper

CaMapper is an interactive map application designed to help campers find suitable camping locations across Israel. Developed during the COVID-19 pandemic, it provides an essential tool for travelers looking for safe and accessible camping spots.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Overview

CaMapper is designed to provide an interactive map displaying potential camping locations within Israel. It aggregates data to make camping spot information readily available to the hiking community. Key functionalities include map markers for camping locations, user registration and login, and administrative controls for managing data.

## Features

- **User Registration & Login**: Users can register and log in to access the map and manage their accounts. Password recovery is available through a security question.
- **Interactive Map**: Displays camping locations with detailed information including amenities, cost, fire regulations, and facilities.
- **Detailed Location Information**: Click on map markers to view more information about specific camping spots, including images and additional details.
- **Distance Calculation**: Users can check the distance between their current location and a selected camping spot.
- **Admin Controls**: Administrators can manage user accounts, add new camping locations, and remove users.

## Technology Stack

- **Frontend**: HTML, JavaScript
- **Backend**: Node.js with Express
- **API**: Google Maps API for map integration
- **Database**: MySQL for user management and camping location data

## Getting Started

### Prerequisites

To run this project locally, you will need:

- **Node.js**
- **npm**
- **Google Maps API Key**
- **MySQL Database**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/teventov5/CaMapper.git
2. **Install Frontend Dependencies:**:
   ```bash
	cd CaMapping
	npm install


4. **Set Up the Database:**:
   ```bash
	 - Create a MySQL database.
	 - Import the database schema from the database folder in the backend project.
	 - Configure the database connection in the config.js file.
	
5. **Configure Google Maps API:**:
   ```bash
	 - Obtain an API key from Google Cloud.
	 - Add your API key to the config.js file in the frontend project.
	
6. **Running the Application:**:
   ```bash
	cd CaMapping
	npm start server.js

## Usage

After installation, users can register or log in to access the map. They can view and interact with markers for camping locations, check detailed information, and calculate distances. Admins have additional features for managing users and locations.

## Contributing

Contributions are welcome! If you have suggestions, feature requests, or issues, please open a pull request or issue on the [GitHub repository](https://github.com/teventov5/CaMapper).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

- **Google Maps API** for providing the mapping service.
- **MySQL** for database management.
- **Node.js and Express** for backend development.
