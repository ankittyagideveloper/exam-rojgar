# Razorpay Subscription Payment Integration Plan

## Top-Level Overview

**Goal:** Integrate Razorpay's subscription payment gateway into the Exam Rojgaar platform so users can purchase monthly/yearly premium plans that unlock all Firestore-based tests. Static mock tests (`src/data/`) remain free.

**Scope:**
- Razorpay Subscription API (recurring billing — monthly & yearly plans)
- Firebase Cloud Functions as the secure backend (create subscription order, verify payment signature, handle Razorpay webhooks)
- Firestore `users` collection to store subscription status (source of truth)
- Clerk `publicMetadata` synced with subscription status (fast frontend checks without extra DB reads)
- `PurchasePage` rebuilt with plan selection and Razorpay checkout UI
- `PremiumRoute` guard added alongside the existing `ProtectedRoute`
- `TestPage` and `Quiz` pages gated behind `PremiumRoute` for Firestore tests

**Non-goals:**
- Static mock tests (`/mock-test/*` routes) — remain free, no gating changes
- Changing Clerk auth flow
- Changing Firestore schema for tests/questions/attempts
- Admin panel changes

**Architecture Overview:**

```
User clicks "Buy Plan"
  → PurchasePage (React) selects plan
  → Cloud Function: createSubscription
      → Razorpay API: creates subscription
      → Returns subscription_id + razorpay_key
  → Razorpay Checkout JS opens in browser
  → User completes payment
  → Razorpay Webhook → Cloud Function: razorpayWebhook
      → Verifies signature (HMAC)
      → Writes to Firestore users/{userId}
      → Syncs to Clerk publicMetadata via Clerk Backend API
  → Frontend reads publicMetadata → user sees premium content
```

---

## Sub-Tasks

---

### Sub-Task 1 — Firebase Cloud Functions project setup

**Intent:**
Initialize Firebase Cloud Functions in the existing Firebase project so the backend functions can be written, tested locally, and deployed.

**Expected Outcomes:**
- `functions/` directory exists at repo root with `index.js` entry point
- Firebase Functions dependencies installed (`firebase-functions`, `firebase-admin`, `razorpay`, `axios`)
- Environment variables configured for Razorpay keys and Clerk secret key (using Firebase Functions config or Secret Manager)
- Local emulator can start with `firebase emulators:start`

**Todo List:**
1. Run `firebase init functions` inside the project root (choose JavaScript, enable ESLint)
2. Install required packages inside `functions/`: `npm install razorpay axios firebase-admin`
3. Set Firebase Functions environment variables:
   - `RAZORPAY_KEY_ID` — from Razorpay Dashboard → Settings → API Keys
   - `RAZORPAY_KEY_SECRET` — from Razorpay Dashboard → Settings → API Keys
   - `RAZORPAY_WEBHOOK_SECRET` — set when creating a webhook in Razorpay Dashboard
   - `CLERK_SECRET_KEY` — from Clerk Dashboard → API Keys
   - Use `firebase functions:config:set razorpay.key_id="..." razorpay.key_secret="..." razorpay.webhook_secret="..." clerk.secret_key="..."` OR use Firebase Secret Manager (recommended for production)
4. Add `functions/` to `.gitignore` additions: `functions/.env`, `functions/.runtimeconfig.json`
5. Update `.env.example` with `VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here` (frontend only needs the public key)

**Relevant Context:**
- Firebase project ID: `exam-rojgaar-e1b10` (from `firebase.js`)
- Existing Firebase SDK already initialized in `firebase.js`
- No existing backend — this is the first Cloud Function setup

**Status:** [x] done — `functions/package.json`, `functions/index.js`, `functions/.eslintrc.js` created; `functions/` excluded from root ESLint; `.env.example` updated with `VITE_RAZORPAY_KEY_ID`.

---

### Sub-Task 2 — Razorpay plan creation (one-time setup)

**Intent:**
Create the monthly and yearly subscription plans in the Razorpay Dashboard. This is a manual one-time setup — plan IDs are then stored as environment variables for the Cloud Functions to use when creating subscriptions.

