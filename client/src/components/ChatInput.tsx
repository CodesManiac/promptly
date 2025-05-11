import React, { useState } from 'react'


interface Props {
    onSend: (message: string) => void;
  }
const ChatInput: React.FC<Props> = ({ onSend }) => {
    const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };
  return (
    <form
    onSubmit={handleSubmit}
    className="fixed bottom-0 left-0 w-full bg-white flex items-center p-4 border-t"
  >
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask me anything..."
      className="flex-1 p-2 rounded border text-black"
    />
    <button
      type="submit"
      className="ml-2 px-4 py-2 bg-[#7007d9] hover:bg-[#9900fd] text-white rounded cursor-pointer"
    >
      Send
    </button>
  </form>
  )
}

export default ChatInput