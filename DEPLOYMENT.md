# Dream Decorators ERP - Production & Cloud Deployment Guide

This document outlines the deployment strategy for taking the **Dream Decorators ERP Monorepo** live to online production environments.

---

## 1. System Architecture Overview

```mermaid
flowchart TD
    subgraph Client Tier
        UserBrowser["Web Browser / Mobile Client"]
    end

    subgraph CDN & Reverse Proxy
        VercelOrNginx["Vercel Edge / Cloudflare / Nginx (HTTPS: 443)"]
    end

    subgraph Application Tier
        Frontend["Next.js 14 Web App (Port 3000)"]
        Backend["Express REST API (Port 5001)"]
    end

    subgraph Data Tier
        Postgres[("PostgreSQL 16 Enterprise Database")]
        FileStorage["Uploads Storage Volume (Images / PDFs)"]
    end

    UserBrowser --> VercelOrNginx
    VercelOrNginx --> Frontend
    VercelOrNginx --> Backend
    Frontend --> Backend
    Backend --> Postgres
    Backend --> FileStorage
```

---

## 2. Recommended Deployment Options

### Option A: 1-Click Multi-Container VPS Deployment (Recommended for Cost & Control)
**Best for**: DigitalOcean Droplet, AWS EC2, Hetzner, Linode, or any Linux server.

1. **Clone the Repository on Server**:
   ```bash
   git clone https://github.com/priyankpanchal2429/Dream-Decorators.git
   cd Dream-Decorators
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   # Edit .env and supply strong production passwords:
   # POSTGRES_PASSWORD=<strong_random_password>
   # JWT_SECRET=<strong_64_char_random_secret>
   # FRONTEND_URL=https://erp.yourdomain.com
   # NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
   ```

3. **Start Containers via Docker Compose**:
   ```bash
   docker compose up -d --build
   ```

4. **Initialize & Seed Database**:
   ```bash
   docker compose exec backend npx prisma db push --schema=packages/database/prisma/schema.prisma
   docker compose exec backend npm run seed --workspace=@dream-decorators/database
   ```

---

### Option B: Managed Serverless / PaaS (Zero Server Maintenance)

| Component | Recommended Platform | Configuration |
|---|---|---|
| **Database** | **Neon / Supabase / Railway Postgres** | Provision PostgreSQL 16 instance. Copy connection string to `DATABASE_URL`. |
| **Backend API** | **Railway / Render** | Root Directory: Repository root. Build command: `npm ci && npm run build --workspace=@dream-decorators/database && npm run build --workspace=@dream-decorators/backend`. Start command: `node apps/backend/dist/server.js`. |
| **Frontend Web** | **Vercel** | Root Directory: `apps/frontend`. Framework Preset: Next.js. Environment Variable: `NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1`. |

---

## 3. Database Initialization & Seeding

Run the following commands to initialize the schema and populate default master data (superadmin user, active financial year `FY2026-27`, warehouse, product categories, and sample transactions):

```bash
# Push Prisma schema to live database
npm run db:push

# Populate database with enterprise seed data
npm run seed --workspace=@dream-decorators/database
```

### Seed Master Credentials:
- **Admin Email**: `admin@dreamdecorators.com`
- **Admin Password**: `Admin@12345` *(Change immediately in production via `/settings`)*
- **Active Financial Year**: `FY2026-27`

---

## 4. Environment Variables Matrix

| Variable | Description | Example (Production) |
|---|---|---|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Backend HTTP port | `5001` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname?schema=public` |
| `JWT_SECRET` | Secret key for signing auth tokens | `f7a29e4d081b2c4e5...` (minimum 32 chars) |
| `JWT_EXPIRES_IN` | Token validity duration | `7d` |
| `FRONTEND_URL` | Allowed CORS origin for web app | `https://erp.dreamdecorators.com` |
| `NEXT_PUBLIC_API_URL` | Public backend API URL consumed by client | `https://api.dreamdecorators.com/api/v1` |
| `UPLOAD_DIR` | Directory for uploaded bill attachments | `uploads` |
| `MAX_FILE_SIZE_MB` | Max upload size in megabytes | `10` |
| `LOG_LEVEL` | Application logging verbosity | `info` |

---

## 5. Security & Pre-Launch Checklist

- [x] **Strict CORS Policy**: Restricted to authorized domain origins in production.
- [x] **Helmet Headers**: Secure HTTP response headers enabled.
- [x] **Rate Limiting & Payload Limits**: Maximum request body capped to prevent memory attacks.
- [x] **Password Hashing**: Bcrypt with 10 salt rounds for all user credentials.
- [x] **Stateless JWT**: Secure Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `SALES_EXECUTIVE`, `ACCOUNTANT`).
- [x] **Database Transactions**: All financial documents (Invoices, Challans, Payments) execute with ACID transaction isolation.
