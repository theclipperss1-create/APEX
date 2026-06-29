# APEX SaaS — Operational Feature Matrix & Registry Guide

This guide details all **20 core operational modules** available on the Apex platform. Features are logically grouped by industry category, detailing the target role, integrated interface widget, KPIs, database telemetry, and **urgency prioritization** (P0 to P2).

---

## Urgency Priority Definitions
- **P0 — Mission Critical**: Essential core systems required for immediate day-to-day operations. Failures directly halt business functions (e.g., clocking in, billing, medication dispatch, POS checkout).
- **P1 — Workflow High**: Crucial workflows that increase operational efficiency, prevent fraud, or manage staff allocations. High impact on resource management.
- **P2 — Optimization Medium**: Telemetry grids, reporting exports, and schedule validation tools that automate administrative checks.

---

## 1. Corporate Category (Workforce Operations)
*Focus: Automated HR payroll, attendance clock-ins, and multi-tier approval chains.*

| Feature Name | ID / Code | Target Role | Widget Type | KPIs Tracked | Priority | Technical Urgency Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Payroll Engine** | `payroll-engine` | Operations Manager / Admin | Calculator | • Payroll Processed ($/Mo)<br>• Insurance Sync Status<br>• Tax Filings State | **P0 (Critical)** | Core compensation engine. Processing salary, PPh 21, and BPJS sync is legally binding and business-critical. |
| **Live Attendance Selfie** | `live-attendance-selfie` | All Employees | Form Registry | • Present Today (%)<br>• Selfie Match Rate (%)<br>• Average Clock-In Time | **P0 (Critical)** | Gateway module for staff attendance. Bypasses GPS coordinates to ensure zero-lag selfie-only clock-in. |
| **Multi-Tier Approval** | `multi-tier-approval` | Manager / Director | Form Registry | • Pending Approvals<br>• SLA Response Time<br>• Approved Items Count | **P1 (High)** | Manages approval queues. Critical for preventing unauthorized resource distributions. |

---

## 2. School Category (Educational Institutions)
*Focus: Student records, tuition billing reminders, grading books, and timetable slots.*

| Feature Name | ID / Code | Target Role | Widget Type | KPIs Tracked | Priority | Technical Urgency Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Student Database** | `student-database` | School Registrar / Admin | Form Registry | • Total Registered Students<br>• Active Students<br>• Registered Classes | **P0 (Critical)** | Core data repository for student demographics, contact numbers, and parent profiles. |
| **Tuition (SPP) Billing** | `tuition-billing` | School Treasurer | Calculator | • Tuition Settled (%)<br>• Outstanding Balances<br>• Total SPP Revenue | **P0 (Critical)** | Drives school revenue collections. Automatically triggers WhatsApp reminders to parent contact logs. |
| **Grade Book System** | `grade-book-system` | Subject Teachers | Form Registry | • Class Averages<br>• Report Cards Ready<br>• Input Progress (%) | **P1 (High)** | Teacher utility for entering grade averages. Uses optimistic UI background auto-saving to prevent data loss. |
| **Teacher Scheduling** | `teacher-scheduling` | Curriculum Coordinator | Booking Scheduler | • Weekly Teaching Hours<br>• Scheduled Teachers Count<br>• Conflict Incidents | **P2 (Medium)** | Calendar builder that prevents double-booking teachers in overlapping classes. |

---

## 3. Food & Beverage (F&B) Category
*Focus: Cashier drawer reconciliation, FIFO raw ingredient batches, and crew rosters.*

| Feature Name | ID / Code | Target Role | Widget Type | KPIs Tracked | Priority | Technical Urgency Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Cash Drawer Audit** | `cash-drawer-audit` | Cashier Supervisor | Form Registry | • Audited Sessions / Day<br>• Cash Drawer Variance ($)<br>• Drawer Balance Status | **P0 (Critical)** | Closes POS cashier shifts. Enforces blind entry audits to prevent employee cash theft or variance. |
| **FIFO Inventory** | `fifo-inventory` | Kitchen Lead / Stock Keeper | Inventory | • Monitored Ingredients<br>• Expired Batch Counts<br>• Critical Stock Level Warnings | **P1 (High)** | Track shelf-life. Ensures first-in-first-out batch usage to prevent food spoilage and health violations. |
| **Dynamic Roster** | `dynamic-roster` | Restaurant Manager | Booking Scheduler | • Active Shifts / Day<br>• Scheduled Crew Count<br>• Shift Assignment Status | **P2 (Medium)** | Touch-friendly shift organizer for restaurant crew. |

