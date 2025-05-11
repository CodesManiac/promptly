import React from 'react'

interface Props {
    // role: 'user' | 'ai';
    role: 'user' | 'assistant';
    content: string;
  }
const ChatMessage: React.FC<Props> = ({ role, content }) => {
    const isUser = role === 'user';
    return (
      <div
        className={`my-2 p-4 rounded max-w-xl mx-auto whitespace-pre-wrap ${
          isUser ? 'bg-[#9900fd] self-end text-right text-white' : 'bg-white text-black'
        }`}
      >
        <p>{content}</p>
      </div>
    );
}

export default ChatMessage