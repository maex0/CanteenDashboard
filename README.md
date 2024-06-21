# Software Quality with Cats

![GitHub Workflow Status](https://github.com/maex0/SoftwareQualityWithCats/actions/workflows/ci.yml/badge.svg)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=maex0_SoftwareQualityWithCats&metric=bugs)](https://sonarcloud.io/summary/new_code?id=maex0_SoftwareQualityWithCats)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=maex0_SoftwareQualityWithCats&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=maex0_SoftwareQualityWithCats)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=maex0_SoftwareQualityWithCats&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=maex0_SoftwareQualityWithCats)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=maex0_SoftwareQualityWithCats&metric=coverage)](https://sonarcloud.io/summary/new_code?id=maex0_SoftwareQualityWithCats)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=maex0_SoftwareQualityWithCats)](https://sonarcloud.io/summary/new_code?id=maex0_SoftwareQualityWithCats)

## Description

Welcome to _SoftwareQualityWithCats_, a project that was developed in the second semester of my Masters's degree at the [TH Rosenheim](https://www.th-rosenheim.de) in the module **Software Quality Assurance**.

A detailed description of the architecture and structure of this project can be found in the [wiki](https://github.com/maex0/SoftwareQualityWithCats/wiki).

The Cat API [https://thecatapi.com](https://thecatapi.com) is used for this project.

## Table of Contents

1. [Installation](#installation)
2. [Scripts](#scripts)
3. [Configuration](#configuration)
4. [Contributing](#contributing)
5. [License](#license)

## Installation

Follow these steps to set up the project on your local machine.

### Prerequisites

- [Node.js 18.17](https://nodejs.org/) or later (I used [npm](https://www.npmjs.com/) for this project)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [pdAdmin ](https://www.pgadmin.org/)(not mandatory)

### Docker Compose

To run the application using Docker Compose:

1. Clone the repository:

   ```bash
   git clone https://github.com/maex0/SoftwareQualityWithCats.git
   cd SoftwareQualityWithCats
   ```

2. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This command builds the images if they do not exist and starts the containers defined in your `docker-compose.yml`.

3. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Local Development

To run the application locally in development mode:

1. Navigate to the `next` directory:

   ```bash
   cd next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will start on [http://localhost:3000](http://localhost:3000). The page will reload if you make edits.

### Production

To build the application for production:

```bash
npm run build
```

This will create an optimized build of the application in the `.next` directory.

To start the production server:

```bash
npm start
```

## Scripts

Here are some of the most useful scripts you can run:

- `dev`: Runs the application in development mode.
- `build`: Builds the application for production.
- `start`: Starts the application in production mode.
- `lint`: Lints the codebase for potential errors and formatting issues.

## Configuration

I used two different configuaration files (`.env` files). One inside the root directory for the postgres database, and the other one inside the next folder for specific frontend or backend related configurations.

These are the environment variables used inside the root folder:

```env
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
```

These are the environment variables used inside the next folder:

```env
DATABASE_URL=your_database_url
API_KEY=your_api_key
API_URL=your_api_url
FAVORITE_COUNT=your_favorite_count
```

These variables need to be set in order to run the application correctly.

## Contributing

Contributions are welcome! Please follow the following contribution guidelines when submitting pull requests.

1. Fork the repository.
2. Create your feature branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
