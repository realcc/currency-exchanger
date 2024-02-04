# Currency Exchanger

Currency Exchanger is a feature-rich currency converter application developed using Angular. It allows users to convert currencies, view historical data, and explore details of different currency pairs.

## Features

- **Currency Conversion:** Convert currencies with ease.
- **Currency Details:** Explore details of specific currency pairs.
- **Historical Data:** View historical exchange rates through charts.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Docker Desktop installed on your machine.
- Fixer API Key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/realcc/currency-exchanger.git
   ```

2. Navigate to the project directory:

   ```bash
   cd currency-exchanger
   ```

3. Run Docker setup:

   ```bash
   make docker-up
   ```

   This command will build and run the Docker containers.

4. Open your browser and navigate to http://localhost/.

## Project Structure

- src/app/pages/home: Contains the main component and template for the home page.
- src/app/pages/detail: Detail component for displaying specific currency pair details.
- src/app/services: Currency service for managing currency-related data.
- src/app/models: Contains data models.

## Dependencies

- Angular
- RxJS
- Other dependencies as listed in package.json