**Expected Outcomes:**
- Two Razorpay Plans exist in the Razorpay Dashboard: `plan_monthly` and `plan_yearly`
- Their plan IDs (e.g. `plan_XXXXXXXX`) are noted and added to Firebase Functions config
- Plans are created in INR with the appropriate billing cycle

**Todo List:**
1. Log into Razorpay Dashboard → Subscriptions → Plans → Create Plan
2. Create **Monthly Plan**:
   - Name: "Exam Rojgaar Premium - Monthly"
   - Billing Amount: (e.g. ₹99 or desired price)
   - Billing Period: `monthly`, Interval: `1`
   - Currency: INR
3. Create **Yearly Plan**:
   - Name: "Exam Rojgaar Premium - Yearly"
   - Billing Amount: (e.g. ₹799 or desired price)
   - Billing Period: `yearly`, Interval: `1`
   - Currency: INR
4. Copy both Plan IDs and add to Firebase Functions config:
   - `firebase functions:config:set razorpay.monthly_plan_id="plan_XXXX" razorpay.yearly_plan_id="plan_YYYY"`
5. Add `VITE_RAZORPAY_MONTHLY_PLAN_DISPLAY="₹99/month"` and `VITE_RAZORPAY_YEARLY_PLAN_DISPLAY="₹799/year"` to `.env` for display in the UI

**Relevant Context:**
- Razorpay Subscription Docs: https://razorpay.com/docs/payments/subscriptions/
- Plan IDs are stable and only change if you recreate the plans
- The frontend never stores plan IDs directly — it just sends a `planType` string (`monthly` or `yearly`) to the Cloud Function

**Status:** [ ] pending — MANUAL STEP: Create plans in Razorpay Dashboard (see todo list above), then run `firebase functions:config:set razorpay.monthly_plan_id="plan_XXXX" razorpay.yearly_plan_id="plan_YYYY"`.

---

### Sub-Task 3 — Cloud Function: `createSubscription`

**Intent:**
Write an HTTPS Cloud Function that receives a `planType` (`monthly` or `yearly`) and the Clerk `userId` from the authenticated frontend, creates a Razorpay subscription via the Razorpay Node SDK, and returns the `subscription_id` and `razorpay_key_id` to the frontend to open the Razorpay checkout.

**Expected Outcomes:**
- `functions/index.js` exports an `createSubscription` HTTPS callable function
- The function validates that the caller is a signed-in Clerk user (verifies Clerk session token passed in request header)
- Returns `{ subscription_id, razorpay_key_id }` on success
- The subscription is created in Razorpay's system linked to the correct plan

**Todo List:**
1. In `functions/index.js`, initialize `Razorpay` using `razorpay.key_id` and `razorpay.key_secret` from Functions config
2. Initialize `firebase-admin` and get Firestore instance
3. Write `createSubscription` as an HTTPS `onCall` function:
   - Extract `planType` from `data` parameter (`monthly` or `yearly`)
   - Extract `userId` from `context.auth.uid` (Clerk passes this automatically with the Clerk SDK `httpsCallable`)
   - Map `planType` → correct Razorpay plan ID from config
   - Call `razorpay.subscriptions.create({ plan_id, total_count: 12, quantity: 1, customer_notify: 1 })`
   - Return `{ subscription_id: subscription.id, razorpay_key_id: config.razorpay.key_id }`
4. Handle errors: throw `functions.https.HttpsError("internal", "...")` for Razorpay API failures

**Relevant Context:**
- Frontend will call this via Firebase's `httpsCallable` from `firebase/functions`
- Clerk `useAuth()` provides `getToken()` — but with `httpsCallable`, Clerk authentication works by passing the token in the Authorization header automatically when the Clerk Firebase integration is set up
- Alternatively, accept `userId` from the request body and validate it against a Clerk session token in the Authorization header using the Clerk Backend SDK

**Status:** [x] done — `createSubscription` onCall function implemented in `functions/index.js`. Validates auth, maps planType to plan ID from config, creates Razorpay subscription with userId in notes, returns subscription_id + razorpay_key_id.

