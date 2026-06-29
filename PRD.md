# APEX — Product Requirements Document
**The Pinnacle of Enterprise Control**

> Version 1.0 | Multi-Tenant B2B SaaS Platform | Confidential

| Status | Version | Date | Classification |
|--------|---------|------|----------------|
| DRAFT | 1.0 | 2025 | Confidential |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Product Scope](#3-product-scope)
4. [User Personas](#4-user-personas)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Technical Architecture](#7-technical-architecture)
8. [Billing & Payment Architecture](#8-billing--payment-architecture)
9. [User Stories & Acceptance Criteria](#9-user-stories--acceptance-criteria)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Delivery Phases](#11-delivery-phases)
12. [Appendix](#12-appendix)

---

## 1. Executive Summary

Apex is a multi-tenant B2B SaaS platform engineered for enterprise-grade scalability, operational reliability, and precision control. Built under the philosophy of **"Zero-Burden Client"**, all computational and data-processing load is offloaded to the server layer, ensuring a lean, fast, and resilient front-end experience regardless of device quality or network conditions.

Apex serves organizations across six industry verticals — corporate, education, food & beverage, retail, healthcare (clinics), and NGOs — by providing a modular operations suite covering attendance tracking, payroll, task management, and inventory control. Tenants onboard via a self-service registration portal and manage their own workforce through a role-based, invite-code access system.

The platform is designed to operate in low-connectivity environments via a PWA-first offline mode, with an intelligent sync queue that reconciles local actions when connectivity is restored. Security is enforced at every layer: from PostgreSQL Row-Level Security (RLS) policies ensuring strict tenant data isolation, to Edge Middleware preventing cross-tenant routing.

### 1.1 Product Vision

- Deliver a high-density, industrial-grade operations dashboard that prioritizes data density and functional clarity over decorative aesthetics.
- Enable any organization — from a 10-person clinic to a 1,000-person enterprise — to deploy a tailored operational suite within minutes.
- Ensure zero data leakage between tenants through database-layer and middleware-layer isolation.
- Support operations in intermittent-connectivity environments through offline-first architecture.

### 1.2 Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Tenant onboarding time | < 5 minutes | MVP Launch |
| Clock-in action latency | < 800ms (online) | MVP Launch |
| Offline sync reliability | 99.5% success rate | v1.1 |
| Cross-tenant data breach | Zero incidents | All time |
| Monthly Active Tenants (MAT) | 500 within 12 months | 12 months post-launch |

---

## 2. Problem Statement

### 2.1 Target Market Pain Points

SMEs and mid-market enterprises across Southeast Asia operate with fragmented tooling — attendance managed via spreadsheets, tasks tracked in messaging apps, and inventory counted manually. The existing SaaS landscape presents two extremes:

- **Overly complex enterprise platforms** (SAP, Oracle) with prohibitive licensing costs and lengthy implementation cycles.
- **Lightweight consumer apps** (Notion, Trello) that lack multi-tenancy, audit trails, and role-based access controls required for B2B operations.

Apex fills the gap: a purpose-built, deployable-in-minutes platform with enterprise-grade isolation and security, accessible at SME pricing.

### 2.2 Core User Frustrations Addressed

| User Segment | Current Pain | Apex Solution |
|---|---|---|
| HR / Operations Manager | Manual attendance records, no GPS verification | Geo-locked clock-in with photo capture |
| Team Lead | Task assignments scattered across WhatsApp | Centralized task board with status tracking |
| Warehouse Staff | Paper-based stock counting with no audit trail | High-density inventory table with SKU tracking |
| IT Admin | Managing multi-department access manually | Role-based invite codes with permission scopes |
| Field Worker | No attendance option without internet | Offline clock-in with sync queue |

---

## 3. Product Scope

### 3.1 In Scope — MVP

- Multi-tenant registration and onboarding (company slug creation)
- Role-based access via invite codes (Admin, Manager, Employee tiers)
- Attendance module: geo-locked clock-in/out with selfie capture
- Task management module: Kanban-style status tracking
- Inventory module: SKU-level asset tracking with condition logging
- Super Admin dashboard: module toggles, user management, dummy account creation
- Billing page with QRIS payment and WhatsApp confirmation flow
- Offline-first PWA with IndexedDB sync queue
- Edge Middleware for tenant isolation and auth protection
- Vercel Cron job for suspended tenant data cleanup

### 3.2 Out of Scope — MVP

- Native mobile application (iOS / Android)
- Payroll calculation engine (schema reserved, UI deferred)
- Advanced analytics and reporting dashboards
- Third-party calendar integrations (Google Calendar, Outlook)
- Direct payment gateway integration (Midtrans, Stripe)
- AI-powered anomaly detection for attendance fraud

### 3.3 Future Roadmap

| Phase | Version | Feature | Timeline |
|-------|---------|---------|----------|
| 2 | v1.1 | Payroll module with automated slip generation | Q2 2026 |
| 2 | v1.1 | Leave request and approval workflow | Q2 2026 |
| 3 | v1.2 | Analytics dashboard (attendance heatmaps, task velocity) | Q3 2026 |
| 3 | v1.2 | Direct Midtrans/Xendit payment integration | Q3 2026 |
| 4 | v2.0 | Native mobile apps (React Native) | Q1 2027 |
| 4 | v2.0 | AI attendance fraud detection | Q1 2027 |

---

## 4. User Personas

### 4.1 Persona A — The Operations Boss

| | |
|---|---|
| **Role** | Founder / Operations Director |
| **Industry** | Corporate, Retail, or F&B (5–200 employees) |
| **Goals** | Real-time visibility into team attendance, tasks, and stock levels without manual reporting. |
| **Frustrations** | Spreadsheets break, messaging apps mix personal and work, no audit trail for disputes. |
| **Apex Actions** | Registers company, creates roles, toggles modules, creates dummy accounts for field staff. |
| **Key Metric** | Reduced time on daily operational reporting by 70%. |

### 4.2 Persona B — The Team Manager

| | |
|---|---|
| **Role** | Department Head / Supervisor |
| **Industry** | School, NGO, Clinic |
| **Goals** | Assign and monitor tasks, approve attendance anomalies, track inventory usage. |
| **Frustrations** | No visibility on task progress without interrupting team members. |
| **Apex Actions** | Creates and assigns tasks, views attendance logs, updates inventory counts. |
| **Key Metric** | Zero missed deadlines due to forgotten task assignments. |

### 4.3 Persona C — The Field Employee

| | |
|---|---|
| **Role** | Frontline Staff / Field Worker |
| **Industry** | All verticals |
| **Goals** | Clock in/out quickly, see assigned tasks, log inventory items. |
| **Frustrations** | Poor internet at work sites, no smartphone or email address. |
| **Apex Actions** | Uses invite code to join, clocks in offline, views task board. |
| **Key Metric** | Clock-in completed in under 30 seconds including selfie capture. |

---

## 5. Functional Requirements

### 5.1 Authentication & Onboarding

#### 5.1.1 Tenant Registration (`/register`)

- Collect: Company name, industry category, unique slug, admin email, password.
- Validate slug against a strict blacklist: `admin`, `api`, `auth`, `login`, `register`, `join`, `dashboard`, `billing`, `support`, `public`, `_next`.
- On success: create Supabase Auth user, insert company record, insert default admin role, assign user to that role.
- Redirect to `/[slug]/admin` after successful registration.

#### 5.1.2 Admin Login (`/login`)

- Email/password authentication via Supabase Auth.
- On success: store session in HttpOnly cookies, extract `company_slug` from user metadata, redirect to `/[slug]/dashboard`.
- Failed login: display inline error without full page reload.

#### 5.1.3 Employee Invite Join (`/join`)

- Input: invite code (6–10 character alphanumeric).
- Validate: query `roles` table `WHERE invite_code = input` (public RLS policy allows this).
- On valid code: prompt for `full_name` and password. No email required.
- Create Supabase Auth user with pseudo-email: `{generated_id}@{company_slug}.local`.
- Insert user record with correct `company_id` and `role_id` from the matched role.
- Redirect to `/[slug]/dashboard`.

### 5.2 Edge Middleware (`middleware.ts`)

- Executes at Vercel Edge runtime — zero cold start.
- Intercepts all requests matching `/[slug]/*` pattern.
- Reads `sb-access-token` from HttpOnly cookies to verify session.
- Unauthenticated request → redirect to `/login` (no UI flash).
- Authenticated request: compare URL slug against `user_metadata.company_slug`.
- Slug mismatch → redirect to `/${user_metadata.company_slug}/dashboard` (prevents cross-tenant URL guessing).

### 5.3 Module: Attendance

#### 5.3.1 Clock-In Flow

- Trigger GPS acquisition with `maximumAge: 0`, `enableHighAccuracy: true`, `timeout: 5000ms`.
- Block submission if GPS accuracy > 100 meters (anti-spoofing).
- Capture selfie via device camera. Compress client-side to max 100KB / 1080px using `browser-image-compression` with `useWebWorker: true`.
- Upload compressed photo to Supabase Storage under `/{company_id}/attendance/`.
- Insert `attendance_log` record — timestamp is set by PostgreSQL `DEFAULT NOW()`, never from client JavaScript.
- If offline: push action to Zustand `offlineQueue` with full payload. Show toast: "Queued for sync".

#### 5.3.2 Clock-Out Flow

- Available only if an open `attendance_log` exists (`clock_out_time IS NULL`) for the current user today.
- Record `clock_out_location` and update `clock_out_time` via PostgreSQL trigger.
- Calculate and display duration from the server-returned timestamps.

#### 5.3.3 Admin Attendance View

- High-density table: Employee Name, Date, Clock-In, Clock-Out, Duration, GPS Status, Photo thumbnail.
- Filter by date range, employee, and status.
- Click row → Sheet (side drawer) opens with full detail: map preview of coordinates, full-size photo.

### 5.4 Module: Task Management

- Create tasks with: title, description, assignee (from company users), due date, status (`todo` / `in_progress` / `review` / `done`).
- Update task status via drag-and-drop on Kanban board or inline dropdown in table view.
- Due date highlighting: overdue tasks display with red border accent.
- Assignee can only update status of tasks assigned to them. Only admin/manager roles can create and reassign tasks.
- Task detail view opens in Sheet drawer, not full-page modal.

### 5.5 Module: Inventory Management

- Assets tracked by: item name, SKU, quantity, condition (`good` / `fair` / `damaged`), last checked by (user reference).
- High-density data table with Geist Mono font applied to SKU, quantity, and timestamp columns.
- Add/Edit asset opens Sheet drawer with form fields.
- Bulk quantity update support (e.g., receive 50 units of SKU-001).
- Low stock flagging: items with `quantity` below configurable threshold displayed with amber row accent.

### 5.6 Super Admin Dashboard

- Module toggle panel: enable/disable attendance, tasks, inventory, payroll per company (stored as JSONB in `companies.active_modules`).
- Sidebar dynamically hides module links based on `active_modules` read from Zustand store.
- Subscription tier display and manual override (for testing).
- Dummy account creation: admin enters `full_name` → system generates pseudo-email → Supabase Admin API creates user without email confirmation.
- Password reset for dummy accounts: triggered via Server Action using Supabase service role key.

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Requirement | Target | Method |
|---|---|---|
| First Contentful Paint (FCP) | < 1.2 seconds | RSC + Edge caching |
| Clock-in form submission | < 800ms round trip | Supabase Edge Functions |
| Inventory table render (500 rows) | < 300ms | Server-side pagination |
| Image upload (selfie) | < 2 seconds | Client compression to 100KB |
| Offline queue sync | < 5 seconds on reconnect | Batched Supabase upserts |

### 6.2 Security

- Row-Level Security (RLS) enabled on all six PostgreSQL tables — Tenant Isolation enforced at database layer.
- No client-side timestamp injection for attendance records — PostgreSQL `DEFAULT NOW()` only.
- GPS `enableHighAccuracy: true` enforced — network triangulation insufficient.
- Cross-tenant URL access blocked at Edge Middleware layer before any React component renders.
- Service Role key never exposed to client — only used in Next.js Server Actions.
- Email confirmation disabled for internal/dummy accounts; managed via Admin API only.

### 6.3 Scalability

- Multi-tenant architecture: each tenant's data fully isolated via `company_id` foreign keys and RLS.
- Vercel Edge Functions scale horizontally to zero — no idle cost.
- Supabase PostgreSQL connection pooling via PgBouncer (built-in).
- JSONB `active_modules` column allows module expansion without schema migrations.

### 6.4 Reliability & Offline

- PWA Service Worker caches app shell and static assets.
- Zustand store persisted to IndexedDB (`idb-keyval`) — survives browser refresh.
- Offline queue: all mutations stored as typed action objects with timestamp and UUID.
- Reconnection listener (`window 'online'` event) triggers automatic queue processing.
- Success toast displayed post-sync: "Data synced successfully" via Shadcn Toast component.

### 6.5 Maintainability

- Strict Next.js App Router directory conventions enforced (`marketing`, `auth`, `[slug]` route groups).
- Shadcn UI components stored in `/components/ui/` — modified for 0–2px border radius.
- Shared utilities in `/lib/utils.ts` (Tailwind merge, date formatting).
- All Supabase clients centralized in `/lib/supabase/client.ts` and `/lib/supabase/server.ts`.

---

## 7. Technical Architecture

### 7.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend Framework | Next.js 14+ (App Router) | RSC minimizes client JS; file-based routing for multi-tenant slug structure |
| Styling | Tailwind CSS + Shadcn UI | Utility-first, zero-runtime CSS; Shadcn for accessible headless components |
| State Management | Zustand + idb-keyval | Lightweight; persist middleware with IndexedDB for large offline queues |
| Backend & DB | Supabase (PostgreSQL) | Built-in Auth, RLS, Storage, and Realtime; hosted PostgreSQL at scale |
| Hosting | Vercel Edge | Global edge network; Edge Middleware for zero-latency auth checks |
| Image Processing | browser-image-compression | Client-side WebWorker compression to < 100KB before any network call |
| Typography | Geist / Geist Mono | Geist for UI; Geist Mono for all tabular numeric and ID data |
| Payments | Manual QRIS + WhatsApp | MVP-appropriate; no gateway integration complexity; LLM-verified receipts |

### 7.2 Database Schema Overview

Six core tables implement the full multi-tenant data model. All tables have RLS enabled with `company_id` as the isolation key.

| Table | Primary Purpose | Key Columns |
|---|---|---|
| `companies` | Tenant registry | `id`, `slug`, `name`, `category`, `tier`, `active_modules` (JSONB) |
| `roles` | Permission groups with invite codes | `id`, `company_id`, `name`, `invite_code`, `permissions` (JSONB), `is_admin` |
| `users` | User profiles linked to Supabase Auth | `id`, `auth_id`, `company_id`, `role_id`, `email`, `full_name`, `is_dummy_account` |
| `attendance_logs` | Clock-in/out records with GPS + photo | `id`, `user_id`, `company_id`, `clock_in_time`, `clock_out_time`, `photo_url`, `location` (JSONB) |
| `tasks` | Work item tracking | `id`, `company_id`, `assignee_id`, `creator_id`, `title`, `status` (ENUM), `due_date` |
| `inventory_assets` | Physical asset registry | `id`, `company_id`, `sku`, `item_name`, `quantity`, `condition`, `last_checked_by` |

### 7.3 Application Directory Structure

```
/src
 ├── /app
 │    ├── (marketing)           # Public, SEO-optimized landing pages
 │    │    ├── page.tsx
 │    │    └── pricing/page.tsx
 │    ├── (auth)                # No sidebars. Centered, split-screen UI.
 │    │    ├── login/page.tsx   # Admin Login
 │    │    ├── join/page.tsx    # Employee Invite Code Entry
 │    │    └── register/page.tsx# Tenant Creation
 │    ├── [slug]                # Dynamic tenant routing
 │    │    ├── layout.tsx       # Sidebar, Topbar, Offline Indicator Shell
 │    │    ├── admin/page.tsx   # Super Admin Dashboard
 │    │    ├── attendance/page.tsx
 │    │    ├── tasks/page.tsx
 │    │    └── inventory/page.tsx
 │    └── api
 │         ├── webhooks/whatsapp/route.ts
 │         └── cron/cleanup/route.ts
 ├── /components
 │    ├── ui/                   # Shadcn raw components (0–2px border radius)
 │    └── shared/               # ImageCompressor, GPSBlocker, OfflineSyncToast
 ├── /lib
 │    ├── supabase/
 │    │    ├── client.ts        # createBrowserClient
 │    │    └── server.ts        # createServerClient (Cookies handling)
 │    ├── store.ts              # Zustand + IndexedDB logic
 │    └── utils.ts              # Tailwind merge, date formatting
 └── middleware.ts              # Edge Middleware for Route Protection
```

### 7.4 Design System

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0C111D` (Deep Navy) | Default page background |
| `--surface` | `rgba(255,255,255,0.03)` | Card and panel surfaces |
| `--primary` | `#38BDF8` (Light Blue) | CTAs, active states, highlights |
| `--border` | `rgba(255,255,255,0.1)` | All 1px sharp borders |
| `--radius` | `0.125rem` (2px) | Applied globally — no rounded corners |
| `font-sans` | Geist | All UI text, labels, headings |
| `font-mono` | Geist Mono | Money, UUIDs, SKUs, timestamps in tables |

---

## 8. Billing & Payment Architecture

### 8.1 MVP Payment Flow

1. Tenant visits `/[slug]/billing` — page fetches and displays current subscription tier and a static QRIS payment image.
2. Tenant clicks **"Confirm Payment via WhatsApp"** — opens `wa.me` link pre-filled with company UID and plan selection.
3. Admin reviews WhatsApp payment receipt. An LLM-powered automation gateway (e.g., OpenClaw) verifies the receipt.
4. Automation gateway POSTs to `/api/webhooks/whatsapp` with `{company_id, new_tier}`.
5. Route Handler validates request signature, updates `companies.tier` in Supabase using service role key.

### 8.2 Subscription Tiers

| Tier | Modules Available | User Limit | Data Retention |
|------|-------------------|------------|----------------|
| `free` | Attendance + Tasks | Up to 15 users | 90 days |
| `pro` | All modules | Up to 100 users | 1 year |
| `enterprise` | All modules + API access | Unlimited | Unlimited |
| `suspended` | None (read-only) | N/A | 60 days then purge |

### 8.3 Data Retention Cron Job

A Vercel Cron Job executes daily at midnight (`0 0 * * *`) via `/api/cron/cleanup`. The job uses the Supabase service role key to bypass RLS and hard-deletes company records (cascading to all related tables and Storage buckets) where `tier = 'suspended'` AND `updated_at < NOW() - INTERVAL '60 days'`.

---

## 9. User Stories & Acceptance Criteria

### 9.1 Onboarding

| # | User Story | Acceptance Criteria |
|---|---|---|
| 1 | As a boss, I want to register my company so my team can use Apex. | Slug uniqueness validated, blacklist enforced, admin role auto-created, redirect to `/[slug]/admin`. |
| 2 | As an employee, I want to join via an invite code so I don't need an email. | Valid invite code resolves to role, pseudo-email auto-generated, no email confirmation required. |
| 3 | As an admin, I want to create a dummy account for a staff member. | Admin enters name, system generates credentials, staff can log in using name + password only. |

### 9.2 Attendance

| # | User Story | Acceptance Criteria |
|---|---|---|
| 4 | As an employee, I want to clock in with my location verified. | GPS acquired with `enableHighAccuracy`, accuracy > 100m blocks submission, timestamp from server only. |
| 5 | As an employee, I want to clock in offline when there's no internet. | Action queued in IndexedDB, synced on reconnect, success toast shown. |
| 6 | As a manager, I want to see all attendance logs for today. | Filterable table with GPS status, photo thumbnail, click-to-detail Sheet drawer. |

### 9.3 Tasks & Inventory

| # | User Story | Acceptance Criteria |
|---|---|---|
| 7 | As a manager, I want to assign a task with a due date. | Task created with assignee, due date, status default `todo`. Overdue tasks visually flagged. |
| 8 | As an employee, I want to update the status of my assigned task. | Employee can only update tasks where `assignee_id = own user id`. Status dropdown in row. |
| 9 | As a warehouse manager, I want to log inventory items with SKU. | Asset added with SKU, quantity, condition. Table uses Geist Mono for numeric/ID columns. |
| 10 | As an admin, I want to disable unused modules. | Toggle in `/admin` updates `active_modules` JSONB. Sidebar links hidden in real time via Zustand. |

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| GPS spoofing via mock location apps | Medium | High | `enableHighAccuracy` forces hardware GPS; server-side plausibility check on coordinates. |
| Cross-tenant data leak via URL guessing | Low | Critical | Edge Middleware slug mismatch redirect + PostgreSQL RLS double enforcement. |
| IndexedDB storage quota exceeded | Low | Medium | `idb-keyval` handles quota better than localStorage; queue items purged post-sync. |
| WhatsApp webhook spoofing (fake payment) | Medium | High | Request signature validation on `/api/webhooks/whatsapp`; HMAC verification. |
| Supabase rate limits on invite code validation | Low | Medium | Public RLS policy allows unauthenticated SELECT; no auth call needed for code lookup. |
| Photo upload failure on poor connection | High | Low | Client compression + retry logic; offline queue captures failed uploads for sync. |

---

## 11. Delivery Phases

| Phase | Name | Deliverables | Est. Duration |
|-------|------|-------------|---------------|
| 1 | Initialization | Next.js setup, Tailwind Glass & Precision theme, Shadcn component install | 3 days |
| 2 | Database | Full PostgreSQL migration script with all tables, ENUMs, triggers, and RLS policies | 2 days |
| 3 | Auth & Middleware | Supabase client/server utilities, Edge Middleware tenant isolation | 3 days |
| 4 | Auth UI | Split-screen `/login`, `/register` (with blacklist), `/join` (invite code processor) | 4 days |
| 5 | State & PWA | Zustand store with IndexedDB persistence, offline queue processor | 3 days |
| 6 | Dashboard Shell | Dynamic sidebar (module-aware), topbar, offline indicator | 3 days |
| 7 | Attendance Module | Geo-locked clock-in/out, image compression, admin log table | 5 days |
| 8 | Inventory Module | High-density asset table, Sheet drawer CRUD, Geist Mono columns | 4 days |
| 9 | Billing & Webhooks | QRIS billing page, WhatsApp flow, webhook endpoint, Cron cleanup | 3 days |

**Total Estimated MVP Duration: 30 Working Days (6 Weeks)**

---

## 12. Appendix

### 12.1 Glossary

| Term | Definition |
|---|---|
| RSC | React Server Component — renders HTML on the server, sends zero JS to client. |
| RLS | Row-Level Security — PostgreSQL policy enforcing per-row access control. |
| Tenant | A company registered on Apex, isolated by their unique slug and `company_id`. |
| Slug | URL-safe company identifier (e.g., `acme-corp`) used for tenant routing. |
| Dummy Account | Supabase Auth user created without a real email, for staff without email access. |
| Offline Queue | Zustand array of pending mutations stored in IndexedDB, synced on reconnect. |
| QRIS | Quick Response Code Indonesian Standard — national QR payment scheme. |
| Edge Middleware | Next.js middleware running at Vercel Edge CDN before any page renders. |
| active_modules | JSONB column on `companies` table toggling which feature modules are visible. |

### 12.2 Industry Categories

| Value | Description |
|---|---|
| `corporate` | General business / professional services |
| `school` | Educational institutions (K-12, universities) |
| `fnb` | Food & Beverage (restaurants, cafes, catering) |
| `retail` | Shops, e-commerce fulfillment centers |
| `clinic` | Medical practices, dental, allied health |
| `ngo` | Non-governmental organizations, charities |

### 12.3 Slug Blacklist

The following slugs are permanently reserved and may not be registered by tenants:

```
admin, api, auth, login, register, join, dashboard, billing, support, public, _next
```

---

*End of Document — Apex PRD v1.0 | Confidential*
