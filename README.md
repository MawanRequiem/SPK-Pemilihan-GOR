# 🧠 SPK Pemilihan GOR (Sistem Pendukung Keputusan)

A full-stack web-based Decision Support System (DSS) to help users select the most suitable sports hall (GOR) using the **Distance to Ideal Alternative (DIA)** method. This application includes a frontend built with Vue.js and a backend API built with Node.js/Express, powered by a Supabase/MySQL database.

---

## 🧾 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [DIA Method Overview](#dia-method-overview)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Frontend Pages](#frontend-pages)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## 📌 Introduction

This SPK (Sistem Pendukung Keputusan) helps users evaluate and choose from various GOR (Gelanggang Olahraga) options using a weighted multi-criteria decision-making method. The backend provides secure RESTful APIs, while the frontend offers an interactive UI for data input and result visualization.

---

## ✨ Features

- 🧠 Decision-making using Distance to Ideal Alternative (DIA)
- 🧾 Survey input for personal preferences
- 🔐 JWT authentication (user & admin roles)
- 📍 Integration with Google Maps (location-aware scoring)
- 📝 History log of past decisions
- 🖥️ Admin dashboard to manage GOR and user inputs
- 🐳 Docker support for full-stack deployment

---

## 🧮 DIA Method Overview

**Distance to Ideal Alternative (DIA)** is a multi-criteria decision-making method that:

1. **Normalizes** and **weights** the decision matrix.
2. Identifies the **ideal (best)** and **anti-ideal (worst)** values for each criterion.
3. Calculates the **Euclidean distance** to both ideal and anti-ideal points.
4. Determines a **closeness score (Ci)** for each alternative:
   \[
   C_i = \frac{D_{i}^{-}}{D_{i}^{+} + D_{i}^{-}}
   \]
   - \( D_{i}^{+} \): Distance to ideal
   - \( D_{i}^{-} \): Distance to anti-ideal
5. Ranks the alternatives by highest \( C_i \) value (closer to ideal).

---

## 🏗️ System Architecture

```
+------------------+        +--------------------+        +---------------------+
|     Frontend     |  --->  |      Backend       |  --->  |     Database        |
|   (Vue.js App)   |        |  (Node.js/Express) |        |  (MySQL/Supabase)   |
+------------------+        +--------------------+        +---------------------+
```

---

## 🛠️ Installation

### Prerequisites

- Node.js v18+
- Supabase 
- Google Maps API Key

### Clone and Setup

```bash
git clone <repository-url>
cd SPK-Pemilihan-GOR-main
```

---

## 🖼️ Frontend Pages

| Page                 | Path                  | Description                          |
|----------------------|------------------------|--------------------------------------|
| 🏠 Home              | `/`                    | Landing page                         |
| 🔑 Login             | `/login`               | User authentication                  |
| 📝 Survey            | `/survey`              | Input user preferences/weights       |
| 📊 Result            | `/hasil-rekomendasi`   | Display GOR recommendation results   |
| 🕓 History           | `/histori`             | View previous recommendations        |
| 🛠️ Admin Dashboard  | `/admin`               | Manage GOR data, see all users       |

All components are built using Vue 3 and communicate via Axios with the backend API.

---

## 📡 API Endpoints

| Method | Endpoint         | Description                              |
|--------|------------------|------------------------------------------|
| POST   | /register         | User registration                        |
| POST   | /login            | User login & JWT token                   |
| GET    | /rekomendasi      | Calculate DIA-based GOR recommendation   |
| GET    | /histori          | View user's past results                 |
| GET    | /maps             | Retrieve map and location data           |
| GET    | /admin            | Admin-only access                        |

---

## 📦 Dependencies

### Backend

- express
- dotenv
- jsonwebtoken
- cors
- bcryptjs

### Frontend

- vue
- vue-router
- axios
- tailwindcss
- pinia

Install all with:

```bash
npm install
```

---

## 🧪 Examples

### 1. User Dashboard Page

[!User Dashboard Page](/assets/UserDashboard.png)

### 2. Admin Dashboard Page

[!Admin Dashboard Page](/assets/AdminDashboard.png)

### 3. Calculate Recomendation Page

[!User Rekomendasi Page](/assets/Rekomendasi.png)

---
