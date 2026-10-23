import { Router } from "express";
import { getHealth, sendAlert } from "../controllers/alert.controllers.js";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Cluster Observability Health Check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy and operational.
 */

router.get("/health", getHealth);

/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Dispatch Emergency Disaster Alert SMS
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipient
 *               - message
 *               - severity
 *             properties:
 *               recipient:
 *                 type: string
 *                 example: "+1234567890"
 *               message:
 *                 type: string
 *                 example: "Flash flood alert: move to high ground."
 *               severity:
 *                 type: string
 *                 enum: [INFO, WARNING, CRITICAL, EVACUATION]
 *                 example: "CRITICAL"
 *               incidentId:
 *                 type: string
 *                 example: "inc-98234"
 *     responses:
 *       200:
 *         description: Alert successfully queued/sent.
 *       400:
 *         description: Missing required fields.
 */
router.post("/alerts", sendAlert);

export default router;
