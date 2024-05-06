# 4. Use PostgreSQL for storage

**Date:** 2024-05-06

## Status

Accepted

## Context

The project requires a local database to store cat images with an associated boolean value. The database should support development and testing with consistent behavior across environments. PostgreSQL is a powerful, open-source relational database that provides advanced features and robustness for storing various data types. Hosting the database within a Docker container ensures portability and consistent configuration.

**Key motivations for this decision include:**

1. **Scalability:** PostgreSQL supports a variety of data types and provides indexing, transaction handling, and performance features that can efficiently handle the required data.

2. **Community Support:** PostgreSQL has comprehensive documentation and community support, making it easier to troubleshoot and find solutions.

3. **Data Compatibility:** PostgreSQL is compatible with most ORMs and programming languages, enabling smooth integration with the existing stack.

## Decision

**PostgreSQL** will be used as the database system for storing cat images, with Docker used to host the PostgreSQL instance. The database will have a schema with columns for storing the image data (or file path) and a boolean value to associate additional information.

A `docker-compose.yml` file will be used to set up the Docker environment, and the table schema will include a primary key, a column for the binary image data (or file path), and a boolean column for tagging.

## Consequences

1. **Positive Impacts:**

   - **Development Efficiency:** Docker facilitates consistent setups, reducing onboarding time and enabling easier replication across environments.
   - **Data Management:** PostgreSQL's advanced features allow efficient data storage, querying, and indexing.
   - **Reliability:** PostgreSQL offers ACID compliance, ensuring data consistency and fault tolerance.

2. **Negative Impacts:**
   - **Learning Curve:** Developers unfamiliar with Docker or PostgreSQL might need time to learn these technologies.
   - **Performance Considerations:** Direct binary storage in the database can cause performance bottlenecks. Alternative approaches like storing file paths may be needed.
   - **Resource Usage:** Docker containers can consume significant disk and memory resources, particularly with larger datasets.

The project will benefit from using PostgreSQL in Docker, given the consistency, flexibility, and scalability requirements. The decision will be revisited as necessary based on the project's evolving needs.
