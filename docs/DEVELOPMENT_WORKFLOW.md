# Development Workflow

## Store Management System

This document defines the standard development workflow for all modules in the Store Management System.

Following the same workflow for every module keeps the project consistent, maintainable, and easier to debug.

---

# Development Lifecycle

Every module must follow the same sequence.

```
Planning
    │
Model
    │
Database Migration
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
React Components
    │
Testing
    │
Documentation
    │
Git Commit
    │
Git Push
    │
Version Tag
```

---

# Step 1 - Planning

Before writing code answer:

- What problem does this module solve?
- Database tables required?
- Relationships?
- CRUD operations?
- Permissions?
- Validation rules?

Example

```
Module

Department

Functions

Create
Update
Delete
View
Search
```

---

# Step 2 - SQLAlchemy Model

Location

```
backend/app/models/
```

Example

```
department.py
```

Responsibilities

- Table Name
- Columns
- Constraints
- Relationships

---

# Step 3 - Database Migration

Generate migration

```bash
alembic revision --autogenerate -m "create departments table"
```

Review migration

Remove unwanted changes.

Apply

```bash
alembic upgrade head
```

Verify

```sql
SHOW TABLES;

DESCRIBE departments;
```

---

# Step 4 - Pydantic Schema

Location

```
backend/app/schemas/
```

Create

```
DepartmentBase
DepartmentCreate
DepartmentUpdate
DepartmentResponse
```

Responsibilities

- Validation
- Request Model
- Response Model

---

# Step 5 - Repository

Location

```
backend/app/repositories/
```

Responsibilities

- CRUD
- SQLAlchemy Queries

Example

```
DepartmentRepository
```

Methods

```
create()

get()

list()

update()

delete()
```

---

# Step 6 - Service

Location

```
backend/app/services/
```

Responsibilities

- Business Logic
- Validation
- Duplicate Checks
- Error Handling

Example

```
DepartmentService
```

---

# Step 7 - API

Location

```
backend/app/api/v1/
```

Create routes

```
GET

POST

PUT

DELETE
```

Responsibilities

- HTTP Status
- Request Validation
- Exception Handling

---

# Step 8 - Swagger Testing

Verify

- Create
- Update
- Delete
- List
- Get

Check

- Status Codes
- Validation
- Response Model

---

# Step 9 - Frontend Service

Location

```
frontend/src/services/
```

Example

```
departmentService.js
```

Methods

```
getDepartments()

getDepartment()

createDepartment()

updateDepartment()

deleteDepartment()
```

---

# Step 10 - React Components

Location

```
frontend/src/pages/departments/
```

Components

```
DepartmentList

DepartmentToolbar

DepartmentTable

DepartmentDialog

DepartmentViewDialog
```

---

# Step 11 - Routing

Add

```
AppRoutes.jsx
```

Sidebar

```
DashboardLayout.jsx
```

Navigation

```
Departments
```

---

# Step 12 - UI Testing

Verify

- Add
- Edit
- Delete
- Search
- View
- Refresh

---

# Step 13 - Backend Testing

Verify

- SQL
- Alembic
- API
- JWT
- Validation

---

# Step 14 - Documentation

Update

```
README

CHANGELOG

DATABASE

API_GUIDELINES
```

---

# Step 15 - Git

Check

```bash
git status
```

Commit

```bash
git add .

git commit -m "feat(departments): complete CRUD module"
```

Push

```bash
git push origin main
```

---

# Step 16 - Version Tag

Create

```bash
git tag -a v0.4.0 -m "Department module completed"
```

Push

```bash
git push origin v0.4.0
```

---

# Module Checklist

Every module must satisfy the following.

## Backend

- Model
- Migration
- Schema
- Repository
- Service
- API

---

## Database

- Migration Applied
- Table Created
- Constraints Verified

---

## Frontend

- Service
- List
- Toolbar
- Table
- Dialog
- View Dialog

---

## Testing

- Swagger
- CRUD
- Validation
- Search
- Refresh

---

## Documentation

- README
- CHANGELOG
- API
- Database

---

## Git

- Commit
- Push
- Tag

---

# Recommended Module Order

```
Authentication
        │
Dashboard
        │
Platform Modules
        │
Users
        │
Departments
        │
Roles
        │
Permissions
        │
Products
        │
Categories
        │
Suppliers
        │
Warehouses
        │
Inventory
        │
Purchase
        │
Sales
        │
Reports
```

---

# Quality Standards

Every module must have

- Clean Architecture
- Repository Pattern
- Service Layer
- Proper Validation
- Exception Handling
- Swagger Documentation
- Responsive UI
- Git History
- Documentation

---

# Goal

Every completed module should be:

- Fully tested
- Fully documented
- Production-ready
- Ready for GitHub release
