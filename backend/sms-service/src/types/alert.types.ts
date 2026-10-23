/**
 * Severity levels for disaster response alerts.
 */
export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'EVACUATION';

/**
 * Lifecycle status of an SMS notification.
 */
export type AlertStatus = 'QUEUED' | 'SENT' | 'FAILED';

/**
 * Strict payload for triggering a disaster alert SMS.
 */
export interface SendAlertRequest {
  recipient: string;               // E.164 phone number e.g. +1234567890
  message: string;                 // Emergency message body
  severity: AlertSeverity;         // Priority level
  incidentId?: string;             // Optional correlated disaster incident ID
}

/**
 * Standardized response payload for SMS dispatch.
 */
export interface SendAlertResponse {
  messageId: string;
  recipient: string;
  severity: AlertSeverity;
  status: AlertStatus;
  dispatchedAt: string;
}

/**
 * Health check response format for cluster observability.
 */
export interface HealthResponse {
  status: 'OK' | 'DEGRADED';
  service: string;
  uptime: number;
  timestamp: string;
}
