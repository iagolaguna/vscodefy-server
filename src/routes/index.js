import express from 'express';

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ message: 'OK' });
});

export default router;