---

### Sub-Task 4 — Cloud Function: `razorpayWebhook`

**Intent:**
Write an HTTPS Express-style Cloud Function that Razorpay calls after a payment event (subscription activated, payment captured, subscription cancelled). This function verifies the webhook signature, then updates Firestore and Clerk accordingly.

**Expected Outcomes:**
- `functions/index.js` exports a `razorpayWebhook` HTTPS function (NOT onCall — Razorpay calls it, not the frontend)
- Signature verification using `crypto.createHmac` against `RAZORPAY_WEBHOOK_SECRET`
- On `subscription.activated` or `payment.captured` → writes/updates `users/{userId}` in Firestore with:
  - `subscriptionStatus: "premium"`
  - `subscriptionId: subscription_id`
  - `planType: "monthly" | "yearly"`
  - `subscriptionStartDate: timestamp`
  - `subscriptionEndDate: calculated timestamp`
  - `lastPaymentDate: timestamp`
- On Firestore write success → calls Clerk Backend API (`PATCH /v1/users/{userId}/metadata`) to set `publicMetadata.subscriptionStatus: "premium"` and `publicMetadata.subscriptionEndDate`
- On `subscription.cancelled` or `subscription.completed` → sets `subscriptionStatus: "expired"` in Firestore and Clerk

**Todo List:**
1. In `functions/index.js`, write `razorpayWebhook` as `functions.https.onRequest` (raw HTTP, not callable)
2. Verify signature:
   ```
   const expectedSignature = crypto.createHmac("sha256", webhookSecret)
     .update(JSON.stringify(req.body)).digest("hex");
   if (expectedSignature !== req.headers["x-razorpay-signature"]) → return 400
   ```
3. Handle `subscription.activated` event:
   - Get `userId` from `req.body.payload.subscription.entity.notes.userId` (notes are passed during subscription creation in Sub-Task 3)
   - Calculate `subscriptionEndDate` based on `planType` and `current_end` from Razorpay payload
   - Write to Firestore `users/{userId}` (use `setDoc` with `merge: true`)
   - Call Clerk Backend API: `axios.patch("https://api.clerk.com/v1/users/{userId}", { public_metadata: { subscriptionStatus: "premium", subscriptionEndDate } }, { headers: { Authorization: "Bearer CLERK_SECRET_KEY" } })`
4. Handle `subscription.cancelled` → set both to `"expired"`
5. Return `200 OK` immediately after verification (Razorpay retries if it gets non-200)
6. Register the webhook URL in Razorpay Dashboard → Settings → Webhooks:
   - URL: `https://us-central1-exam-rojgaar-e1b10.cloudfunctions.net/razorpayWebhook`
   - Events: `subscription.activated`, `payment.captured`, `subscription.cancelled`, `subscription.completed`

**Relevant Context:**
- Clerk Backend API docs: https://clerk.com/docs/reference/backend-api/tag/Users#operation/UpdateUser
- The `notes` object in the Razorpay subscription must contain `userId` — this is set in Sub-Task 3 when calling `razorpay.subscriptions.create({ ..., notes: { userId } })`
- Webhook must be publicly accessible — only works after Cloud Functions are deployed

**Status:** [x] done — `razorpayWebhook` onRequest function implemented in `functions/index.js`. Verifies HMAC signature, handles subscription.activated/payment.captured (sets premium), subscription.cancelled/completed (sets expired), writes to Firestore, syncs to Clerk publicMetadata via Backend API.

---

### Sub-Task 5 — Firestore `users` collection & security rules

**Intent:**
Define the Firestore `users` collection schema and update Firestore Security Rules so that users can only read their own document, and only Cloud Functions (admin SDK) can write subscription fields.

**Expected Outcomes:**
- Firestore `users` collection schema is documented and a write helper is added to `src/utils/firestoreHelpers.js` for reading the user's subscription document
- Firestore Security Rules updated so:
  - Users can read only their own `users/{userId}` document
  - Users cannot write `subscriptionStatus`, `subscriptionEndDate` fields directly (only backend/admin SDK can)
