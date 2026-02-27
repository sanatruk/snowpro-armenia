-- SnowPro Armenia: Initial Schema
-- Tables: instructors, availability, bookings, reviews, payments

-- Enums
create type booking_status as enum (
  'pending',
  'confirmed',
  'completed',
  'cancelled',
  'no_show'
);

create type payment_type as enum (
  'deposit',
  'balance',
  'refund',
  'payout'
);

-- Instructors (extends auth.users)
create table instructors (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  slug text unique not null,
  photo_url text,
  headline text not null default '',
  bio text not null default '',
  sport text not null check (sport in ('ski', 'snowboard', 'both')),
  specialties text[] not null default '{}',
  levels text[] not null default '{}',
  languages text[] not null default '{}',
  teaching_styles text[] not null default '{}',
  resorts text[] not null default '{}',
  price_per_hour integer not null check (price_per_hour > 0),
  currency text not null default 'AMD',
  experience_years integer not null default 0,
  certifications text[] not null default '{}',
  stripe_account_id text,
  stripe_onboarded boolean not null default false,
  featured boolean not null default false,
  active boolean not null default true,
  rating_avg numeric(2,1) not null default 0.0,
  rating_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_instructors_resorts on instructors using gin (resorts);
create index idx_instructors_sport on instructors (sport);
create index idx_instructors_active on instructors (active) where active = true;
create index idx_instructors_featured on instructors (featured) where featured = true;

-- Availability (individual date+time slots)
create table availability (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid not null references instructors(id) on delete cascade,
  date date not null,
  start_time time not null,
  end_time time not null,
  resort_slug text not null,
  is_booked boolean not null default false,
  created_at timestamptz not null default now(),

  constraint valid_time_range check (end_time > start_time),
  constraint unique_slot unique (instructor_id, date, start_time)
);

create index idx_availability_instructor_date on availability (instructor_id, date);
create index idx_availability_available on availability (date, resort_slug, is_booked)
  where is_booked = false;

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  instructor_id uuid not null references instructors(id) on delete cascade,
  availability_id uuid not null references availability(id) on delete restrict,
  resort_slug text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  status booking_status not null default 'pending',
  total_amount integer not null check (total_amount > 0),
  deposit_amount integer not null check (deposit_amount > 0),
  platform_fee integer not null default 0,
  currency text not null default 'AMD',
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  cancelled_at timestamptz,
  cancellation_reason text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_bookings_student on bookings (student_id);
create index idx_bookings_instructor on bookings (instructor_id, date);
create index idx_bookings_status on bookings (status);

-- Reviews (one per completed booking)
create table reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid unique not null references bookings(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  instructor_id uuid not null references instructors(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index idx_reviews_instructor on reviews (instructor_id, created_at desc);

-- Payments (ledger)
create table payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  type payment_type not null,
  amount integer not null,
  currency text not null default 'AMD',
  stripe_id text,
  created_at timestamptz not null default now()
);

create index idx_payments_booking on payments (booking_id);

-- Row Level Security
alter table instructors enable row level security;
alter table availability enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table payments enable row level security;

-- RLS Policies: SELECT only (mutations via server actions with service_role)
create policy "Instructors are publicly readable"
  on instructors for select
  using (active = true);

create policy "Available slots are publicly readable"
  on availability for select
  using (is_booked = false);

create policy "Students can read own bookings"
  on bookings for select
  using (auth.uid() = student_id);

create policy "Instructors can read their bookings"
  on bookings for select
  using (auth.uid() = instructor_id);

create policy "Reviews are publicly readable"
  on reviews for select
  using (true);

create policy "Students can read own payments"
  on payments for select
  using (
    booking_id in (
      select id from bookings where student_id = auth.uid()
    )
  );

-- Function: update instructor rating stats after review insert
create or replace function update_instructor_rating()
returns trigger as $$
begin
  update instructors set
    rating_avg = (
      select round(avg(rating)::numeric, 1)
      from reviews
      where instructor_id = NEW.instructor_id
    ),
    rating_count = (
      select count(*)
      from reviews
      where instructor_id = NEW.instructor_id
    ),
    updated_at = now()
  where id = NEW.instructor_id;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger trg_update_instructor_rating
  after insert on reviews
  for each row
  execute function update_instructor_rating();

-- Function: mark availability as booked when booking confirmed
create or replace function mark_slot_booked()
returns trigger as $$
begin
  if NEW.status = 'confirmed' and OLD.status = 'pending' then
    update availability set is_booked = true
    where id = NEW.availability_id;
  end if;
  if NEW.status = 'cancelled' and OLD.status in ('pending', 'confirmed') then
    update availability set is_booked = false
    where id = NEW.availability_id;
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger trg_mark_slot_booked
  after update of status on bookings
  for each row
  execute function mark_slot_booked();

-- Updated_at trigger
create or replace function set_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

create trigger trg_instructors_updated_at
  before update on instructors
  for each row execute function set_updated_at();

create trigger trg_bookings_updated_at
  before update on bookings
  for each row execute function set_updated_at();