---

## 4. Retail Category (Store & Warehouse)
*Focus: Supabase Realtime stock logs, offline opname, and secure register shifts.*

| Feature Name | ID / Code | Target Role | Widget Type | KPIs Tracked | Priority | Technical Urgency Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Live SKU Tracking** | `live-sku-tracking` | Store Manager | Inventory | • Active Store SKUs<br>• Stock Turnover Rate<br>• Low Stock Alerts | **P0 (Critical)** | Real-time stock counts via WebSockets. Prevents double-selling items on e-commerce vs offline checkouts. |
| **Stock Opname (Audit)** | `stock-opname` | Warehouse Auditor | Form Registry | • Audited Items (%)<br>• Offline Sync Queue Count<br>• Count Discrepancies | **P1 (High)** | Offline-first audit log. Syncs local stock takes stored in IndexedDB back to cloud once connection restores. |
| **Cashier Shift Handover** | `cashier-shift-handover` | Outgoing Cashier | Form Registry | • Handover Time<br>• Incoming Cashier Name<br>• Session Security Audit | **P1 (High)** | Secures cash registers. Auto-clears pending carts and logs out sessions to avoid register manipulation. |

---

## 5. Clinic Category (Healthcare Services)
*Focus: Secure EMR patient logs, Rx pharmacy pipelines, text-to-speech queues, and XML claims.*

| Feature Name | ID / Code | Target Role | Widget Type | KPIs Tracked | Priority | Technical Urgency Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lite EMR** | `lite-emr` | General Doctors | Form Registry | • Electronic Medical Records<br>• Data Encryption Standard<br>• Access Audit Trails | **P0 (Critical)** | Core clinical tool. Captures anamnesis, diagnoses, and medical histories securely with doctor-only access. |
| **Prescription Tracker** | `prescription-tracker` | Doctor / Pharmacist | Inventory | • Active Pharmacy Queue<br>• Avg Prescription Prep Time<br>• Dispensed Rx Count | **P0 (Critical)** | Immediate drug dispatch queue. Connects doctor prescription inputs directly to the pharmacy dispenser. |
| **Patient Queue System** | `patient-queue-system` | Front Desk / Nurse | Form Registry | • Registered Daily Admissions<br>• Avg Patient Wait Time<br>• Active Queue Ticket ID | **P1 (High)** | Patient reception manager. Integrates automated text-to-speech announcements for patient consultations. |
| **Insurance Billing Flow** | `insurance-billing-flow` | Clinic Billing Admin | Calculator | • Insurance Submission Rate<br>• Pending Claim Balances<br>• Lab Attachment Check | **P2 (Medium)** | Compiles clinic receipts and ICD-10 diagnostic codes into claim documents ready for XML exports. |

---

## 6. NGO Category (Non-Profit Organizations)
*Focus: Donor contribution CRM, public fund allocation chart, and disaster aid validation.*

| Feature Name | ID / Code | Target Role | Widget Type | KPIs Tracked | Priority | Technical Urgency Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Fund Allocation Tracker** | `fund-allocation-tracker` | Director / Public Relations | Calculator | • Total Capital Managed<br>• Public Transparency Audit<br>• Active Donation Sums | **P0 (Critical)** | Interactive chart proving donor allocation transparency. Key to maintaining public trust and funding. |
| **Donor CRM** | `donor-crm` | Donor Relations Coordinator | Form Registry | • Active Recurring Donors<br>• Donor Lifetime Value (LTV)<br>• Email Receipt Dispatch (%) | **P1 (High)** | Tracks recurring contributors. Automatically sends transactional receipt e-slips via Resend/SendGrid. |
| **Beneficiary Database** | `beneficiary-database` | Field Aid Coordinator | Form Registry | • Beneficiaries Registered<br>• Identity Check Validity<br>• Aid Distributed (%) | **P1 (High)** | Prevents aid abuse in disaster zones by verifying recipient IDs and logs using regex constraints. |

---

*This operational matrix is synchronized with the Apex application's feature routes and modular dashboard panels.*