- A `getUserSubscription(db, userId)` helper function exists in `firestoreHelpers.js`

**Todo List:**
1. Define the `users/{userId}` Firestore document schema:
   ```
   {
     userId: string,
     email: string,
     subscriptionStatus: "free" | "premium" | "expired",
     subscriptionId: string | null,
     planType: "monthly" | "yearly" | null,
     subscriptionStartDate: Timestamp | null,
     subscriptionEndDate: Timestamp | null,
     lastPaymentDate: Timestamp | null,
     createdAt: Timestamp
   }
   ```
2. Add `getUserSubscription(db, userId)` to `src/utils/firestoreHelpers.js`:
   - Fetches `doc(db, "users", userId)`
   - Returns the document data or `null`
3. Update `firestore.rules` (create it if missing) to allow users to read only their own document
4. Deploy rules: `firebase deploy --only firestore:rules`

**Relevant Context:**
- `src/utils/firestoreHelpers.js` is where all other Firestore helpers live — follow the same pattern
- Firestore is accessed via `db` passed to helper functions (imported from `firebase.js`)

**Status:** [x] done — `getUserSubscription` helper added to `src/utils/firestoreHelpers.js`. `firestore.rules` created with read-own-doc and write-blocked-from-client rules. `firebase.json` and `firestore.indexes.json` created.

---

### Sub-Task 6 — `PremiumRoute` guard component

**Intent:**
Create a `PremiumRoute` component (similar to `ProtectedRoute`) that checks if the signed-in user has an active premium subscription. If not, redirect them to `/purchase`. Uses Clerk `publicMetadata.subscriptionStatus` to avoid an extra Firestore call.

**Expected Outcomes:**
- `src/component/ProtectedRoute.jsx` gets a new exported `PremiumRoute` component
- `PremiumRoute` checks `user?.publicMetadata?.subscriptionStatus === "premium"`
- If user is not signed in → shows Clerk `SignIn` (same as `ProtectedRoute`)
- If user is signed in but not premium → redirects to `/purchase` with a toast/message
- If user is premium → renders `children`

**Todo List:**
1. Open `src/component/ProtectedRoute.jsx`
2. Add `PremiumRoute` export:
   - Use `useUser()` to get `isSignedIn` and `user`
   - If not signed in → show `<SignIn routing="hash" />`
   - If signed in but `user.publicMetadata.subscriptionStatus !== "premium"` → `<Navigate to="/purchase" replace />`
   - Otherwise → return `children`
3. Export `PremiumRoute` as a named export

**Relevant Context:**
- `src/component/ProtectedRoute.jsx` — `AdminRoute` follows the exact same pattern (check `publicMetadata.role`)
- The metadata key used is `subscriptionStatus` (set by the Cloud Function in Sub-Task 4)
- `user.publicMetadata` is available immediately from Clerk without extra API calls

**Status:** [x] done — `PremiumRoute` exported from `src/component/ProtectedRoute.jsx`. Checks isLoaded → isSignedIn → publicMetadata.subscriptionStatus === "premium". Redirects to /purchase if not premium.

---

### Sub-Task 7 — Gate Firestore test routes behind `PremiumRoute`

**Intent:**
Wrap the two routes that serve Firestore-based tests (`/online-test-series/*` and `/quiz-category/*`) with `PremiumRoute` instead of (or in addition to) `ProtectedRoute`, so non-premium users are redirected to the purchase page.

**Expected Outcomes:**
- Routes `/online-test-series/*` and `/quiz-category/*` in `src/App.jsx` are wrapped with `PremiumRoute`
- `/all-test/:categoryId` and `/all-quiz/:categoryId/attempt/:attemptId` (which take users into actual Firestore quiz attempts) are also wrapped with `PremiumRoute`
- Static mock test routes (`/mock-test/*`) are NOT changed — remain free
- Non-premium users visiting a Firestore test URL are redirected to `/purchase`

