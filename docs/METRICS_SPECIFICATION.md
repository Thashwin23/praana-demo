# PRAANA — Physiological Metrics & Signal Classification Specification

> **Cardinal Rule:** Never claim a metric can be measured or calculated until its required physical inputs, sensor precision, and mathematical validation methods are confirmed. Never present experimental estimations as clinical facts.

---

## Metric Classification Taxonomy

In PRAANA, all physiological indicators are strictly categorized into one of four tiers:

1. **Measured:** Direct physical transducer readings (e.g., electrical potential for ECG, capacitance/impedance for breathing, capacitive acceleration for IMU).
2. **Derived (Deterministic):** Mathematically computed from measured signals without statistical inference (e.g., RR interval = $T_{R_{i}} - T_{R_{i-1}}$, instantaneous Heart Rate = $60000 / \text{RR}_{\text{ms}}$, RMSSD, step cadence).
3. **Estimated (Statistical / Model-Based):** Calculated using empirical regression, machine learning, population norms, or demographic heuristics (e.g., VO₂ Max, Sleep Stages, Aerobic/Anaerobic Thresholds VT1/VT2, Readiness Score).
4. **Unavailable / Pending Hardware:** Features on the wishlist that lack necessary sensor inputs or validation.

---

## Physiological Metrics Matrix

| Metric Name | Category | Primary Sensor Input(s) | Sampling Rate / Window | Calculation Method | Signal Quality Dependency | Processing Tier | Validation & Limitations |
|---|---|---|---|---|---|---|---|
| **Raw ECG Waveform** | Measured | Dry/Wet conductive electrodes (AFE) | 125 Hz – 500 Hz | Analog-to-digital conversion, 0.5–40 Hz digital bandpass filter | High (electrode contact impedance, motion artifact) | Sensor / Mobile | Requires clean skin contact. Not an FDA diagnostic 12-lead ECG. |
| **Instantaneous Heart Rate (HR)** | Derived | ECG or PPG pulse signal | Event-driven (per beat) or 1 Hz | Pan-Tompkins QRS peak detection algorithm; $60 / \text{RR}_{\text{sec}}$ | High | Sensor or Mobile | Motion artifacts cause false R-peaks or dropped beats. Quality index required. |
| **RR Interval** | Derived | ECG R-peak timestamps | Event-driven | Consecutive difference between detected R-waves: $\Delta t = t_i - t_{i-1}$ | High | Sensor or Mobile | Non-sinus beats or ectopic beats must be filtered (NN intervals). |
| **Heart Rate Variability (HRV - RMSSD)** | Derived | NN intervals (filtered RR) | 2-min to 5-min baseline resting window | Root Mean Square of Successive Differences: $\sqrt{\frac{1}{N-1}\sum (RR_{i+1} - RR_i)^2}$ | Very High | Mobile or Backend | Only valid in stationary resting states. Meaningless during high-intensity exercise without specialized filtering. |
| **Breathing Rate (Respiration Rate)** | Measured or Derived | Respiratory inductance plethysmography (RIP), transthoracic impedance, or ECG-derived respiration (EDR) | 10 Hz – 25 Hz raw; 0.2 Hz rate (every 5s) | Zero-crossing / peak detection on filtered respiration waveform (0.1–1.0 Hz) | Medium-High | Sensor or Mobile | EDR (respiratory sinus arrhythmia / QRS amplitude modulation) is an *estimate*; physical RIP/impedance is *measured*. |
| **Ventilatory Thresholds (VT1 & VT2)** | Estimated | Breathing Rate, Minute Ventilation surrogate, Heart Rate, and Workload | Progressive ramp test / 30s rolling windows | Identifying inflections in breathing frequency relative to heart rate / power output | High | Backend / Analysis Engine | Requires a structured ramp test or incremental workout protocol. Lab gold standard requires metabolic cart ($V_E/VO_2$ and $V_E/VCO_2$). Mobile estimation has confidence bounds of $\pm 8-12\%$. |
| **Estimated VO₂ Max** | Estimated | Max HR, Resting HR, Age, Gender, Body Mass, and Submaximal/Maximal effort dynamics | Whole session post-workout | Uth-Sørensen-Overgaard ratio ($15.3 \times \frac{\text{HR}_{\max}}{\text{HR}_{\text{rest}}}$) or Firstbeat-style submax HR vs. pace regression | Medium | Backend | Statistical estimate with $\pm 10-15\%$ error margin compared to direct spirometry. Clearly marked as an estimate. |
| **Training Load & Strain** | Derived / Estimated | Heart Rate, Duration, Breathing Rate, and Intensity Zones | Post-workout and cumulative 7-day rolling window | Edwards TRIMP (Training Impulse) or Banister TRIMP: $\sum (\text{Duration in Zone}_i \times \text{Weight}_i)$ | Medium | Backend | Measures internal cardiovascular stress, not biomechanical skeletal-muscular fatigue. |
| **Cadence (Steps per Minute)** | Derived | 3-axis Accelerometer | 25 Hz – 50 Hz IMU | Peak detection / autocorrelation of vertical acceleration vector magnitude | Medium | Sensor or Mobile | Accuracy depends on wearable placement (chest strap vs. wrist vs. waistband). |
| **Body Shock / Movement Impact** | Derived | 3-axis Accelerometer | 50 Hz – 100 Hz | Jerk / peak resultant acceleration: $G_{\text{peak}} = \max(\sqrt{a_x^2 + a_y^2 + a_z^2})$ | High | Sensor or Mobile | Measures G-force shock transmitted through the sensor mounting point during foot strike. |
| **Readiness & Recovery Score** | Estimated | Baseline resting HRV (RMSSD), Resting HR, prior day Training Load | Morning resting 3-min window | Weighted deviation from 30-day individual rolling baseline (z-score) | High | Mobile or Backend | Not a medical diagnosis. Trend-based indicator of autonomic nervous system balance (sympathetic vs. parasympathetic). |
| **Sleep Stages (Deep, Light, REM, Awake)** | Estimated | Resting HR, HRV, Accelerometer actigraphy | 30s epochs overnight | Multi-feature heuristic classifier or machine learning model | High | Backend | Wearables estimate sleep stages based on movement and autonomic tone; true clinical sleep staging requires EEG (Polysomnography). |

---

## Signal Quality Index (SQI) Requirements

Every incoming sample must be accompanied by or evaluated for a **Signal Quality Index (SQI)**:
- `GOOD` (100%): Stable baseline, prominent R-peaks/breathing troughs, within physiological bounds.
- `DEGRADED` (50%): Elevated noise floor, minor motion artifact, some missed cycles.
- `INVALID` (0%): Lead-off condition, sensor saturation, extreme non-physiological values (e.g., HR > 250 BPM or < 30 BPM during running).

**Missing Data Rules:**
1. Never silently replace missing values with `0`.
2. Missing values are flagged with `null` or explicit quality flags (`data_loss_gap`).
3. Summary calculations (averages, load) must compute statistics strictly over valid non-null samples and report data coverage percentage.
