-- 20260627000000_initial_schema.sql
-- Apex Core Schema Migration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPANIES TABLE
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL CHECK (category IN ('corporate', 'school', 'fnb', 'retail', 'clinic', 'ngo')),
    tier VARCHAR NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise', 'suspended')),
    active_modules JSONB NOT NULL DEFAULT '["attendance", "tasks"]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ROLES TABLE
CREATE TABLE public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    invite_code VARCHAR UNIQUE NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. USERS TABLE
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE, -- Nullable for dummy accounts
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
    email VARCHAR NOT NULL,
    full_name VARCHAR NOT NULL,
    is_dummy_account BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ATTENDANCE LOGS TABLE
CREATE TABLE public.attendance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    clock_in_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    clock_out_time TIMESTAMPTZ,
    photo_url VARCHAR,
    location JSONB, -- {latitude, longitude, accuracy}
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TASKS TABLE
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    assignee_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    creator_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    status VARCHAR NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INVENTORY ASSETS TABLE
CREATE TABLE public.inventory_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    sku VARCHAR NOT NULL,
    item_name VARCHAR NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    condition VARCHAR NOT NULL DEFAULT 'good' CHECK (condition IN ('good', 'fair', 'damaged')),
    last_checked_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT company_sku_unique UNIQUE (company_id, sku)
);

-- HELPER FUNCTIONS FOR RLS POLICIES
CREATE OR REPLACE FUNCTION public.get_company_id() 
RETURNS UUID AS $$
  SELECT company_id FROM public.users WHERE auth_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS VARCHAR AS $$
  SELECT r.name FROM public.users u
  JOIN public.roles r ON u.role_id = r.id
  WHERE u.auth_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_id()
RETURNS UUID AS $$
  SELECT id FROM public.users WHERE auth_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_assets ENABLE ROW LEVEL SECURITY;

-- 1. COMPANIES POLICIES
CREATE POLICY select_company ON public.companies 
    FOR SELECT USING (id = public.get_company_id());

CREATE POLICY update_company ON public.companies 
    FOR UPDATE USING (id = public.get_company_id() AND public.get_user_role() = 'Admin');

-- 2. ROLES POLICIES
CREATE POLICY select_roles ON public.roles 
    FOR SELECT USING (company_id = public.get_company_id() OR auth.role() = 'anon');

CREATE POLICY modify_roles ON public.roles 
    FOR ALL USING (company_id = public.get_company_id() AND public.get_user_role() = 'Admin');

-- 3. USERS POLICIES
CREATE POLICY select_users ON public.users 
    FOR SELECT USING (company_id = public.get_company_id());

CREATE POLICY modify_own_user ON public.users 
    FOR UPDATE USING (auth_id = auth.uid());

-- 4. ATTENDANCE LOGS POLICIES
CREATE POLICY select_attendance_logs ON public.attendance_logs 
    FOR SELECT USING (
        company_id = public.get_company_id() AND (
            user_id = public.get_user_id() OR 
            public.get_user_role() IN ('Admin', 'Manager')
        )
    );

CREATE POLICY insert_attendance_log ON public.attendance_logs 
    FOR INSERT WITH CHECK (
        company_id = public.get_company_id() AND 
        user_id = public.get_user_id()
    );

CREATE POLICY update_attendance_log ON public.attendance_logs 
    FOR UPDATE USING (
        company_id = public.get_company_id() AND 
        user_id = public.get_user_id()
    );

-- 5. TASKS POLICIES
CREATE POLICY select_tasks ON public.tasks 
    FOR SELECT USING (company_id = public.get_company_id());

CREATE POLICY modify_tasks ON public.tasks 
    FOR ALL USING (company_id = public.get_company_id() AND public.get_user_role() IN ('Admin', 'Manager'));

CREATE POLICY update_task_status ON public.tasks 
    FOR UPDATE USING (
        company_id = public.get_company_id() AND 
        assignee_id = public.get_user_id()
    );

-- 6. INVENTORY POLICIES
CREATE POLICY select_inventory ON public.inventory_assets 
    FOR SELECT USING (company_id = public.get_company_id());

CREATE POLICY modify_inventory ON public.inventory_assets 
    FOR ALL USING (company_id = public.get_company_id() AND public.get_user_role() IN ('Admin', 'Manager'));
