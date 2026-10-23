import { Request, Response } from "express";
import { HealthResponse, SendAlertRequest, SendAlertResponse } from "../types/alert.types.js";

export const getHealth = async (_req: Request, res: Response<HealthResponse>): Promise<Response> => {
    const healthData: HealthResponse = {
        status: 'OK',
        service: 'sms-service',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    };
    return res.status(200).json(healthData);
}

export const sendAlert = async (req: Request<{}, {}, SendAlertRequest>, res: Response<SendAlertResponse | { error: string }>): Promise<Response> => {
    try {
        const { recipient, message, severity, incidentId } = req.body;

        if (!recipient || !message || !severity) {
            return res.status(400).json({ error: 'Validation failed: recipient, message, and severity are required' })
        }

        await new Promise((resolve) => setTimeout(resolve, 50));
        console.log(`[DISASTER ALERT - ${severity} To: ${recipient} | Incident: ${incidentId ?? 'N/A'}] ${message}`);

        const  responseData: SendAlertResponse = {
            messageId: `sms-${Date.now()}`,
            recipient,
            severity,
            status: 'SENT',
            dispatchedAt: new Date().toISOString()
        };
        return res.status(200).json(responseData);
    } catch (error) {
        console.error('Failed to send disaster alert:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}