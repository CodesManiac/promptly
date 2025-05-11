import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { callGroq } from '../lib/groqApi';



interface Message {
    id: number;
    // role: 'user' | 'ai';
    role: 'user' | 'assistant';
    content: string;
  }
const Home = () => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('promptly-messages');
        return saved ? JSON.parse(saved) : [];
      });
      const messagesEndRef = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        localStorage.setItem('promptly-messages', JSON.stringify(messages));
      }, [messages]);
    
      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
    
      const handleSend = async (message: string) => {
        const userMessage: Message = {
          id: Date.now(),
          role: 'user',
          content: message,
        };
      
        setMessages((prev) => [...prev, userMessage]);
      
        const aiMessage: Message = {
          id: Date.now() + 1,
        //   role: 'ai',
          role: 'assistant',
          content: '...',
        };
      
        setMessages((prev) => [...prev, aiMessage]);
        try {
            const content = await callGroq([
              ...messages.map(({ role, content }) => ({ role, content })),
              { role: 'user', content: message },
            ]);
          
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessage.id ? { ...msg, content } : msg
              )
            );
          } catch (err: any) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessage.id
                  ? { ...msg, content: `Error: ${err.message}` }
                  : msg
              )
            );
          }
        // try {
        //   const response = await askOpenAI(message);
      
        //   setMessages((prev) =>
        //     prev.map((msg) =>
        //       msg.id === aiMessage.id ? { ...msg, content: response } : msg
        //     )
        //   );
        // } catch (error) {
        //   setMessages((prev) =>
        //     prev.map((msg) =>
        //       msg.id === aiMessage.id ? { ...msg, content: 'Error fetching response.' } : msg
        //     )
        //   );
        // }
      };
    
      return (
        <div className="min-h-screen text-white flex flex-col">
          <header className="text-center py-6 text-3xl font-bold">Promptly</header>
          <main className="flex-1 overflow-y-auto px-4 pb-28 ">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
            <div ref={messagesEndRef} />
          </main>
          <ChatInput onSend={handleSend} />
        </div>
      );
}

export default Home