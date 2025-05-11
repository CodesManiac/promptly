const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const callGroq = async (chatHistory: { role: string; content: string }[]) => {
    // const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'llama3-8b-8192',
    //     messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...chatHistory],
    //   }),
    // });
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...chatHistory],
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error?.message || 'Unknown error from Groq API');
    }
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || 'No response from model.';
  };
  