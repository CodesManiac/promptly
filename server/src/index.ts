import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat.route';

dotenv.config();

const app = express();
const PORT = 5000;


app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use('/api/chat', chatRouter);
app.get('/', (req, res) => {
  res.send('API is running');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
