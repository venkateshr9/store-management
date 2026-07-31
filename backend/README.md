# 🏪 Enterprise Store Management System

<p align="center">

![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red?style=for-the-badge&logo=sqlalchemy)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Alembic](https://img.shields.io/badge/Alembic-Migrations-orange?style=for-the-badge)
![Pydantic](https://img.shields.io/badge/Pydantic-v2-E92063?style=for-the-badge)
![License](https://img.shields.io/badge/Status-Active%20Development-success?style=for-the-badge)

</p>

---

## 📖 Overview

An **Enterprise-grade Store Management Platform** built using **FastAPI**, **SQLAlchemy 2.0**, **Alembic**, and **MySQL**.

The project follows a **Metadata-Driven Architecture**, enabling new business modules, forms, validations, and CRUD operations to be created dynamically from database metadata without writing additional backend code.

---

# ✨ Features

- 🏢 Dynamic Module Engine
- 📝 Dynamic Field Builder
- ⚡ FastAPI REST API
- 🗄️ SQLAlchemy 2.0 ORM
- 🛢️ MySQL Database
- 🔄 Alembic Database Migrations
- 📦 Repository Pattern
- 🧩 Service Layer Architecture
- 🔐 JWT Authentication *(In Progress)*
- 👥 Role-Based Access Control (RBAC)
- 🔄 Workflow Engine
- 📋 Audit Trail
- 📎 File Attachment Service
- 📊 Dashboard & Reporting
- 🔍 Dynamic Search & Filtering
- 📈 API Documentation (Swagger/OpenAPI)

---

# 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| 🐍 Python 3.12 | Programming Language |
| ⚡ FastAPI | REST API Framework |
| 🗄️ SQLAlchemy 2.0 | ORM |
| 🛢️ MySQL 8 | Database |
| 🔄 Alembic | Database Migration |
| ✅ Pydantic v2 | Validation |
| 🔐 JWT | Authentication |
| 📄 Swagger/OpenAPI | API Documentation |

---

# 🏗️ Architecture

```text
                   👤 Client
                      │
                      ▼
              ⚡ FastAPI REST API
                      │
                      ▼
              📦 Service Layer
                      │
                      ▼
            🗂 Repository Layer
                      │
                      ▼
            🗄 SQLAlchemy ORM
                      │
                      ▼
                🛢️ MySQL Database
```

---

# 📂 Project Structure

```text
backend/
│
├── alembic/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── requirements.txt
└── README.md
```

---

# 🚀 Current Progress

| Status | Module |
|:------:|--------|
| ✅ | Project Structure |
| ✅ | SQLAlchemy Models |
| ✅ | MySQL Database |
| ✅ | Alembic Migration |
| ✅ | Repository Layer |
| ✅ | Service Layer |
| ✅ | Dynamic Module Metadata |
| 🔄 | JWT Authentication |
| ⏳ | RBAC |
| ⏳ | Dynamic CRUD Engine |
| ⏳ | Workflow Engine |
| ⏳ | Audit Trail |
| ⏳ | File Attachments |
| ⏳ | Dashboard |
| ⏳ | Reports |

---

# 🎯 Project Goals

✔ Enterprise Ready

✔ Metadata Driven

✔ Configurable Modules

✔ Dynamic CRUD

✔ Workflow Automation

✔ RBAC Security

✔ Audit Logging

✔ REST API

✔ Scalable Architecture

---

# 📸 Planned Screens

- 📊 Dashboard
- 📦 Inventory
- 🏢 Store Management
- 👥 User Management
- 🔐 Role & Permissions
- 📋 Workflow Engine
- 📑 Reports
- ⚙️ System Settings

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to open an Issue or submit a Pull Request.

---

# 👨‍💻 Author

**Venkatesh Ramalingam**

🌐 GitHub: https://github.com/venkateshr9

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

---

<p align="center">

### 🚀 Building a Modern Enterprise Store Management Platform with FastAPI

⭐ **Don't forget to Star this Repository!**

</p>
