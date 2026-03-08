# Spring Boot CRUD API

A simple CRUD (Create, Read, Update, Delete) API built with Spring Boot and Maven.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Project Structure

```
java/
├── pom.xml
├── .gitignore
├── src/
│   ├── main/
│   │   ├── java/com/example/crudapi/
│   │   │   ├── CrudApplication.java
│   │   │   ├── controller/
│   │   │   │   ├── ItemController.java
│   │   │   │   └── HealthController.java
│   │   │   ├── model/
│   │   │   │   └── Item.java
│   │   │   └── repository/
│   │   │       └── ItemRepository.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
```

## Building

```bash
mvn clean install
```

## Running

```bash
mvn spring-boot:run
```

Or run the JAR file:

```bash
java -jar target/crud-api-1.0.0.jar
```

The server will start on `http://localhost:8080`

## API Endpoints

### Health Check
- `GET /health` - Returns application health status

### Items CRUD
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `POST /api/items` - Create a new item
  - Body: `{ "name": "Item Name", "description": "Optional description" }`
- `PUT /api/items/{id}` - Update an item
  - Body: `{ "name": "Updated Name", "description": "Updated description" }`
- `DELETE /api/items/{id}` - Delete an item

## Example Requests

### Create an item
```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "My Item", "description": "A test item"}'
```

### Get all items
```bash
curl http://localhost:8080/api/items
```

### Update an item
```bash
curl -X PUT http://localhost:8080/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "Updated description"}'
```

### Delete an item
```bash
curl -X DELETE http://localhost:8080/api/items/1
```

### Health check
```bash
curl http://localhost:8080/health
```

## Database

The application uses an in-memory H2 database. Data persists only during the current session.

### H2 Console

Access the H2 console at `http://localhost:8080/h2-console`
- URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave blank)

## CI/CD

This project is configured for GitHub Actions CI workflows. The `.gitignore` file ensures build artifacts and IDE files are excluded from version control.

## Technologies

- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Maven
