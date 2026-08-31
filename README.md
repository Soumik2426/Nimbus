# Product Management API

A Spring Boot 3.5.x and Java 21 REST API for JWT-based authentication and product management. The project uses Spring Web, Spring Security, Spring Data JPA, Bean Validation, MySQL, ModelMapper, Swagger/OpenAPI, and a standardized `ApiResponse` response envelope.

## Features

- JWT authentication with BCrypt password hashing
- Role-based authorization with `ADMIN` and `USER`
- Product CRUD operations
- Pagination and sorting
- Keyword search and category filtering
- DTO-based request and response layer
- Bean Validation and custom password validation
- Global exception handling
- Standardized `ApiResponse<T>` format
- Swagger/OpenAPI documentation
- Docker and Docker Compose support
- Unit, controller, repository, and security tests

## Tech Stack

- Java 21
- Spring Boot 3.5.x
- Spring Web
- Spring Security
- Spring Data JPA
- Bean Validation
- MySQL
- JJWT
- ModelMapper
- springdoc-openapi
- JUnit 5
- Mockito
- Spring Security Test
- H2 Database (for repository tests)

## Architecture

The application keeps a classic layered flow:

```
Client
   │
   ▼
Controller
   │
   ▼
Service Interface
   │
   ▼
Service Implementation
   │
   ▼
Repository
   │
   ▼
Database
```

Responses follow the reverse flow and are wrapped in `ApiResponse<T>` before reaching the client.

## Folder Structure

- `controller` - REST endpoints
- `service` - service contracts and implementations
- `repository` - JPA repositories
- `entity` - persistence entities
- `dto/request` - incoming request payloads
- `dto/response` - outgoing response payloads
- `security` - JWT filter, token service, and user details integration
- `advice` - global response and exception handling
- `config` - security, mapping, and OpenAPI configuration
- `annotations` - custom validation annotation for passwords
- `exceptions` - custom runtime exceptions

## API Versioning

Versioned endpoints are available under `/api/v1`.

Examples:

- `/api/v1/auth/registerUser`
- `/api/v1/auth/login`
- `/api/v1/products/createProduct`
- `/api/v1/products/getProducts`

The original endpoints are still available for backward compatibility.

## Database Setup

The application expects MySQL.

Required connection variables:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

Example local database URL:

```text
jdbc:mysql://localhost:3306/product_management
```

## Environment Variables

The project supports environment variables directly and through a local `.env` file.

Required or commonly used variables:

- `SPRING_PROFILES_ACTIVE`
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `CORS_ALLOWED_ORIGINS`

A sample file is provided in `.env.example`.

## Running Locally

1. Start MySQL and create the `product_management` database.
2. Set the environment variables or update `.env`.
3. Run the application with Maven.

```bash
mvn spring-boot:run
```

## Running With Docker

Use Docker Compose from the project root:

```bash
docker compose up --build
```

This starts the Spring Boot application and a MySQL container with a persistent volume.

## Swagger URL

After the application starts, open:

```
http://localhost:8080/swagger-ui/index.html
```

## Authentication Flow

1. Register a user with `/api/v1/auth/registerUser`.
2. Login with `/api/v1/auth/login`.
3. Copy the returned JWT token.
4. Send the token as a Bearer token in the `Authorization` header for protected product endpoints.

Example:

```http
Authorization: Bearer <jwt-token>
```

## JWT Usage

- Token type: `Bearer`
- Token is generated at login
- Token is validated by the JWT filter on protected requests
- Security is stateless, so no HTTP session is stored

## Postman Collection

A Postman collection is included at:

```
postman/Product-Management-API.postman_collection.json
```

It includes:

- Register
- Login
- Create Product
- Update Product
- Delete Product
- Get Product By Id
- Get All Products
- Search Products
- Category Filter

## Scalability Notes

See `SCALABILITY.md` for the current architecture explanation and future scaling options.

## Future Improvements

- External secret manager integration
- Redis caching
- Audit logging
- Pagination defaults through configuration
- Broader integration test coverage
- Production database migration strategy
- CI/CD pipeline automation

---

# Live Deployment

The application is deployed and can be accessed online.

## Live Website

**Vercel**

https://product-management-assessment.vercel.app

## Backend API

**Render**

https://product-management-assessment-3ys8.onrender.com

## Swagger Documentation

https://product-management-assessment-3ys8.onrender.com/swagger-ui/index.html

> **Note:** The backend is deployed on Render's free tier. If the application has been idle for some time, the first request may take around 30–60 seconds while the service wakes up.

---

# Administrator Access

Every newly registered user is assigned the **USER** role by default.

If administrator privileges are required for any newly registered account, the role must be **manually updated in the database** from:

```
USER
```

to

```
ADMIN
```

---

## Demo Administrator Credentials

For evaluation and testing purposes, an administrator account has already been created.

**Email**

```text
soumik@gmail.com
```

**Password**

```text
Your@Password123
```

This account has full administrator privileges and can be used to test:

- Product Creation
- Product Update
- Product Deletion
- Product Management Features
- User Role-Based Authorization

> **Note:** These credentials are provided only for demonstration and evaluation purposes. In a production deployment, administrator credentials should be changed immediately and user role management should be performed through a secure administrative interface instead of directly modifying the database.
