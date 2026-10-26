export type MetricType =
  | 'heart_rate'
  | 'respiration_rate'
  | 'ecg_raw'
  | 'rr_interval'
  | 'cadence'
  | 'body_shock';

export type MetricUnit = 'bpm' | 'brpm' | 'mv' | 'ms' | 'spm' | 'g';

export type SignalQuality = 'good' | 'degraded' | 'invalid';

export type MetricStatus = 'raw' | 'derived' | 'estimated';

export interface SensorSample {
  sampleId: string;
  sessionId: string;
  userId: string;
  timestamp: number;
  metric: MetricType;
  value: number;
  unit: MetricUnit;
  status: MetricStatus;
  signalQuality: SignalQuality;
  sequenceNumber?: number;
}

export type ConnectionState =
  | 'disconnected'
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'error';

export interface DeviceInfo {
  id: string;
  name: string;
  rssi?: number;
  batteryLevel?: number;
  connectionState: ConnectionState;
  isMock: boolean;
}

export type WorkoutState = 'idle' | 'active' | 'paused' | 'completed';

export interface WorkoutSummary {
  sessionId: string;
  userId: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  avgHeartRate: number;
  maxHeartRate: number;
  avgRespirationRate: number;
  maxRespirationRate: number;
  estimatedTrimp?: number;
  estimatedVo2Max?: number;
  sampleCount: number;
  isDemoData: boolean;
}
