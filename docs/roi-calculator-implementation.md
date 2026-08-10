# ROI Calculator — Dynamic Data Implementation Plan

## Overview

The ROI calculator currently uses a static TypeScript data file (`lib/roi-calculator-data.ts`). This plan replaces it with a dynamic system where:

- Calculator data lives in a JSON config file
- A public API serves the config at runtime
- A protected admin endpoint allows updating the config
- The calculator fetches data from the API instead of importing statically

---

## Architecture

```
project/
├── config/
│   ├── roi-config.json          ← editable calculator data
│   └── roi-config.defaults.json ← factory defaults for restore
├── app/
│   ├── api/
│   │   ├── roi-config/
│   │   │   └── route.ts         ← GET: public read access
│   │   └── admin/
│   │       └── roi-config/
│   │           └── route.ts     ← POST: password-protected write
│   ├── admin/
│   │   └── roi/
│   │       └── page.tsx         ← admin UI with password gate
│   └── investment/
│       └── page.tsx              ← includes ROICalculator
├── components/
│   └── investment/
│       └── ROICalculator.tsx    ← fetches from /api/roi-config
└── docs/
    └── roi-calculator-implementation.md
```

---

## Step 1: Create the Config File

### `config/roi-config.json`

```json
{
  "version": 1,
  "updatedAt": "2026-08-01T12:30:00Z",
  "updatedBy": "Admin",
  "calculator": {
    "defaults": {
      "investmentAmount": 300000,
      "duration": 10,
      "typeId": "premium"
    },
    "limits": {
      "investmentMin": 100000,
      "investmentMax": 2000000,
      "investmentStep": 10000
    },
    "investmentTypes": [
      {
        "id": "luxury",
        "name": "Luxury Villa",
        "yield": 8,
        "appreciation": 4,
        "description": "Private pool, panoramic views, full concierge"
      },
      {
        "id": "premium",
        "name": "Premium Villa",
        "yield": 10,
        "appreciation": 5,
        "description": "Spacious suite with private terrace"
      },
      {
        "id": "resort",
        "name": "Resort Share",
        "yield": 12,
        "appreciation": 6,
        "description": "Fractional ownership with managed returns"
      }
    ],
    "durationOptions": [5, 10, 15, 20]
  }
}
```

### `config/roi-config.defaults.json`

A copy of the above with the original default values. Used by the "Restore Defaults" button in the admin panel.

---

## Step 2: Create the Public API — `GET /api/roi-config`

**File:** `app/api/roi-config/route.ts`

**Purpose:** Returns the current calculator configuration.

**Flow:**
1. Read `config/roi-config.json` from the filesystem
2. Parse the JSON
3. Return it as a JSON response

**Response:**
```json
{
  "version": 1,
  "updatedAt": "2026-08-01T12:30:00Z",
  "updatedBy": "Admin",
  "calculator": { ... }
}
```

**Error handling:**
- If the file doesn't exist, return the defaults
- If the file is corrupted, return 500 with an error message

---

## Step 3: Create the Admin API — `POST /api/admin/roi-config`

**File:** `app/api/admin/roi-config/route.ts`

**Purpose:** Accepts updated configuration and writes it to the file.

**Flow:**
1. Check for a signed HTTP-only cookie (`admin_session`)
2. If cookie is missing or invalid, return 401
3. Parse the request body
4. Validate with Zod schema
5. Create a backup: `roi-config.json` → `roi-config.backup.json`
6. Write the new config to `roi-config.json`
7. Update `updatedAt` and `updatedBy` fields
8. Return success response

**Zod Schema:**
```ts
const ConfigSchema = z.object({
  version: z.number().min(1),
  calculator: z.object({
    defaults: z.object({
      investmentAmount: z.number().min(100000).max(2000000),
      duration: z.number().int().min(1).max(20),
      typeId: z.string(),
    }),
    limits: z.object({
      investmentMin: z.number(),
      investmentMax: z.number(),
      investmentStep: z.number(),
    }),
    investmentTypes: z.array(z.object({
      id: z.string(),
      name: z.string(),
      yield: z.number().min(0).max(50),
      appreciation: z.number().min(0).max(20),
      description: z.string(),
    })),
    durationOptions: z.array(z.number().int().min(1).max(20)),
  }),
});
```

**Security:**
- Cookie is HTTP-only (not accessible via JavaScript)
- Cookie is signed with a secret from `process.env.ADMIN_COOKIE_SECRET`
- Rate limiting: max 5 requests per minute per IP

---

## Step 4: Create the Admin Page — `/admin/roi`

**File:** `app/admin/roi/page.tsx`

**Purpose:** Admin UI for updating calculator configuration.

