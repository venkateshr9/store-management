# Coding Standards

## Store Management System

This document defines the coding standards and best practices for the Store Management System project.

---

# General Principles

Follow these principles throughout the project.

- Write clean, readable code.
- Keep functions small and focused.
- Follow the Single Responsibility Principle (SRP).
- Avoid duplicated code (DRY).
- Prefer composition over inheritance.
- Write code that is easy to maintain.

---

# Technology Stack

## Backend

- Python 3.12
- FastAPI
- SQLAlchemy 2.0
- Alembic
- Pydantic

## Frontend

- React 19
- Vite
- Material UI
- Axios

---

# Python Style Guide

Follow

```
PEP 8
```

Line length

```
Maximum 88 characters
```

Indentation

```
4 spaces
```

Never use tabs.

---

# Import Order

Always import in this order.

```python
# Standard Library

from datetime import datetime

# Third-party

from fastapi import APIRouter

# Local Imports

from app.schemas.user import UserCreate
```

---

# File Naming

Use lowercase.

Correct

```
user.py

department.py

product.py
```

Wrong

```
User.py

Department.py
```

---

# Class Naming

PascalCase

Correct

```python
UserRepository

DepartmentService

ProductCreate
```

---

# Function Naming

snake_case

Correct

```python
create_user()

update_department()

delete_product()
```

---

# Variable Naming

snake_case

Correct

```python
employee_no

department_name

created_at
```

Avoid

```
empNo

DeptName

myVar
```

---

# Constants

UPPER_CASE

```python
SECRET_KEY

ACCESS_TOKEN_EXPIRE_MINUTES
```

---

# Type Hints

Always use type hints.

Correct

```python
def get_user(
    user_id: int,
) -> User:
```

---

# Docstrings

Use docstrings for public classes and complex functions.

Example

```python
def create_user(payload: UserCreate) -> User:
    """
    Create a new user after validating uniqueness.
    """
```

---

# Exception Handling

Catch only expected exceptions.

Correct

```python
try:
    service.create_user(payload)

except ValueError as exc:
    ...
```

Avoid

```python
except:
    ...
```

---

# Logging

Do not use

```python
print()
```

Use

```python
logging
```

Development

```python
logger.debug()
```

Production

```python
logger.info()

logger.warning()

logger.error()
```

---

# SQLAlchemy

Use Repository Pattern.

Never access the database directly from

- API
- React

Correct

```
API

↓

Service

↓

Repository

↓

Database
```

---

# FastAPI

Always use

```
response_model
```

Example

```python
@router.get(
    "/",
    response_model=list[UserResponse],
)
```

---

# Validation

Always validate using Pydantic.

Never validate manually inside API routes.

---

# React Standards

Use

```
Functional Components
```

Example

```jsx
export default function UserDialog() {

}
```

---

# React Hooks

Order

```jsx
Imports

↓

State

↓

Effects

↓

Functions

↓

Return
```

---

# Component Naming

PascalCase

```
UserList

DepartmentDialog

ProductTable
```

---

# JavaScript Variables

camelCase

```jsx
const selectedUser

const departmentList

const handleSave
```

---

# Event Handlers

Prefix

```
handle
```

Examples

```jsx
handleSave()

handleDelete()

handleSearch()

handleRefresh()
```

---

# API Services

Location

```
frontend/src/services/
```

Example

```
userService.js

departmentService.js
```

Functions

```javascript
getUsers()

createUser()

updateUser()

deleteUser()
```

---

# Folder Structure

Backend

```
models/

schemas/

repositories/

services/

api/
```

Frontend

```
pages/

components/

services/

layouts/

routes/
```

---

# Comments

Write comments only when needed.

Good

```python
# Check duplicate employee number
```

Avoid

```python
# Increment i
i += 1
```

---

# Error Messages

Keep messages clear.

Good

```
Employee number already exists.
```

Avoid

```
Something went wrong.
```

---

# Git Commit Format

```
type(scope): description
```

Examples

```
feat(users): implement CRUD

fix(login): resolve JWT issue

docs(readme): update installation

refactor(repository): simplify queries
```

---

# Formatting

Python

Use

```
black
```

Frontend

Use

```
Prettier
```

Lint

```
ESLint

Oxlint
```

---

# Testing

Before every commit

Backend

- API works
- Swagger works
- Database migration applied

Frontend

- No console errors
- CRUD tested
- Responsive UI verified

---

# Security

Never

- Commit passwords
- Commit JWT secrets
- Commit .env files
- Commit database credentials

Always

- Hash passwords using Argon2
- Use JWT
- Validate all inputs

---

# Naming Summary

## Backend

| Item | Convention |
|------|------------|
| File | snake_case |
| Class | PascalCase |
| Function | snake_case |
| Variable | snake_case |
| Constant | UPPER_CASE |

---

## Frontend

| Item | Convention |
|------|------------|
| Component | PascalCase |
| Function | camelCase |
| Variable | camelCase |
| File | PascalCase.jsx (components) |
| Service | camelCase.js |

---

# Code Review Checklist

Before merging code

- Code follows project structure
- Naming conventions followed
- No duplicate logic
- Type hints added
- Validation added
- Exception handling implemented
- Swagger updated
- Documentation updated
- Tests completed

---

# Best Practices

- Keep functions focused on a single task.
- Reuse code whenever possible.
- Use the Repository and Service patterns consistently.
- Write meaningful commit messages.
- Document complex logic.
- Keep modules independent.
- Review autogenerated Alembic migrations before applying them.
- Update documentation whenever functionality changes.

---

# Project Goal

The Store Management System should maintain

- Clean Architecture
- Enterprise-grade code quality
- Consistent coding style
- Comprehensive documentation
- Maintainable codebase
- Production readiness
