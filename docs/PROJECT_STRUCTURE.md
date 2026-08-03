# Project Structure

## Store Management System

This document describes the folder structure, architecture, and responsibilities of each component in the Store Management System project.

---

# Project Architecture

```
Store Management System
│
├── backend/
├── frontend/
├── docs/
├── README.md
├── LICENSE
└── .gitignore
```

---

# Backend

```
backend/
```

The backend is developed using:

- Python 3.12
- FastAPI
- SQLAlchemy 2.0
- Alembic
- MySQL
- JWT Authentication

---

## Backend Structure

```
backend/
│
├── alembic/
├── app/
├── tests/
├── venv/
├── .env
├── alembic.ini
├── requirements.txt
└── main.py
```

---

## app/

```
app/
│
├── api/
├── core/
├── db/
├── models/
├── repositories/
├── schemas/
├── services/
├── middleware/
├── utils/
└── main.py
```

---

# api/

Contains all REST API endpoints.

```
api/
└── v1/
    ├── auth.py
    ├── users.py
    ├── departments.py
    ├── roles.py
    ├── permissions.py
    └── platform_modules.py
```

Responsibilities

- API Routing
- Request Validation
- HTTP Responses

---

# core/

Application configuration.

Contains

- JWT
- Password Hashing
- Security
- Configuration
- Logging

---

# db/

Database configuration.

Contains

- SQLAlchemy Base
- Session
- Database Connection

---

# models/

SQLAlchemy Models

Example

```
User
Department
Role
Permission
Product
Supplier
Warehouse
```

Responsibilities

- Database Tables
- Relationships
- Constraints

---

# schemas/

Pydantic models.

Responsibilities

- Request Validation
- Response Models
- Serialization

---

# repositories/

Database access layer.

Responsibilities

- CRUD Operations
- SQLAlchemy Queries

Example

```
UserRepository
DepartmentRepository
ProductRepository
```

---

# services/

Business logic.

Responsibilities

- Validation
- Business Rules
- Calling Repositories

Example

```
UserService
DepartmentService
InventoryService
```

---

# Frontend

```
frontend/
```

Built using

- React 19
- Vite
- Material UI
- Axios
- React Router

---

## Frontend Structure

```
frontend/
│
├── public/
├── src/
├── package.json
└── vite.config.js
```

---

# src/

```
src/
│
├── api/
├── auth/
├── components/
├── layouts/
├── pages/
├── routes/
├── services/
├── theme/
└── utils/
```

---

# api/

Axios configuration.

Contains

```
axios.js
```

Responsibilities

- Base URL
- JWT Token
- Interceptors

---

# auth/

Authentication.

Contains

- Login
- Logout
- Private Routes
- Auth Context

---

# layouts/

Application layout.

Example

```
DashboardLayout
```

Contains

- Sidebar
- Topbar
- Footer

---

# pages/

Application pages.

Example

```
Dashboard
Users
Departments
Roles
Permissions
Products
Suppliers
Inventory
Reports
```

---

# components/

Reusable UI components.

Examples

```
Table
Toolbar
Dialog
View Dialog
Confirmation Dialog
Loading Spinner
```

---

# services/

Frontend API layer.

Example

```
userService.js
departmentService.js
productService.js
```

Responsibilities

- API Calls
- Data Fetching

---

# Docs

```
docs/
```

Contains project documentation.

```
COMMANDS.md
GIT_WORKFLOW.md
PROJECT_STRUCTURE.md
DEVELOPMENT_WORKFLOW.md
API_GUIDELINES.md
CODING_STANDARDS.md
DATABASE.md
DEPLOYMENT.md
TROUBLESHOOTING.md
CHANGELOG.md
```

---

# Architecture

```
React
      │
Axios
      │
FastAPI
      │
Service Layer
      │
Repository Layer
      │
SQLAlchemy
      │
MySQL
```

---

# Module Structure

Every module follows the same pattern.

```
Model
│
Migration
│
Schema
│
Repository
│
Service
│
API
│
Swagger Testing
│
Frontend Service
│
List Page
│
Toolbar
│
Table
│
Dialog
│
View Dialog
│
Testing
```

---

# Naming Convention

Models

```
User
Department
Product
Supplier
```

Repositories

```
UserRepository
DepartmentRepository
```

Services

```
UserService
DepartmentService
```

Schemas

```
UserCreate
UserUpdate
UserResponse
```

Pages

```
UserList
DepartmentList
```

---

# Technology Stack

Backend

- Python 3.12
- FastAPI
- SQLAlchemy
- Alembic
- MySQL

Frontend

- React 19
- Vite
- Material UI
- Axios

Authentication

- JWT
- Argon2 Password Hashing

Version Control

- Git
- GitHub

---

# Current Status

Completed

- Authentication
- Dashboard
- Platform Modules
- Roles
- Permissions
- User Management CRUD

In Progress

- Department Management

Upcoming

- Product Management
- Supplier Management
- Warehouse Management
- Inventory
- Reports
- Administration