### Flow:
1. User visits `/admin/roi`
2. If no valid session cookie, show password prompt
3. User enters password, submits
4. Client sends password to `/api/admin/roi-config` (or a separate `/api/admin/login` route)
5. Server verifies password against bcrypt hash in `process.env.ROI_ADMIN_PASSWORD_HASH`
6. If valid, server sets a signed HTTP-only cookie (`admin_session`)
7. Client redirects to `/admin/roi`
8. Admin page fetches current config from `/api/roi-config`
9. Editor form is pre-filled with current values
10. User makes changes and clicks Save
11. Client POSTs updated config to `/api/admin/roi-config`
12. Server validates, backs up, writes, and returns success
13. Admin page shows "Saved successfully" with timestamp

### UI Components:
- **Password screen** — simple form with password field
- **Editor form** — grouped by section:
  - **Defaults** — investment amount, duration, default type
  - **Limits** — min/max/step for investment slider
  - **Investment Types** — list of types with name, yield, appreciation, description
  - **Duration Options** — list of available durations
- **Restore Defaults button** — replaces current config with defaults from `roi-config.defaults.json`
- **Last updated** — displays `updatedAt` and `updatedBy` from config

---

## Step 5: Update `ROICalculator.tsx`

**Change:** Replace static import with runtime fetch.

### Before:
```ts
import { investmentTypes, durationOptions } from "@/lib/roi-calculator-data";
```

### After:
```ts
"use client";

import { useState, useEffect } from "react";

export default function ROICalculator() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/roi-config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !config) return <LoadingSkeleton />;

  const investmentTypes = config.calculator.investmentTypes;
  const durationOptions = config.calculator.durationOptions;
  // ... rest of component
}
```

---

## Step 6: Environment Setup

### `.env.local`
```env
ROI_ADMIN_PASSWORD_HASH=$2b$10$8hQFKqYRIH4bRnXpBDsMMeO.4NuRUHdQ7BHGHKnsO/ZQL4nKHoL8S
ADMIN_COOKIE_SECRET=change-this-to-a-random-long-string-in-production
```

### Generate your own password hash:

Run this in your project root:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Admin123', 10).then(h => console.log(h));"
```

Replace `YOUR_PASSWORD` with the password you want to use. Copy the output hash into `ROI_ADMIN_PASSWORD_HASH`.

### Default credentials (development only):
- **Password:** `Admin123`
- **Hash:** `$2b$10$QZ1Tyti2VcXxosEGQfZ7vOjEhsHdUviWESn9IDaxu6rlcK2W7NyAK`

---

## Step 7: Security Checklist

- [ ] Password stored as bcrypt hash in env var (never plain text)
- [ ] Admin session cookie is HTTP-only (not accessible via JS)
- [ ] Admin session cookie is signed (tamper-proof)
- [ ] Rate limiting on admin POST endpoint (max 5 req/min)
- [ ] Zod validation on all incoming config data
- [ ] Backup created before every write operation
- [ ] Input sanitization (trim strings, clamp numbers)
- [ ] Error messages don't leak internal details
- [ ] Admin page not indexed by search engines (`robots.txt` or `noindex`)

---

## Step 8: Deployment (VPS)

### File structure on server:
```
/var/www/resort/
├── config/
│   ├── roi-config.json
│   └── roi-config.defaults.json
├── app/
│   ├── api/
│   │   ├── roi-config/route.ts
│   │   └── admin/
│   │       └── roi-config/route.ts
│   ├── admin/
│   │   └── roi/
│   │       └── page.tsx
│   └── ...
├── .env.local
└── ...
```

### Build and deploy:
```bash
npm run build
npm start
```

### Updating config without rebuild:
1. Admin visits `/admin/roi`
2. Logs in with password
3. Updates values in the editor
4. Clicks Save
5. Config file is updated on disk
6. Next visitor to the site sees the new values immediately

---

## Summary of the Complete Flow

```
Visitor loads site
  → ROICalculator fetches GET /api/roi-config
  → API reads config/roi-config.json
  → Calculator renders with current values

Admin updates config
  → Visits /admin/roi
  → Enters password
  → Password verified against bcrypt hash
  → Session cookie issued
  → Admin sees editor with current config
  → Makes changes, clicks Save
  → POST /api/admin/roi-config
  → Server validates with Zod
  → Server creates backup
  → Server writes new config to roi-config.json
  → Success response
  → Admin sees "Saved" confirmation

Next visitor loads site
  → Fetches GET /api/roi-config
  → API reads updated roi-config.json
  → Calculator shows new values immediately
```

---

## What This Enables

- **Client can update calculator values** without any code changes
- **No rebuild required** — changes take effect immediately
- **Safe** — backups, validation, and password protection
- **Extensible** — the config structure can accommodate additional sections (contact, FAQ, hero, etc.)
- **Professional** — version tracking, timestamps, and admin audit trail