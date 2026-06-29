# Apex 120 Features List

Edit this file to modify the names, descriptions, KPIs, or actions for each feature. Once you are done, I will parse this file and compile it back into the codebase.

## CORPORATE

### 1. Payroll Engine
- **ID**: `payroll-engine`
- **Description**: Calculates basic salary, allowances, and tax deductions (PPh 21 equivalent) automatically on the server-side (Cron / Edge Functions) based on monthly employee attendance.
- **Action Label**: Run Payroll Calculation
- **Success Message**: Payroll calculation completed successfully. Salary slips are ready for review.
- **KPIs**:
  - *Payroll Processed*: `$32K / Mo`
  - *Insurance Sync*: `Connected`
  - *Tax Filings*: `Completed`

### 2. Live Attendance Selfie
- **ID**: `live-attendance-selfie`
- **Description**: Employee attendance clock-in utilizing front-facing camera selfies. Fully excludes GPS location tracking for privacy and lightweight execution.
- **Action Label**: Verify Selfie & Clock In
- **Success Message**: Selfie verification successful. Attendance logged.
- **KPIs**:
  - *Present Today*: `96.4%`
  - *Selfie Match Rate*: `100%`
  - *Average Clock-In*: `07:54 AM`

### 3. Multi-Tier Approval
- **ID**: `multi-tier-approval`
- **Description**: Multi-level document approval workflow (Staff -> Manager -> Director) secured with database Row Level Security (RLS) policies.
- **Action Label**: Process Approval Queue
- **Success Message**: Document approved and routed to the next tier.
- **KPIs**:
  - *Pending Approvals*: `3 Items`
  - *SLA Response Time*: `28 Mins`
  - *Approved Work Items*: `142 Items`

## SCHOOL

### 1. Student Database
- **ID**: `student-database`
- **Description**: Centralized repository for Student IDs, personal data, grade history, and parent contacts. Features a fast 300ms debounced search and DOM virtualization.
- **Action Label**: Search Student Database
- **Success Message**: Student database query updated.
- **Placeholder**: Enter student name or ID...
- **KPIs**:
  - *Total Students*: `450`
  - *Active Students*: `448`
  - *Registered Classes*: `15`

### 2. Tuition (SPP) Billing
- **ID**: `tuition-billing`
- **Description**: Automatic tuition invoicing on the 1st of every month with integrated WhatsApp notification alerts and payment gateway webhook tracking.
- **Action Label**: Broadcast Bills via WhatsApp
- **Success Message**: Tuition invoices and payment links broadcasted to parents via WhatsApp.
- **KPIs**:
  - *Tuition Settled*: `92%`
  - *Outstanding Balance*: `38 Students`
  - *Total Revenue*: `$15K`

### 3. Grade Book System
- **ID**: `grade-book-system`
- **Description**: Spreadsheet-like inline grade entry interface for teachers with optimistic UI background auto-saving to prevent data loss.
- **Action Label**: Compute Report Grades
- **Success Message**: Report card grades computed and auto-saved successfully.
- **KPIs**:
  - *Class Average*: `82.4`
  - *Report Cards Ready*: `15 Classes`
  - *Grades Inputted*: `88%`

### 4. Teacher Scheduling
- **ID**: `teacher-scheduling`
- **Description**: Conflict-free teacher timetable builder with automated clash checking on the API server and weekly slot grids.
- **Action Label**: Validate Timetable Conflicts
- **Success Message**: Timetable check complete: Zero scheduling conflicts detected.
- **KPIs**:
  - *Teaching Hours*: `420 Hrs / Wk`
  - *Scheduled Teachers*: `38`
  - *Schedule Conflicts*: `0 Cases`

## FNB

### 1. Cash Drawer Audit
- **ID**: `cash-drawer-audit`
- **Description**: Digital cash drawer reconciliation at the end of every cashier shift with Blind Balance inputs to prevent employee bias.
- **Action Label**: Submit Cash Audit Log
- **Success Message**: Cash drawer audit log reconciled successfully with POS ledger.
- **KPIs**:
  - *Audited Sessions*: `2 / Day`
  - *Cash Variance*: `$0.00`
  - *Drawer Status*: `Reconciled`

### 2. FIFO Inventory (Raw Materials)
- **ID**: `fifo-inventory`
- **Description**: Raw ingredients expiration tracking by batch sequence (First In, First Out) utilizing SQL stored procedures for minimal latency.
- **Action Label**: Scan Expiration Batches
- **Success Message**: FIFO inventory records updated. Expiration alerts verified.
- **KPIs**:
  - *Monitored Ingredients*: `124 Items`
  - *Expired Batches*: `0 Items`
  - *Critical Stock Items*: `3 Items`

### 3. Dynamic Roster
- **ID**: `dynamic-roster`
- **Description**: Shift roster scheduler (Morning, Afternoon, Night) with responsive touch-friendly drag-and-drop support designed for tablet screens.
- **Action Label**: Save Shift Schedule
- **Success Message**: Weekly shift roster saved and published to the employee portal.
- **KPIs**:
  - *Active Shifts*: `3 / Day`
  - *Scheduled Crew*: `12 Staff`
  - *Roster Status*: `Assigned`

