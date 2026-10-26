# PRAANA — Hardware Integration Questionnaire

> **Purpose:** PRAANA's mobile application is built using a decoupled `SensorProvider` architecture. Before writing any device-specific Bluetooth Low Energy (BLE) or serial communication code, the hardware team or OEM vendor must answer the technical questions below.
> 
> **Status:** Unconfirmed / Pending Hardware Specs

---

## 1. Physical Device & Sensor Hardware

1. **Device Identification:**
   - What is the exact device manufacturer, commercial model name, and hardware revision?
   - What firmware version is currently running, and how are firmware updates (OTA) handled?
   - Is there a proprietary companion app or reference firmware already operational?

2. **Sensor Complement:**
   - **Electrodes / ECG:** Does the hardware have dry or wet conductive electrodes for single-lead / multi-lead ECG? What is the analog front-end (AFE) chip (e.g., TI ADS129x, Maxim MAX30001)?
   - **Breathing / Respiration:** How is breathing detected physically?
     - Chest expansion via inductive plethysmography / strain gauge?
     - Transthoracic impedance pneumography (impedance changes across ECG electrodes)?
     - Respiratory Sinus Arrhythmia (RSA) derived mathematically from RR intervals?
     - Acoustic / airflow microphone?
   - **Inertial Measurement (IMU):** Is there an accelerometer / gyroscope (e.g., 6-axis or 9-axis)? What is the full-scale range (±2g, ±4g, ±8g, ±16g)?
   - **Optical (PPG):** Is there a photoplethysmogram sensor (Red / IR / Green LEDs) for SpO₂ or pulse rate?
   - **Temperature:** Is skin or ambient temperature measured?
   - **Haptic / Actuators:** Is there a vibration motor or buzzer for real-time athlete feedback/alerts?

---

## 2. Bluetooth Low Energy (BLE) Profile & Protocol

1. **Standard vs. Proprietary Profiles:**
   - Does the device implement standard Bluetooth SIG GATT services?
     - `0x180D` Heart Rate Service (HRS) with `0x2A37` Heart Rate Measurement?
     - `0x180A` Device Information Service?
     - `0x180F` Battery Service?
   - Or does it use a custom vendor Service UUID and Characteristic UUIDs? (Please list all 128-bit UUIDs).

2. **Advertising & Discovery:**
   - What is the advertised Local Name and Service UUID list?
   - What is the advertising interval?
   - Does the device require active scanning or passive scanning?
   - How does pairing work (Just Works, Passkey entry, Numeric Comparison, or no security bonding)?

3. **Packet Structure & Byte Ordering:**
   - What is the packet serialization format? (Raw binary structs, Protobuf, CBOR, or ASCII)?
   - What is the byte endianness (Little-Endian or Big-Endian)?
   - What is the Maximum Transmission Unit (MTU) size supported (e.g., default 23 bytes vs. negotiated up to 247 or 512 bytes)?
   - Are packets fragmented across multiple BLE notifications, or does each notification contain a self-contained frame?
   - Is there a packet counter / sequence number to detect dropped BLE packets over radio interference?
   - Is there a checksum (CRC-8, CRC-16, XOR) at the end of each payload?

---

## 3. Sampling Rates, Resolution & Units

Please complete the table below for each signal emitted by the device:

| Signal | Sampling Rate (Hz) | Transmission Rate (Hz) | Data Type & Bit Depth | Scale Factor / Units | Raw or Pre-filtered? |
|---|---|---|---|---|---|
| **ECG Waveform** | e.g., 250 Hz | e.g., 25 Hz (batches of 10) | `int16_t` | `µV` or `mV` (LSB = ?) | Bandpass filtered? |
| **Instantaneous HR** | e.g., 1 Hz | 1 Hz | `uint8_t` | Beats Per Minute (BPM) | Filtered? |
| **RR Intervals** | Event-driven (per beat) | Per beat / 1 Hz | `uint16_t` | Milliseconds (ms) or 1/1024 s | R-peak detected on-device? |
| **Respiration Waveform** | e.g., 25 Hz | 5 Hz (batches of 5) | `int16_t` | Relative impedance / ADC units | Raw analog |
| **Breathing Rate** | e.g., 0.2 Hz (every 5s) | 0.2 Hz | `uint8_t` | Breaths Per Minute (BrPM) | Computed on-device? |
| **Accelerometer (X,Y,Z)** | e.g., 50 Hz | 10 Hz (batches of 5) | `int16_t` | milli-g (`mg`) or `m/s²` | Raw |
| **Battery Level** | e.g., 0.016 Hz (1/min) | 0.016 Hz | `uint8_t` | Percentage (0–100%) | Smoothed |

---

## 4. On-Device Processing vs. Raw Telemetry

1. **Edge vs. Host Division:**
   - Does the device compute Heart Rate and R-peak detection internally, or must the mobile app execute QRS detection algorithms on raw ECG waveforms?
   - Does the device calculate breathing rate, or does it transmit raw impedance / strain sensor data?
   - Does the device calculate cadence and step count, or must the mobile app compute zero-crossings / peak detection on the accelerometer signal?

2. **Timestamps & Clock Synchronization:**
   - Does the device have a Real-Time Clock (RTC) with epoch milliseconds, or a relative microsecond tick counter starting at device boot?
   - How should the mobile app synchronize clocks to correlate sensor data with external events?

---

## 5. Offline Storage & Session Synchronization

1. **Onboard Memory:**
   - Does the wearable contain onboard Flash/EEPROM to record workouts when disconnected from the phone?
   - If yes, what is the memory capacity (e.g., hours of recording at full sampling rate)?
2. **Download Protocol:**
   - How are stored sessions retrieved over BLE?
   - Is there a file transfer service (like Nordic LBS/DFU, custom command-response, or high-throughput BLE stream)?
   - Can the phone request a directory of past recorded sessions by start timestamp?

---

## 6. Power, Latency & Mobile Operating System Constraints

1. **Connection Parameters:**
   - What are the minimum and maximum connection intervals (`min_conn_interval`, `max_conn_interval`)?
   - What is the slave latency and supervision timeout?
   - iOS imposes strict BLE connection parameter rules (Apple Accessory Design Guidelines). Does the peripheral firmware adhere to Apple's requirements (e.g., connection interval a multiple of 15 ms, minimum 15 ms, slave latency ≤ 30, supervision timeout ≤ 6 s)?

2. **Background Transmission:**
   - Does the device support maintaining BLE connections when the iOS/Android app is backgrounded or screen locked?
   - What is the expected battery life during active streaming versus idle standby?
