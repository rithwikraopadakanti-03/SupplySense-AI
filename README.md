# SupplySense 🧠
### AI Supply Chain Risk & Inventory Intelligence Platform

> **Enterprise-grade AI platform that continuously monitors the entire supply chain, predicts disruptions before they happen, recommends corrective actions, and provides executives with AI-generated operational insights.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?logo=postgresql)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis)](https://redis.io)

---

## 🚀 Quick Start (Demo Mode — No API Key Required)

```bash
# 1. Clone or navigate to project
cd supplysense

# 2. Start the backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 3. Start the frontend (new terminal)
cd frontend
npm install
npm run dev

# 4. Open browser
# → http://localhost:3000
# → Login: admin@supplysense.ai / demo123
```

**One-command Docker deployment:**
```bash
cp .env.example .env
docker compose up --build
# → http://localhost:3000
```

---

## 🎯 What SupplySense Does

SupplySense is not just a dashboard. It **thinks**, **predicts**, **recommends**, and **explains**.

| Feature | Capability |
|---------|-----------|
| 🧠 **AI Agents** | 7 specialized LangGraph agents running 24/7 |
| 📦 **Inventory AI** | Stockout prediction days in advance, auto-reorder recommendations |
| 🏭 **Supplier Intelligence** | Real-time risk scoring with AI explanations |
| 🚢 **Shipment Tracking** | Live map with delay prediction and route alternatives |
| 📈 **Demand Forecasting** | 30-day ML forecast with confidence bands |
| ⚠️ **Risk Intelligence** | Weather, strikes, port delays, political events monitoring |
| 🤖 **Executive Copilot** | Natural language Q&A about your entire supply chain |
| 📊 **Executive Reports** | AI-generated PDF reports with charts and recommendations |
| 🌐 **Digital Twin** | "What if" scenario simulation for disruption planning |

---

## 📁 Project Structure

```
supplysense/
├── frontend/                    # Next.js 15 App
│   ├── app/
│   │   ├── (auth)/              # Login, Signup, OTP pages
│   │   ├── (dashboard)/         # All 13 feature modules
│   │   │   ├── dashboard/       # Executive Dashboard
│   │   │   ├── inventory/       # Inventory Intelligence
│   │   │   ├── suppliers/       # Supplier Intelligence
│   │   │   ├── shipments/       # Shipment Tracking (Leaflet Map)
│   │   │   ├── demand/          # Demand Forecasting
│   │   │   ├── warehouses/      # Warehouse Dashboard
│   │   │   ├── risk/            # Risk Intelligence Center
│   │   │   ├── procurement/     # Procurement AI
│   │   │   ├── copilot/         # Executive Copilot (AI Chat)
│   │   │   ├── reports/         # AI Executive Reports
│   │   │   ├── notifications/   # Notification Center
│   │   │   ├── analytics/       # Analytics & KPIs
│   │   │   └── digital-twin/    # Digital Twin Simulator
│   │   ├── globals.css          # Glassmorphism design system
│   │   ├── layout.tsx           # Root layout
│   │   └── providers.tsx        # QueryClient provider
│   ├── components/
│   │   ├── layout/              # Sidebar, Navbar, DashboardLayout
│   │   ├── ui/                  # StatCard, RiskBadge, Skeleton, etc.
│   │   └── charts/              # HealthGauge, Sparkline
│   ├── lib/
│   │   ├── api.ts               # Axios client with JWT
│   │   ├── utils.ts             # Utilities & formatters
│   │   └── hooks.ts             # Custom React hooks
│   └── middleware.ts            # Auth route protection
│
├── backend/                     # FastAPI Python App
│   ├── app/
│   │   ├── main.py              # FastAPI app + CORS + lifespan
│   │   ├── api/v1/              # All REST API routes
│   │   │   ├── auth.py          # JWT auth endpoints
│   │   │   ├── dashboard.py     # Executive dashboard data
│   │   │   ├── inventory.py     # Inventory intelligence
│   │   │   ├── suppliers.py     # Supplier scoring & AI
│   │   │   ├── shipments.py     # Live shipment tracking
│   │   │   ├── warehouses.py    # Warehouse management
│   │   │   ├── demand.py        # Demand forecasting
│   │   │   ├── risk.py          # Risk events & scoring
│   │   │   ├── procurement.py   # AI procurement recommendations
│   │   │   ├── copilot.py       # Executive AI copilot
│   │   │   ├── reports.py       # Report generation
│   │   │   ├── alerts.py        # Notification management
│   │   │   └── analytics.py     # Analytics & KPIs
│   │   ├── agents/
│   │   │   └── agents.py        # 7 AI agents (LangGraph pattern)
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── services/
│   │   │   └── mock_data.py     # Comprehensive realistic mock data
│   │   └── core/
│   │       ├── config.py        # App settings (Pydantic)
│   │       ├── database.py      # Async PostgreSQL
│   │       └── security.py      # JWT auth & password hashing
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml           # Full stack deployment
└── .env.example                 # Environment variables template
```

---

## 🌟 Feature Overview

### 1. Executive Dashboard
**URL:** `/dashboard`

The command center. Shows supply chain health score (87/100), 6 KPI cards with live animations, 12-month performance trend chart, critical alerts, AI summary, and today's top 5 recommendations — all generated by AI agents.

### 2. Inventory Intelligence
**URL:** `/inventory`

Tracks 248+ SKUs across 5 warehouses. Shows current/reserved/incoming/outgoing/safety stock, days remaining (color-coded), AI action tags (ORDER NOW / TRANSFER / OPTIMAL), stock trend charts, and specific AI recommendations like "Order 500 units iPhone 15 Pro from TechCorp Asia — stock depletes in 5.8 days."

### 3. Supplier Intelligence
**URL:** `/suppliers`

Scores 47 suppliers on reliability, quality, on-time delivery, lead time, and risk. Shows AI-generated explanation for each supplier's current status. Includes supplier comparison chart and risk detection ("Shanghai TechParts Ltd. risk score jumped to 78.5 — reduce allocation immediately").

### 4. Shipment Intelligence
**URL:** `/shipments`

Live map (Leaflet, dark CartoDB tiles) showing 128 active shipments with real coordinates. Color-coded by status (red=delayed, green=on-time). Click markers for full detail. Delay prediction with probability %, weather/traffic impact analysis, and alternative route suggestions.

### 5. Demand Forecast
**URL:** `/demand`

30-day forecast with confidence bands, event detection (Festival Season, Back-to-School, Gaming Season), seasonality analysis. ComposedChart showing predicted demand, confidence bounds, and historical actuals. Confidence score: 91.2%.

### 6. Warehouse Dashboard
**URL:** `/warehouses`

5-warehouse network view with animated utilization gauges. Storage zone heatmap (8×6 grid, color-coded by occupancy). Incoming/outgoing truck tracking with ETAs. Efficiency scores and AI recommendations per warehouse.

### 7. Risk Intelligence Center
**URL:** `/risk`

Real-time risk score gauge (34/100 — MODERATE). 6 risk category cards (Weather, Supplier, Port, Political, Natural Disaster, Demand). Active risk events with AI-generated mitigation strategies. Current threats: Typhoon Mawar, Rotterdam strike, Bangladesh floods, TSMC shortage.

### 8. Procurement AI
**URL:** `/procurement`

AI recommends purchase orders with: quantity, supplier, warehouse, cost, expected savings, reasoning, and date. 5 current recommendations totaling $1.1M with $106K in identified savings. Approve/Modify/Reject workflow with confirmation modal.

### 9. Executive Copilot
**URL:** `/copilot`

Natural language AI chat. Ask anything about your supply chain:
- "Which supplier is most likely to fail next week?" → Detailed analysis of Shanghai TechParts
- "What products will run out of stock?" → Table of 3 critical SKUs
- "Generate today's executive report" → Summary with action items
- "Why is warehouse utilization low?" → Root cause analysis

### 10. AI Executive Reports
**URL:** `/reports`

Generate Daily/Weekly/Monthly/Custom reports. Configurable sections (Charts, Predictions, Risks, Recommendations). AI aggregates all agent outputs into a board-ready briefing. PDF download.

### 11. Notification Center
**URL:** `/notifications`

Filterable alert feed: Inventory, Shipment, Risk, Supplier alerts. Severity-coded (Critical/High/Medium/Low). Unread indicators with glow effects. Mark as read, mark all read.

### 12. Analytics
**URL:** `/analytics`

Deep performance analytics: Forecast accuracy trend, supplier radar chart, warehouse utilization stacked bars, shipment delay heatmap, cost breakdown area chart. 6 KPI cards with sparklines.

### 13. Digital Twin (Bonus)
**URL:** `/digital-twin`

"What if" scenario simulator. Configure: Supplier Failure / Demand Surge / Port Strike / Natural Disaster. AI models impact across 847 supply chain interdependencies. Shows revenue impact, affected shipments, stockout risk, recovery time, and step-by-step mitigation plan.

---

## 🤖 AI Agent Architecture

```
                    ┌─────────────────────┐
                    │  Executive Summary   │
                    │       Agent          │
                    │  (Copilot + Reports) │
                    └──────────┬──────────┘
                               │ aggregates
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼──────┐  ┌────────────▼────┐  ┌─────────────▼──────┐
│  Inventory   │  │   Supplier      │  │    Shipment         │
│    Agent     │  │     Agent       │  │      Agent          │
│  (stockout)  │  │  (risk score)   │  │  (delay predict)    │
└───────┬──────┘  └────────────┬────┘  └─────────────┬──────┘
        │                      │                      │
┌───────▼──────┐  ┌────────────▼────┐  ┌─────────────▼──────┐
│   Demand     │  │     Risk        │  │   Procurement       │
│    Agent     │  │     Agent       │  │      Agent          │
│  (forecast)  │  │  (risk events)  │  │  (PO optimize)      │
└──────────────┘  └─────────────────┘  └────────────────────┘
```

Each agent has:
- **Goal**: Specific optimization objective
- **Memory**: Conversation history + context
- **Tools**: Domain-specific data access
- **Reasoning**: Gemini Pro / Mock fallback
- **Output**: Structured recommendations + explanations

---

## 🔌 API Reference

All endpoints available at `http://localhost:8000/api/v1/`
Interactive docs: `http://localhost:8000/api/docs`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | JWT login |
| `/auth/signup` | POST | User registration |
| `/dashboard/overview` | GET | Full dashboard data |
| `/inventory/` | GET | All inventory with AI actions |
| `/suppliers/` | GET | Suppliers with scores |
| `/shipments/` | GET | Live shipments |
| `/warehouses/` | GET | Warehouse status |
| `/demand/forecast` | GET | 30-day forecast |
| `/risk/events` | GET | Active risk events |
| `/risk/score` | GET | Overall risk score |
| `/procurement/recommendations` | GET | AI purchase recommendations |
| `/copilot/chat` | POST | AI copilot query |
| `/reports/generate` | POST | Generate executive report |
| `/alerts/` | GET | All notifications |
| `/analytics/kpis` | GET | Analytics data |

---

## 🔑 Adding Your Gemini API Key

```bash
# Edit .env file
GEMINI_API_KEY=your_actual_key_here

# Restart backend
uvicorn app.main:app --reload
```

The system auto-detects the key and switches from mock to real Gemini AI responses instantly.

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0A0F1E` | Page background |
| Surface | `rgba(255,255,255,0.05)` | Cards, panels |
| Border | `rgba(255,255,255,0.08)` | Card borders |
| Primary | `#3B82F6` → `#06B6D4` | Buttons, active states |
| Accent | `#8B5CF6` | AI features, special cards |
| Success | `#10B981` | Positive metrics |
| Warning | `#F59E0B` | Medium risk, warnings |
| Danger | `#EF4444` | Critical alerts |
| Font | Inter | All text |

**Glassmorphism:** `backdrop-blur-xl bg-white/5 border border-white/8 rounded-2xl`

---

## 🐳 Docker Deployment

```bash
# Full stack (PostgreSQL + Redis + Backend + Frontend)
docker compose up --build

# Background
docker compose up -d --build

# Logs
docker compose logs -f backend

# Stop
docker compose down
```

Services:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- API Docs: `http://localhost:8000/api/docs`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

---

## 🧪 Testing

```bash
# Backend health check
curl http://localhost:8000/health

# Test dashboard API
curl http://localhost:8000/api/v1/dashboard/overview

# Test AI copilot
curl -X POST http://localhost:8000/api/v1/copilot/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Which supplier is most likely to fail next week?"}'
```

---

## 📊 Sample Data

The platform ships with rich realistic demo data:
- **8 Suppliers** across China, Germany, India, Mexico, Vietnam
- **15 Products** (electronics, apparel, pharma, industrial)
- **5 Warehouses** in Chicago, LA, Dallas, Atlanta, Seattle
- **7+ Active Shipments** with live coordinates
- **5 Risk Events** (typhoon, strike, floods, semiconductor shortage)
- **5 Procurement Recommendations** with AI reasoning
- **30-Day Demand Forecast** with festival/promo detection

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, TailwindCSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Maps | Leaflet + react-leaflet |
| Flow | ReactFlow |
| State | TanStack Query |
| Icons | Lucide React |
| Backend | FastAPI (async), Python 3.11 |
| Database | PostgreSQL 16 (SQLAlchemy 2.0 async) |
| Cache | Redis 7 |
| Tasks | Celery |
| AI | Gemini 2.0 Flash (via LangChain) |
| Agents | LangGraph pattern |
| Auth | JWT (HS256) |
| Containers | Docker + Docker Compose |

---

## 👤 Demo Credentials

```
Email:    admin@supplysense.ai
Password: demo123
```

---

## 📄 License

Built for hackathon demonstration. All supply chain data is simulated.

---

*Built with ❤️ by the SupplySense AI Team*