**Todo List:**
1. Import `PremiumRoute` from `src/component/ProtectedRoute.jsx` in `src/App.jsx`
2. Replace `<ProtectedRoute>` with `<PremiumRoute>` for:
   - `online-test-series/*` (line 81)
   - `quiz-category/*` (line 89)
   - `attempted-tests` (line 101)
   - `/attempt/:attemptId/result` (line 109)
3. For `TestLayout`-wrapped routes (`/all-test/:categoryId`, `/all-quiz/:categoryId/attempt/:attemptId`), wrap the children with `PremiumRoute`
4. Add the `/purchase` route inside the Layout's children (pointing to `PurchasePage`)

**Relevant Context:**
- `src/App.jsx` — lines 79–113 contain the routes to modify
- `PremiumRoute` (from Sub-Task 6) already handles the "not signed in" case, so `ProtectedRoute` wrapping is not needed separately
- Mock test routes start at line 187+ in `src/App.jsx` — do NOT touch those

**Status:** [x] done — `src/App.jsx` updated: PremiumRoute imported, /purchase route added, all Firestore test routes (online-test-series, quiz-category, attempted-tests, attempt/result, all-test, all-quiz) wrapped with PremiumRoute. Mock test routes untouched.

---

### Sub-Task 8 — Build the `PurchasePage`

**Intent:**
Replace the empty `PurchasePage` placeholder with a real pricing/checkout page. It shows two plan cards (monthly and yearly), and when the user clicks "Buy", calls the `createSubscription` Cloud Function, receives the `subscription_id`, and opens the Razorpay checkout script.

**Expected Outcomes:**
- `/purchase` page shows two plan cards (Monthly and Yearly) with prices, features list, and a "Subscribe Now" button
- Clicking a plan calls the `createSubscription` Cloud Function via `httpsCallable`
- On success, loads the Razorpay Checkout script dynamically and opens the payment modal
- On payment success callback, calls a second Cloud Function `verifyPayment` (or just shows a success screen and tells the user their access will be activated within seconds)
- On payment failure, shows an error message
- If user is already premium, shows a "You already have premium access" banner

**Todo List:**
1. Add Razorpay Checkout script loading utility: `src/utils/loadRazorpay.js`
   - Dynamically injects `<script src="https://checkout.razorpay.com/v1/checkout.js">` and returns a promise
2. Build `PurchasePage` component in `src/pages/PurchasePage.jsx`:
   - Import `useUser` from `@clerk/clerk-react`
   - Import `getFunctions`, `httpsCallable` from `firebase/functions`
   - Show two plan cards with a "recommended" badge on yearly
   - On "Subscribe" click: set loading state → call `createSubscription({ planType })` Cloud Function → get `{ subscription_id, razorpay_key_id }` → call `loadRazorpay()` → open `new window.Razorpay({ key: razorpay_key_id, subscription_id, name: "Exam Rojgaar", prefill: { email, name }, handler: onPaymentSuccess })`
   - `onPaymentSuccess` callback: show a "Payment successful! Your premium access is being activated..." message and redirect to `/online-test-series` after 3 seconds
3. Style with Tailwind CSS following existing dark mode pattern (use `dark:` variants)
4. Add a "What's included" feature list (all Firestore tests access, etc.)

**Relevant Context:**
- `src/pages/PurchasePage.jsx` — currently just `<div>PurchasePage</div>`, safe to fully replace
- `src/component/ProtectedRoute.jsx` uses `useUser` — same import pattern
- Firebase Functions initialized from `firebase.js` — import `getFunctions` from `firebase/functions` and `app` from `firebase.js`
- Existing pages use Tailwind + dark mode — follow the same class structure as `TestPage.jsx` or `HomePage.jsx`
- `VITE_RAZORPAY_KEY_ID` env var holds the public Razorpay key (added in Sub-Task 1)

**Status:** [x] done — `src/utils/loadRazorpay.js` created. `src/pages/PurchasePage.jsx` fully implemented with plan cards, Razorpay checkout integration, success/error states, already-premium banner, dark mode support.

---

### Sub-Task 9 — Environment variables and final wiring

