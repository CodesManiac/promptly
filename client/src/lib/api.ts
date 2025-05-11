import axios from 'axios';

const API_KEY = "VITE_OPENAI_API_KEY";

export const askOpenAI = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};
