# Git Workflow

## Store Management System

This document defines the Git workflow, branching strategy, versioning, commit message conventions, and release process for the Store Management System project.

---

# Repository

GitHub Repository

```
https://github.com/<your-username>/store-management
```

---

# Branch Strategy

## Main Branch

```
main
```

Purpose

- Stable production-ready code
- Every commit must compile successfully
- Every commit must pass testing

---

## Development Branch

```
development
```

Purpose

- Integration branch
- Daily development
- Feature testing

---

## Feature Branches

Naming Convention

```
feature/users
feature/departments
feature/products
feature/inventory
feature/reports
```

Example

```
git checkout -b feature/departments
```

---

## Bug Fix Branches

Naming Convention

```
bugfix/login
bugfix/password-reset
bugfix/dashboard
```

Example

```
git checkout -b bugfix/login
```

---

## Hotfix Branches

Naming Convention

```
hotfix/v1.0.1
```

Used only for production fixes.

---

# Development Workflow

```
main
    │
    ├──────────────► development
                        │
                        ├────────► feature/users
                        │
                        ├────────► feature/departments
                        │
                        ├────────► feature/products
                        │
                        └────────► feature/reports
```

Workflow

```
Feature Branch
      │
      ▼
Testing
      │
      ▼
Merge into development
      │
      ▼
Testing
      │
      ▼
Merge into main
```

---

# Git Commands

## Clone

```bash
git clone https://github.com/<username>/store-management.git
```

---

## Check Status

```bash
git status
```

---

## Create Feature Branch

```bash
git checkout -b feature/users
```

---

## Switch Branch

```bash
git checkout main
```

---

## Pull Latest Changes

```bash
git pull origin main
```

---

## Add Files

```bash
git add .
```

---

## Commit

```bash
git commit -m "feat(users): complete User Management CRUD"
```

---

## Push

```bash
git push origin feature/users
```

---

## Merge

```bash
git checkout development

git merge feature/users
```

---

# Commit Message Convention

Format

```
type(scope): short description
```

---

## Feature

```
feat(users): implement user CRUD
```

---

## Bug Fix

```
fix(login): resolve JWT authentication issue
```

---

## Documentation

```
docs(readme): update installation guide
```

---

## Refactoring

```
refactor(user-service): simplify validation logic
```

---

## Style

```
style(dialog): improve form spacing
```

---

## Performance

```
perf(api): optimize user query
```

---

## Test

```
test(users): add CRUD integration tests
```

---

## Chore

```
chore(dependencies): update MUI packages
```

---

# Versioning

Semantic Versioning

```
MAJOR.MINOR.PATCH
```

Example

```
1.0.0
```

---

## Major

Breaking changes

Example

```
2.0.0
```

---

## Minor

New module

Example

```
1.2.0
```

---

## Patch

Bug fixes

Example

```
1.2.3
```

---

# Project Versions

| Version | Description |
|----------|-------------|
| v0.1.0 | Initial Project Setup |
| v0.2.0 | Authentication & Dashboard |
| v0.3.0 | User Management CRUD |
| v0.4.0 | Department Management |
| v0.5.0 | Role Management |
| v0.6.0 | Permission Management |
| v0.7.0 | Product Management |
| v0.8.0 | Inventory Module |
| v0.9.0 | Reports |
| v1.0.0 | First Stable Release |

---

# Git Tags

Create Tag

```bash
git tag -a v0.3.0 -m "User Management CRUD completed"
```

Push Tag

```bash
git push origin v0.3.0
```

List Tags

```bash
git tag
```

---

# Before Every Commit

Checklist

- Code compiles
- No console errors
- Swagger APIs tested
- React pages tested
- Database migration tested
- README updated (if required)
- Documentation updated

---

# Before Every Push

Run

```bash
git status
```

Ensure

```
nothing to commit, working tree clean
```

---

# Module Development Checklist

Every module should follow this sequence.

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
    │
Git Commit
    │
Git Push
```

---

# Release Checklist

Before creating a release

- Authentication tested
- CRUD operations tested
- Database migrations verified
- API documentation updated
- README updated
- CHANGELOG updated
- Documentation completed
- Git tag created
- GitHub release published

---

# Best Practices

- Commit small, logical changes.
- Write meaningful commit messages.
- Never commit secrets or passwords.
- Test before pushing.
- Keep the `main` branch stable.
- Create a Git tag for every significant milestone.
- Update documentation whenever functionality changes.

---

# Current Project Status

Current Stable Version

```
v0.3.0
```

Completed

- Authentication
- Dashboard
- Platform Modules
- Roles
- Permissions
- User Management CRUD

In Progress

- Department Management

Next Modules

- Products
- Categories
- Suppliers
- Inventory
- Reports
- Administration

---
