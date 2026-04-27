# 🚗 AutoDealer Pro — Full-Stack Dealership Management System

A complete car dealership management application with React frontend and Django REST API backend.

## 📁 Project Structure

```
autodealer-fullstack/
├── backend/                    # Django REST API
│   ├── autodealer/             # Django project settings
│   │   ├── settings.py         # Configuration (DB, CORS, JWT, etc.)
│   │   ├── urls.py             # Root URL routing
│   │   └── wsgi.py
│   ├── api/                    # Main API app
│   │   ├── models.py           # Database models (Vehicle, Customer, Sale, etc.)
│   │   ├── serializers.py      # REST serializers
│   │   ├── views.py            # API viewsets & endpoints
│   │   ├── urls.py             # API URL routing
│   │   ├── admin.py            # Django admin config
│   │   └── seed.py             # Sample data seeder
│   ├── manage.py
│   └── requirements.txt
├── frontend/                   # React (Vite) Frontend
│   └── src/
│       ├── pages/              # All 9 full-quality pages
│       │   ├── Dashboard.jsx   # Stats, charts, alerts, overview
│       │   ├── Inventory.jsx   # 50+ makes, image upload, sell, expenses
│       │   ├── Sales.jsx       # History, profit analysis, performance
│       │   ├── Customers.jsx   # CRM pipeline, Kanban, profiles
│       │   ├── Expenses.jsx    # Budget tracking, categories, recurring
│       │   ├── Employees.jsx   # Performance cards, targets, commissions
│       │   ├── Locations.jsx   # Capacity, comparison, vehicle lists
│       │   ├── Documents.jsx   # Grid/table/folder, drag-and-drop
│       │   └── Settings.jsx    # 7 sections, full configuration
│       └── utils/
│           └── api.js          # API client with JWT authentication
└── README.md
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate    # Mac/Linux
# venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create database tables
python manage.py makemigrations api
python manage.py migrate

# Load sample data (creates admin user + sample vehicles, customers, etc.)
python manage.py shell < api/seed.py

# Start the backend server
python manage.py runserver
```

The API is now running at **http://localhost:8000/api/**

### 2. Frontend Setup

```bash
# In a new terminal, from the project root:

# Create Vite React project
npm create vite@latest frontend-app -- --template react
cd frontend-app

# Copy our pages into the new project
# Copy everything from frontend/src/ into frontend-app/src/
# Replace the default App.jsx with the App shell (see below)

# Install dependencies
npm install

# Start the frontend
npm run dev
```

The frontend is now running at **http://localhost:5173**

### 3. Login

```
Username: admin
Password: admin123
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/token/` | Login (get JWT tokens) |
| POST | `/api/auth/token/refresh/` | Refresh access token |
| GET | `/api/auth/me/` | Get current user info |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/` | Aggregated dashboard stats |

### Vehicles (CRUD + extras)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles/` | List all vehicles (filterable) |
| POST | `/api/vehicles/` | Add new vehicle |
| GET | `/api/vehicles/{id}/` | Get vehicle details |
| PATCH | `/api/vehicles/{id}/` | Update vehicle |
| DELETE | `/api/vehicles/{id}/` | Delete vehicle |
| POST | `/api/vehicles/{id}/sell/` | Sell a vehicle |
| POST | `/api/vehicles/{id}/add_expense/` | Add expense to vehicle |

**Filters:** `?status=In Stock&make=BMW&location=Milltown&search=turbo`

### Customers (CRUD + stage management)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers/` | List customers |
| POST | `/api/customers/` | Add customer |
| PATCH | `/api/customers/{id}/` | Update customer |
| DELETE | `/api/customers/{id}/` | Delete customer |
| POST | `/api/customers/{id}/change_stage/` | Change pipeline stage |

**Filters:** `?stage=Lead&source=Website&search=john`

### Sales, Employees, Expenses, Documents, Locations
All follow standard CRUD pattern:
- `GET /api/{resource}/` — List (with filters)
- `POST /api/{resource}/` — Create
- `GET /api/{resource}/{id}/` — Detail
- `PATCH /api/{resource}/{id}/` — Update
- `DELETE /api/{resource}/{id}/` — Delete

### Settings & Audit Log
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings/` | Get dealership settings |
| PATCH | `/api/settings/1/` | Update settings |
| GET | `/api/audit-log/` | View activity log |

## 🗄️ Database Models

- **Vehicle** — year, make, model, VIN, color, price, cost, status, location, mileage, fuel, transmission, engine, image, expenses
- **VehicleExpense** — description, amount, date (linked to vehicle)
- **Customer** — name, email, phone, address, stage, source, interest, rating, notes
- **Employee** — name, role, email, phone, location, status, commission, rating, targets
- **Sale** — vehicle, customer, salesperson, sale_price, method, date
- **Expense** — description, category, amount, vendor, payment_method, reference, status, recurring
- **Document** — name, file, type, category, vehicle, customer, uploaded_by, tags
- **Location** — name, address, phone, manager, capacity, hours
- **DealershipSettings** — name, owner, email, timezone, currency, tax_rate, markup
- **AuditLog** — action, detail, user, timestamp

## 🌐 Deployment

### Option A: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
1. Push frontend to GitHub
2. Connect repo to Vercel
3. Set build command: `npm run build`
4. Set output: `dist`
5. Add env variable: `VITE_API_URL=https://your-backend.railway.app/api`

**Backend on Railway:**
1. Push backend to GitHub
2. Create new Railway project → Deploy from GitHub
3. Add PostgreSQL plugin
4. Set env variables: `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS`
5. Railway auto-detects Django and deploys

### Option B: Single Server (DigitalOcean/AWS)
1. Provision an Ubuntu server
2. Install Python, Node, Nginx
3. Build frontend: `npm run build` → serve static files with Nginx
4. Run Django with Gunicorn behind Nginx
5. Set up PostgreSQL

### Upgrading to PostgreSQL
In `settings.py`, change:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'autodealer',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 📋 Features by Page

| Page | Features |
|------|----------|
| **Dashboard** | 6 stat cards, revenue/profit charts, inventory donut, sales feed, aging stock, location meters, alerts |
| **Inventory** | 50+ makes, searchable dropdowns, image upload, per-vehicle expenses, sell button, filters, table/grid, CSV export |
| **Sales** | History table, profit analysis, margin %, payment methods, salesperson performance, revenue by location |
| **Customers** | Pipeline funnel, Kanban board, source tracking, star ratings, purchase history, notes, stage management |
| **Expenses** | Budget vs actual, category breakdown, recurring tracking, vendor management, status tracking |
| **Employees** | Profile cards, target progress, commission tracking, performance ranking, table/cards views |
| **Locations** | Capacity visualization, side-by-side comparison, vehicle lists per location, operating hours |
| **Documents** | Grid/table/folder views, drag-and-drop upload, file type tracking, tags, preview/download |
| **Settings** | 7 sections (General, App, Profile, Security, Data, Audit, About), all configurable |

## 🔑 Tech Stack

- **Frontend:** React 18, Vite, Outfit font
- **Backend:** Django 5, Django REST Framework
- **Auth:** JWT (SimpleJWT)
- **Database:** SQLite (dev) → PostgreSQL (prod)
- **Design:** Custom dark theme, Tesla/Apple-inspired aesthetic
