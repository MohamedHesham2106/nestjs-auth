# NestJS Lab 2 - Users Authentication and Profile API

## Overview

This project is a NestJS-based application **that** provides user authentication and profile management functionalities. It includes features such as user registration, login, profile retrieval, and more. The application is built with modularity and scalability in mind, leveraging MongoDB as the database and JWT for authentication.

## Features

- **User Authentication**: Sign-up and sign-in functionalities with password hashing and JWT-based authentication.
- **User Profile Management**: Retrieve user profile and list all users except the logged-in user.
- **Validation and Error Handling**: Input validation using `class-validator` and global exception handling.
- **API Documentation**: Swagger integration for API documentation.

## Project Structure

```
eslint.config.mjs
nest-cli.json
package.json
README.md
tsconfig.build.json
tsconfig.json
src/
  app.module.ts
  main.ts
  dtos/
    create-user.dto.ts
    login-user.dto.ts
  exceptions/
    http-exception.filter.ts
  middleware/
    auth.middleware.ts
  modules/
    auth/
      auth.controller.ts
      auth.module.ts
      auth.service.ts
    user/
      users.controller.ts
      users.module.ts
      users.service.ts
  schemas/
    user.schema.ts
  types/
    jwt.types.ts
    response.types.ts
    user.types.ts
```

### Key Directories and Files

- **`src/app.module.ts`**: The root module of the application.
- **`src/main.ts`**: The entry point of the application.
- **`src/dtos/`**: Contains Data Transfer Objects for request validation.
- **`src/exceptions/`**: Custom exception filters for error handling.
- **`src/middleware/`**: Middleware for request processing, including authentication.
- **`src/modules/`**: Contains feature modules (`auth` and `user`).
- **`src/schemas/`**: Mongoose schemas for database models.
- **`src/types/`**: Shared TypeScript types used across the application.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lab2
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRES_IN=<token-expiration-time>
   ```

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the application:
   ```bash
   npm run start:prod
   ```

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs` after starting the application. It is generated using Swagger and provides details about all available endpoints.

## Testing

Run unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## Scripts

- **`npm run start`**: Start the application.
- **`npm run start:dev`**: Start the application in development mode with hot-reloading.
- **`npm run start:prod`**: Start the application in production mode.
- **`npm run build`**: Build the application.
- **`npm run test`**: Run unit tests.
- **`npm run test:e2e`**: Run end-to-end tests.
- **`npm run lint`**: Run ESLint to check for code quality issues.
- **`npm run format`**: Format the code using Prettier.

## Dependencies

- **NestJS**: Framework for building scalable server-side applications.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: JSON Web Token for authentication.
- **Bcrypt**: Library for hashing passwords.
- **Class-Validator**: Validation library for TypeScript.
