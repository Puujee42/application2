# Soyol Video Shop

E-commerce frontend and admin for Soyol Video Shop (Mongolia). Built with Next.js 15, Prisma, Supabase, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Database & ORM:** Prisma 5, PostgreSQL (Supabase)
- **Backend / Auth:** NextAuth.js 5 (beta), Supabase (optional), Twilio (SMS OTP)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** Zustand (cart, wishlist), SWR (products)
- **Language / Currency:** MN | EN, MNT | USD (see `context/LanguageContext.tsx`)

## Prerequisites

- Node.js 20+
- npm or pnpm

## Environment Variables

Create a `.env` file in the project root (see `.env.example` if present). Required:

```env
# Database (Supabase) – use AWS pooler for stability
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Supabase API (Dashboard → Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL="https://<PROJECT_REF>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"

# Twilio (SMS OTP, optional)
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_VERIFY_SERVICE_SID=""
```

Get `DATABASE_URL` and `DIRECT_URL` from **Supabase Dashboard → Project Settings → Database** (use the connection pooler / Transaction mode for `DATABASE_URL`).

## Setup & Run

```bash
# Install dependencies
npm install

# Generate Prisma client (runs automatically on postinstall)
npx prisma generate

# Push schema to database (creates/updates tables)
npx prisma db push

# Seed the database (products, etc.)
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Health check: [http://localhost:3000/api/health/db](http://localhost:3000/api/health/db).

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start Next.js dev server       |
| `npm run build`   | Prisma generate + Next build   |
| `npm run start`   | Start production server        |
| `npm run db:push` | Push Prisma schema to DB       |
| `npm run db:seed` | Run seed script (tsx)          |
| `npx prisma generate` | Regenerate Prisma client  |
| `npx prisma db pull`  | Introspect DB → schema (when DB is reachable) |

## Project Structure

- **`app/`** – Next.js App Router pages, layouts, API routes
- **`components/`** – React components (navbars, grids, forms). Put new shared UI in `components/ui/` if you add a design system.
- **`lib/`** – Utilities: `constants.ts`, `prisma.ts`, `utils.ts`, `auth.ts`, Supabase clients, hooks (`useProducts`, `useDebounce`)
- **`context/`** – React context (e.g. `LanguageContext` for language/currency)
- **`types/`** – Shared TypeScript types; **`models/`** – domain models (e.g. `Product`, `Order`)
- **`prisma/`** – `schema.prisma`, `seed.ts`

## Currency & Sorting

- Prices are stored in **MNT** in the database. Display uses **LanguageContext**: `convertPrice()` for numeric conversion (MNT → USD when currency is USD), `formatPrice()` for formatted string (e.g. `12,000₮` or `$3.48`). Exchange rate is in `context/LanguageContext.tsx` (`EXCHANGE_RATE`).
- Product **stock status**: `in-stock` = Бэлэн (ready to ship), `pre-order` = Захиалгаар. Home page tabs filter by these; sorting (newest, price, name) is applied per tab.

## Handover Notes

- **Database:** If you see “Can’t reach database server” or P1001, restore the Supabase project if paused and use the **AWS pooler** URLs above. Test with `/api/health/db`.
- **Prisma:** After changing `schema.prisma` or `.env` DB URLs, run `npx prisma generate`. Use `db push` for dev; use Migrate for production when appropriate.
- **Images:** Product images use `next/image`; configure `images.remotePatterns` in `next.config.js` for external domains.