**Intent:**
Ensure all required environment variables are documented, `.env.example` is updated, and the Razorpay webhook is registered in the Razorpay Dashboard pointing to the deployed Cloud Function URL.

**Expected Outcomes:**
- `.env.example` has all new Razorpay-related frontend env vars documented
- Firebase Functions config has all backend secrets set
- Razorpay Dashboard webhook is registered and active
- `vite.config.js` has no changes needed (env vars with `VITE_` prefix are auto-exposed)

**Todo List:**
1. Update `.env.example` to add:
   ```
   # Razorpay Payment Gateway
   VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
   ```
2. Verify `.env` (local) has `VITE_RAZORPAY_KEY_ID` set to your test key
3. Confirm Firebase Functions config is set (from Sub-Tasks 1–4):
   - `firebase functions:config:get` should show `razorpay.*` and `clerk.secret_key`
4. Deploy Cloud Functions: `firebase deploy --only functions`
5. Register webhook in Razorpay Dashboard:
   - URL: `https://us-central1-exam-rojgaar-e1b10.cloudfunctions.net/razorpayWebhook`
   - Enable events: `subscription.activated`, `payment.captured`, `subscription.cancelled`, `subscription.completed`
   - Copy the Webhook Secret and confirm it matches `razorpay.webhook_secret` in Firebase config
6. Test end-to-end in Razorpay Test Mode before switching to Live

**Relevant Context:**
- `.env.example` is at the repo root
- Razorpay provides test mode keys (`rzp_test_`) and live keys (`rzp_live_`) — use test keys during development
- Firebase project ID: `exam-rojgaar-e1b10`

**Status:** [ ] pending — MANUAL STEPS REQUIRED (see deployment checklist below).

---

## Implementation Order

```
Sub-Task 1 (Firebase Functions setup)
  → Sub-Task 2 (Create Razorpay plans in Dashboard — manual)
  → Sub-Task 3 (createSubscription Cloud Function)
  → Sub-Task 4 (razorpayWebhook Cloud Function)
  → Sub-Task 5 (Firestore schema + security rules)
  → Sub-Task 6 (PremiumRoute component)
  → Sub-Task 7 (Gate routes in App.jsx)
  → Sub-Task 8 (Build PurchasePage)
  → Sub-Task 9 (Env vars + webhook registration + deploy)
```

Sub-Tasks 3 and 4 can be worked on together (same `functions/index.js` file).
Sub-Tasks 5 and 6 can be worked on in parallel (independent files).
Sub-Tasks 7 and 8 must come after Sub-Task 6.
Sub-Task 9 must be last.

---

## Files to Create / Modify

| File | Action | Sub-Task |
|---|---|---|
| `functions/` (directory) | Create | 1 |
| `functions/index.js` | Create | 3, 4 |
| `functions/package.json` | Create (auto by firebase init) | 1 |
| `src/utils/loadRazorpay.js` | Create | 8 |
| `src/pages/PurchasePage.jsx` | Modify (full rewrite) | 8 |
| `src/component/ProtectedRoute.jsx` | Modify (add PremiumRoute export) | 6 |
| `src/App.jsx` | Modify (route gating + /purchase route) | 7 |
| `src/utils/firestoreHelpers.js` | Modify (add getUserSubscription) | 5 |
| `firestore.rules` | Create/Modify | 5 |
| `.env.example` | Modify | 1, 9 |
| `.env` (local only) | Modify | 9 |

---

## Key Decisions Recorded

- **Subscription storage:** Firestore `users` collection as source of truth + Clerk `publicMetadata` synced for fast frontend checks
- **Payment model:** Razorpay Subscriptions API (recurring) — not one-time orders
- **Backend:** Firebase Cloud Functions (no separate Node.js server)
- **Content gating logic:** `publicMetadata.subscriptionStatus === "premium"` checked in `PremiumRoute`
- **Free content:** All `/mock-test/*` routes remain free and ungated
- **Premium content:** All Firestore test routes (`/online-test-series`, `/quiz-category`, `/all-test`, `/all-quiz`, `/attempted-tests`, `/attempt/*/result`)
