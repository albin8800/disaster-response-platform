import express from 'express';
import 'dotenv/config';
import alertRoutes from './routes/alert.routes.js';
import { swaggerSpec } from './config/swagger.config.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0';

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/', alertRoutes);

const server = app.listen(PORT, HOST, () => {
    console.log(`[SMS-SERVICE] Server running on http://${HOST}:${PORT}`);
    console.log(`[SMS-SERVICE] Swagger docs available at http://${HOST}:${PORT}/docs`);
});

process.on('SIGTERM', () => {
    console.log(`[SMS-SERVICE] SIGTERM received. Shutting down gracefully...`);
    server.close(() => {
        console.log(`[SMS-SERVICE] Process terminated.`);
        process.exit(0);
    });
});