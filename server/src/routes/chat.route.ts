import { Router,Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
console.log('Groq APIServer Key:', process.env.GROQ_API_KEY);
router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;
console.log()
  try {
   
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
  if (!response.ok) {
        console.log(res.status(response.status).json({ error: data.error }));
  }
   
  
      res.json(data);
  } catch (error: any) {
    console.error('Groq API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Groq API' });
  }
});

export default router;
