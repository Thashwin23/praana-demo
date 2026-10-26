# PRAANA — Data Ownership, Privacy & Retention Policy

---

## 1. Core Principles

1. **User Ownership:** All physiological measurements, workout histories, breathing telemetry, and derived analytics belong entirely to the user.
2. **Explicit Consent & Granular Opt-In:** Telemetry collection occurs only during active workouts or explicit baseline recording sessions. No covert background tracking.
3. **Medical Disclaimer:** PRAANA is a sports performance and athletic training optimization platform. It is **not** an FDA/CE-cleared medical device. Data must never be represented as clinical diagnosis for cardiac arrhythmias or respiratory pathology.

---

## 2. Data Classification & Security Tiers

| Data Classification | Examples | Storage Location | Encryption at Rest | Encryption in Transit | Retention Period |
|---|---|---|---|---|---|
| **Tier 1: Authentication & Identity** | Email, hashed password (bcrypt), JWT refresh tokens | Secure KeyStore / Keychain (mobile), MongoDB (backend) | AES-256 (Mobile KeyStore), Argon2/bcrypt hash | TLS 1.3 | Account lifetime |
| **Tier 2: User Athletic Profile** | Age, resting HR, max HR, weight, height, gender | Local SQLite, Backend DB | AES-256 | TLS 1.3 | Account lifetime |
| **Tier 3: Session Summaries** | Total duration, avg/max HR, avg breathing rate, TRIMP, estimated VO₂ Max | Local SQLite, Backend DB | Local encrypted DB, DB volume encryption | TLS 1.3 | Indefinite (or until user requests deletion) |
| **Tier 4: Processed Time-Series (1 Hz)** | Second-by-second HR, Respiration Rate, Cadence, SQI | Local SQLite, Backend DB | Encrypted storage | TLS 1.3 | 12 months rolling on cloud; indefinite on mobile |
| **Tier 5: Raw Sensor Waveforms (>25 Hz)** | Raw ECG (250 Hz), Raw Respiration Waveform (25 Hz), Raw IMU (50 Hz) | Local device cache | Local filesystem sandbox | TLS 1.3 | 30 days locally on mobile; not uploaded to backend by default unless user opts into raw analysis |

---

## 3. Data Sync & Idempotency Rules

1. **Network Disruption Resilience:**
   - Every workout session receives a client-generated UUID `sessionId` (RFC 4122 v4) at creation time.
   - Every batch of samples uploaded references this `sessionId` and includes monotonic sample sequence numbers.
   - If a network upload fails midway, retrying with the same `sessionId` and sequence numbers will not create duplicate sessions or double-count training load (Idempotent PUT / POST).

2. **Offline-First Mode:**
   - Workouts can be fully recorded, summarized, and reviewed offline without any network connectivity.
   - When network connectivity is restored, the mobile app drains the local synchronization queue in the background.

---

## 4. User Rights & Data Portability

1. **Right to Access & Export:**
   - Users can export any session in open formats (JSON, CSV, or FIT/TCX files) directly from the settings or session detail screen.
2. **Right to Erasure (Account & Data Deletion):**
   - The user can trigger a hard delete of their account.
   - Cascade deletion: Removes all user records, device bindings, workout sessions, and time-series telemetry from both local storage and cloud databases.
