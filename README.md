# 🎓 Student Management API

A GraphQL-powered Student Management API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

This project demonstrates how to build a scalable GraphQL backend from scratch, covering CRUD operations, validation, relationships between collections, custom GraphQL types, and input types.

---

## 🚀 Features

### Students
- Create a student
- Update student information
- Delete a student
- Get a single student
- Get all students

### Departments
- Create a department
- Update department
- Delete department
- Get a department
- Get all departments

### Faculties
- Create a faculty
- Update faculty
- Delete faculty
- Get a faculty
- Get all faculties

### Relationships
- Student belongs to a Department
- Department belongs to a Faculty
- Faculty has many Departments

### Validation
- Required field validation
- Email format validation
- Level validation
- Age validation
- Duplicate email check
- Duplicate matric number check
- Department existence validation before creating a student

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- GraphQL
- MongoDB
- Mongoose
- GraphiQL

---

## 📁 Project Structure

```text
student-management-api/
│
├── graphql/
│   ├── mutations/
│   │   ├── studentMutations.js
│   │   ├── departmentMutations.js
│   │   └── facultyMutations.js
│   │
│   ├── queries/
│   │   ├── studentQueries.js
│   │   ├── departmentQueries.js
│   │   └── facultyQueries.js
│   │
│   ├── types/
│   │   ├── studentType.js
│   │   ├── departmentType.js
│   │   ├── facultyType.js
│   │   ├── studentInputType.js
│   │   ├── departmentInputType.js
│   │   └── facultyInputType.js
│   │
│   └── schema.js
│
├── models/
│   ├── student.model.js
│   ├── department.model.js
│   └── faculty.model.js
│
├── config/
│   └── db.js
│
├── seed.js
├── server.js
├── .env
└── package.json
```

---

## 📊 Database Relationships

```
Faculty
   │
   ├──────────────┐
   │              │
Department     Department
   │              │
   │              │
Student       Student
```

Example:

```
Faculty of Science
        │
        ├── Computer Science
        │      ├── Cooper
        │      ├── James
        │      └── Sarah
        │
        └── Mathematics
               ├── David
               └── John
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/student-management-api.git
```

Move into the project

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
MONGODB_URI=your_mongodb_connection_string
```

Start the server

```bash
npm run dev
```

GraphQL Playground

```
http://localhost:5000/graphql
```

---

## Example Queries

### Get all students

```graphql
query {
  students {
    id
    firstName
    lastName
    email
    department {
      name
      faculty {
        name
      }
    }
  }
}
```

---

### Create a Student

```graphql
mutation {
  createStudent(
    input: {
      firstName: "John"
      lastName: "Doe"
      email: "john@example.com"
      gender: "Male"
      age: 20
      level: 300
      matricNumber: "CSC-2026-001"
      department: "departmentId"
    }
  ) {
    id
    firstName
    lastName
    department {
      name
    }
  }
}
```

---

### Create a Department

```graphql
mutation {
  createDepartment(
    input: {
      name: "Computer Science"
      faculty: "facultyId"
    }
  ) {
    id
    name
  }
}
```

---

### Create a Faculty

```graphql
mutation {
  createFaculty(
    input: {
      name: "Faculty of Science"
    }
  ) {
    id
    name
  }
}
```

---

## Seed Database

Populate the database with sample faculties, departments, and students.

```bash
node seed.js
```

---

## Current Progress

- [x] GraphQL Setup
- [x] Student CRUD
- [x] Department CRUD
- [x] Faculty CRUD
- [x] MongoDB Relationships
- [x] Input Types
- [x] Custom Object Types
- [x] Validation
- [x] Seed Script

---

## Upcoming Features

- Authentication (JWT)
- Authorization (Roles)
- Pagination
- Filtering
- Searching
- Sorting
- GraphQL Enums
- GraphQL Interfaces
- GraphQL Unions
- Custom Directives
- DataLoader (N+1 Query Optimization)
- Unit & Integration Tests
- Docker Support
- API Documentation
- Deployment

---

## Author

**Marvellous Adewuyi**

- GitHub: https://github.com/marvelade7
- LinkedIn: https://linkedin.com/in/marvellous-adewuyi-a32070278

---

## License

This project is licensed under the MIT License.