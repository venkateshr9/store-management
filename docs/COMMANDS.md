# Store Management System - Commands Reference

## Linux Commands

### Current Directory

```bash
pwd
```

### List Files

```bash
ls
ls -al
```

### Find Files

```bash
find . -name "*.py"
find . -name "*.jsx"
find . -name logo.png
```

### Search Text

```bash
grep -R "UserService" backend/
grep -R "Grid2" frontend/src
grep -R "<Grid item" frontend/src
```

---

# Python Virtual Environment

Activate

```bash
source backend/venv/bin/activate
```

Deactivate

```bash
deactivate
```

---

# FastAPI

Development

```bash
uvicorn app.main:app --reload
```

Production

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

# React

Install

```bash
cd frontend
npm install
```

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

---

# Install Packages

```bash
npm install axios
npm install @mui/material
npm install @mui/icons-material
npm install @mui/x-data-grid
npm install react-router-dom
npm install react-hook-form
npm install notistack
```

List package

```bash
npm list @mui/material
```

---

# MySQL

Login

```bash
mysql -u root -p
```

Use Database

```sql
USE store_management;
```

Show Tables

```sql
SHOW TABLES;
```

Describe Table

```sql
DESCRIBE users;

DESCRIBE departments;
```

Show Create Table

```sql
SHOW CREATE TABLE users\G
```

Current Database

```sql
SELECT DATABASE();
```

Alembic Version

```sql
SELECT version_num FROM alembic_version;
```

Count Records

```sql
SELECT COUNT(*) FROM users;
```

---

# Alembic

Generate Migration

```bash
alembic revision --autogenerate -m "create departments table"
```

Apply Migration

```bash
alembic upgrade head
```

Current Version

```bash
alembic current
```

History

```bash
alembic history
```

Stamp

```bash
alembic stamp head
```

Rollback

```bash
alembic downgrade -1
```

---

# Git

Status

```bash
git status
```

Branches

```bash
git branch
```

Create Branch

```bash
git checkout -b development
```

Switch Branch

```bash
git checkout main
```

Add Files

```bash
git add .
```

Commit

```bash
git commit -m "feat(users): complete User CRUD"
```

Push

```bash
git push origin main
```

Pull

```bash
git pull origin main
```

Clone

```bash
git clone <repository>
```

Log

```bash
git log --oneline
```

Remotes

```bash
git remote -v
```

---

# Git Tags

Create

```bash
git tag -a v0.3.0 -m "User CRUD completed"
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

# Useful Search Commands

Models

```bash
ls backend/app/models
```

Schemas

```bash
ls backend/app/schemas
```

Repositories

```bash
ls backend/app/repositories
```

Services

```bash
ls backend/app/services
```

API

```bash
ls backend/app/api/v1
```

Frontend Pages

```bash
find frontend/src/pages -maxdepth 2 -type f
```

Frontend Services

```bash
ls frontend/src/services
```

Useful grep

```bash
grep -R "Grid2" frontend/src
grep -R "@mui/material/Grid2" frontend/src
grep -R "UserList" frontend/src
grep -R "router = APIRouter" backend/app/api
```