## RETAIL

### 1. Live SKU Tracking
- **ID**: `live-sku-tracking`
- **Description**: Real-time stock level monitoring for product entries and sales using WebSockets (Supabase Realtime).
- **Action Label**: Connect Realtime Stream
- **Success Message**: WebSocket connected. Realtime SKU tracking streams are active.
- **KPIs**:
  - *Active SKUs*: `8,900`
  - *Stock Turnover*: `12.4 Days`
  - *Low Stock Warnings*: `3 SKUs`

### 2. Stock Opname (Audit)
- **ID**: `stock-opname`
- **Description**: Offline-first stock taking module powered by IndexedDB / localStorage for warehouses with low Wi-Fi coverage.
- **Action Label**: Start Offline Audit Session
- **Success Message**: Stock count synchronized successfully with the database server.
- **KPIs**:
  - *Audited Items*: `94.2%`
  - *Offline Sync Queue*: `0 Items`
  - *Audit Discrepancies*: `2 Pcs`

### 3. Cashier Shift Handover
- **ID**: `cashier-shift-handover`
- **Description**: Secure cashier session closing, cart clearing, and JWT token invalidation for next shift login to prevent session theft.
- **Action Label**: Trigger Shift Handover
- **Success Message**: Cashier session closed. Terminal locked for the next incoming operator.
- **KPIs**:
  - *Last Handover*: `03:00 PM`
  - *Active Cashier*: `Rani Wijaya`
  - *Audit Trail*: `Cleared`

## CLINIC

### 1. Lite EMR (Medical Record)
- **ID**: `lite-emr`
- **Description**: Encrypted Electronic Medical Records (EMR) database capturing anamnesis, prescriptions, and ICD-10 codes, protected by doctor-only RLS access policies.
- **Action Label**: Decrypt EMR Records
- **Success Message**: Electronic Medical Record decrypted and opened securely.
- **KPIs**:
  - *Medical Records*: `1,240 Logs`
  - *Encryption Standard*: `HTTPS / AES`
  - *Access Audit Logs*: `Completed`

### 2. Prescription Tracker
- **ID**: `prescription-tracker`
- **Description**: Real-time digital prescription pipeline sending doctor inputs directly to the pharmacy dispatch queue via WebSockets.
- **Action Label**: Transmit Digital Rx
- **Success Message**: Digital prescription transmitted to the pharmacy queue.
- **KPIs**:
  - *Pharmacy Queue*: `2 Sessions`
  - *Prep Time Average*: `4.2 Mins`
  - *Prescriptions Dispensed*: `42`

### 3. Patient Queue System
- **ID**: `patient-queue-system`
- **Description**: Patient intake queue manager with real-time waiting lobby monitor display and browser-native text-to-speech calls.
- **Action Label**: Announce Next Ticket
- **Success Message**: Lobby announcement triggered: "Ticket A-12 please proceed to Doctor Consultation room".
- **KPIs**:
  - *Registered Today*: `28 Patients`
  - *Average Wait Time*: `12 Mins`
  - *Active Ticket*: `A-12`

### 4. Insurance Billing Flow
- **ID**: `insurance-billing-flow`
- **Description**: BPJS/insurance claim processing system with cloud attachment uploads and API-ready XML/JSON export capabilities.
- **Action Label**: Compile Claim Document
- **Success Message**: Insurance claim document XML compiled and downloaded.
- **KPIs**:
  - *Submission Rate*: `88%`
  - *Pending Claims*: `$3K`
  - *Lab Attachments*: `Verified`

## NGO

### 1. Fund Allocation Tracker
- **ID**: `fund-allocation-tracker`
- **Description**: Interactive donut-chart dashboard highlighting donor fund distribution (logistics, operational, medical).
- **Action Label**: Generate Allocation PDF
- **Success Message**: Allocation report PDF generated for public transparency review.
- **KPIs**:
  - *Managed Capital*: `$100K`
  - *Public Transparency*: `Audited`
  - *Total Donations*: `$800K`

### 2. Donor CRM
- **ID**: `donor-crm`
- **Description**: Donor relationship manager with Lifetime Value (LTV) logs, integrated with transactional thank-you emails via Resend/SendGrid.
- **Action Label**: Sync Donor Records
- **Success Message**: Donor CRM databases synced successfully.
- **KPIs**:
  - *Recurring Donors*: `64`
  - *LTV CRM Growth*: `+18.5%`
  - *Receipt Emails Sent*: `100%`

### 3. Beneficiary Database
- **ID**: `beneficiary-database`
- **Description**: Beneficiary identity database featuring regex validation to prevent duplicate aid claims in disaster relief zones.
- **Action Label**: Register New Beneficiary
- **Success Message**: Beneficiary registered successfully. ID checked and clean.
- **KPIs**:
  - *Beneficiaries Registered*: `450`
  - *ID Check Status*: `100% Valid`
  - *Aid Distributed*: `98%`

