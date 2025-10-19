import { Router } from 'express';
import axios from 'axios';

const router = Router();

const BASE_URL =
  process.env.AGENTS_BASE_URL ||
  'https://qgvzzypa2rxbddoksf75vhqx.agents.do-ai.run';
const PATH = process.env.AGENTS_EVALUATE_PATH || '/';
const ACCESS_KEY = process.env.AGENTS_ACCESS_KEY || '';
const AUTH_HEADER = process.env.AGENTS_AUTH_HEADER || 'Authorization';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    ...(ACCESS_KEY ? { [AUTH_HEADER]: `Bearer ${ACCESS_KEY}` } : {}),
  },
});

router.post('/evaluate', async (req, res) => {
  try {
    const { data, status } = await client.post(PATH, req.body);
    res.status(status).json(data);
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const payload = err?.response?.data || { error: err?.message || 'Agent call failed' };
    res.status(status).json(payload);
  }
});

router.get('/health', (_req, res) => {
  res.json({ ok: true, baseUrl: BASE_URL, path: PATH, auth: Boolean(ACCESS_KEY) });
});

export default router;