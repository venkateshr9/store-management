# API Guidelines

## Store Management System

This document defines the API standards, naming conventions, request/response formats, authentication, error handling, versioning, and best practices for the Store Management System backend.

---

# Technology Stack

| Component | Technology |
|------------|------------|
| Framework | FastAPI |
| Validation | Pydantic |
| ORM | SQLAlchemy 2.0 |
| Authentication | JWT |
| Password Hashing | Argon2 |
| Documentation | Swagger / OpenAPI |

---

# API Versioning

All APIs must be versioned.

Example

```
/api/v1/users
/api/v1/departments
/api/v1/products
```

Directory

```
backend/app/api/v1/
```

---

# URL Naming Convention

Use nouns.

Correct

```
/users

/departments

/products

/suppliers
```

Avoid verbs.

Wrong

```
/getUsers

/createDepartment

/deleteProduct
```

---

# HTTP Methods

## GET

Retrieve data

```
GET /users
```

```
GET /users/10
```

---

## POST

Create data

```
POST /users
```

---

## PUT

Update complete object

```
PUT /users/10
```

---

## PATCH

Partial update (future)

```
PATCH /users/10
```

---

## DELETE

Delete object

```
DELETE /users/10
```

---

# Status Codes

| Code | Meaning |
|------|----------|
|200|Success|
|201|Created|
|204|Deleted|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|422|Validation Error|
|500|Internal Server Error|

---

# Authentication

JWT Bearer Token

Header

```
Authorization: Bearer <JWT_TOKEN>
```

Protected APIs

```
Users

Departments

Roles

Permissions

Products

Inventory
```

Public APIs

```
Login
Health Check
```

---

# Request Validation

Always validate using Pydantic.

Example

```
UserCreate

UserUpdate

DepartmentCreate

DepartmentUpdate
```

Never accept raw dictionaries.

---

# Response Model

Every endpoint should return a response schema.

Example

```python
response_model=UserResponse
```

List

```python
response_model=list[UserResponse]
```

---

# Error Response Format

Example

```json
{
    "detail": "User not found."
}
```

Validation

```json
{
    "detail": [
        {
            "loc": [
                "body",
                "username"
            ],
            "msg": "Field required",
            "type": "missing"
        }
    ]
}
```

---

# CRUD Endpoints

Users

| Method | Endpoint |
|---------|----------|
|GET|/users|
|GET|/users/{id}|
|POST|/users|
|PUT|/users/{id}|
|DELETE|/users/{id}|

Departments

| Method | Endpoint |
|---------|----------|
|GET|/departments|
|GET|/departments/{id}|
|POST|/departments|
|PUT|/departments/{id}|
|DELETE|/departments/{id}|

---

# Pagination

Future format

```
GET /users?page=1&page_size=20
```

Response

```json
{
    "items": [],
    "page": 1,
    "page_size": 20,
    "total": 250
}
```

---

# Filtering

Example

```
GET /users?is_active=true

GET /products?category=Switch

GET /departments?search=Network
```

---

# Sorting

Example

```
GET /users?sort=username

GET /users?sort=-username
```

Ascending

```
username
```

Descending

```
-username
```

---

# Searching

Example

```
GET /users?search=venkatesh
```

---

# Naming Convention

Functions

```
list_users()

get_user()

create_user()

update_user()

delete_user()
```

Repository

```
UserRepository

DepartmentRepository
```

Service

```
UserService

DepartmentService
```

Schema

```
UserCreate

UserUpdate

UserResponse
```

---

# Exception Handling

Always convert business exceptions into HTTP exceptions.

Example

```python
try:
    return service.create_user(payload)

except ValueError as exc:

    raise HTTPException(
        status_code=400,
        detail=str(exc)
    )
```

---

# Logging

Future implementation

Log

- Login
- Logout
- Create
- Update
- Delete
- Errors

---

# Security

Passwords

```
Argon2
```

Authentication

```
JWT
```

Authorization

```
RBAC
```

Never

- Return password hashes
- Return JWT secret
- Log passwords
- Store plaintext passwords

---

# Swagger

Every endpoint must be visible in

```
/docs
```

Every endpoint must have

- Summary
- Tags
- Request Schema
- Response Schema

---

# Repository Pattern

```
API
 │
 ▼
Service
 │
 ▼
Repository
 │
 ▼
Database
```

Never access SQLAlchemy directly from API routes.

---

# Business Logic

Business rules belong in

```
services/
```

Never inside

```
api/
```

---

# Database Access

Only repositories access SQLAlchemy.

Never write SQLAlchemy queries inside

- API
- React
- Services

---

# Response Standards

Create

```
201 Created
```

Update

```
200 OK
```

Delete

```
204 No Content
```

---

# Module Template

Every module should implement

```
Model

Migration

Schema

Repository

Service

API

Swagger Test

Frontend Service

List Page

Dialog

View Dialog
```

---

# Current APIs

Completed

- Authentication
- Users
- Roles
- Permissions
- Platform Modules

In Progress

- Departments

Upcoming

- Products
- Suppliers
- Warehouses
- Inventory
- Reports

---

# Best Practices

- Keep endpoints RESTful.
- Use nouns in URLs.
- Validate all requests with Pydantic.
- Return response models.
- Keep business logic in services.
- Use repositories for database access.
- Handle exceptions consistently.
- Secure APIs with JWT.
- Keep Swagger documentation up to date.
