import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth';
import documentRoutes from './routes/documents';
import caseRoutes from './routes/cases';
import precedentRoutes from './routes/precedents';

config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes with specific origin
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

app.use(express.json());

// Root route
app.get('/', (_, res) => {
  res.json({
    message: 'Verdic AI API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      documents: '/api/documents',
      cases: '/api/cases',
      precedents: '/api/precedents'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/precedents', precedentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});