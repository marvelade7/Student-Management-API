# Student Management API

A GraphQL-powered Student Management API built with **Node.js**, **Express.js**, **GraphQL**, and **MongoDB**. The project demonstrates modern GraphQL concepts such as queries, mutations, input types, validation, and MongoDB relationships while following a scalable project structure.

## Features

### Student Management
- Create a student
- Update student details
- Delete a student
- Get a student by ID
- Get all students

### GraphQL
- GraphQL Queries
- GraphQL Mutations
- GraphQL Input Types
- Custom Validation
- Nested GraphQL Types (coming soon)

### Data Validation
- Required field validation
- Email format validation
- Level validation
- Age validation
- Duplicate email check
- Duplicate matric number check
- Department existence validation

### Database
- MongoDB
- Mongoose ODM
- One-to-Many Relationships (Department → Students)

### Seeder
- Generates sample university data using Faker
- Creates:
  - 4 Faculties
  - 12 Departments
  - 300 Students

---

## Tech Stack

- Node.js
- Express.js
- GraphQL
- express-graphql
- MongoDB
- Mongoose
- Faker.js
- Dotenv

---

## Project Structure

```
student-management-api/
│
├── graphql/
│   ├── mutations/
│   ├── queries/
│   ├── types/
│   └── schema.js
│
├── models/
│   ├── student.model.js
│   ├── department.model.js
│   └── faculty.model.js
│
├── seed/
│   ├── faculties.js
│   ├── departments.js
│   └── seed.js
│
├── server.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management-api.git
```

Move into the project directory

```bash
cd student-management-api
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server

```bash
npm start
```

Or with Nodemon

```bash
npm run dev
```

---

## Seed the Database

Populate the database with sample data.

```bash
npm run seed
```

This creates:

- 4 Faculties
- 12 Departments
- 300 Students

---

## Example Mutation

```graphql
mutation {
  createStudent(
    input: {
      firstName: "John"
      lastName: "Doe"
      email: "john@example.com"
      gender: "Male"
      age: 20
      matricNumber: "CSC-2026-001"
      level: 300
      department: "DEPARTMENT_ID"
    }
  ) {
    id
    firstName
    lastName
    email
    matricNumber
  }
}
```

---

## Current Models

### Student

- firstName
- lastName
- email
- gender
- age
- phoneNumber
- matricNumber
- department
- level
- cgpa
- isActive

### Department

- name
- faculty

### Faculty

- name

---

## Roadmap

- [x] GraphQL CRUD Operations
- [x] GraphQL Input Types
- [x] Custom Validation
- [x] MongoDB Relationships
- [x] Database Seeder
- [ ] Nested GraphQL Resolvers
- [ ] Authentication (JWT)
- [ ] Authorization
- [ ] Filtering
- [ ] Sorting
- [ ] Pagination
- [ ] Search
- [ ] GraphQL Context
- [ ] Apollo Server Migration
- [ ] Unit & Integration Testing
- [ ] Docker Support

---

## Learning Goals

This project is being built as a practical exploration of GraphQL and MongoDB, covering:

- GraphQL Schema Design
- Queries & Mutations
- Input Types
- Validation
- MongoDB Relationships
- Data Seeding
- Authentication
- Pagination
- Filtering
- Performance Optimization
- Production-ready API Design

---

## License

This project is licensed under the MIT License.