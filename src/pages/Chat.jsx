import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI education counselor. Ask me anything about universities, admissions, loans, or career planning abroad.` }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendChat = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Great question! Let me analyze your profile and get back with personalized recommendations regarding "${input.substring(0, 20)}..." ✦` 
      }]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };

  return (
    <div className="chat-layout">
      <div className="chat-sidebar">
        <h4>History</h4>
        <div className="chat-hist-item active">MS in CS — USA</div>
        <div className="chat-hist-item">Loan for Canada</div>
        <div className="chat-hist-item">GRE scores needed</div>
        <div className="chat-hist-item">SOP tips</div>
        <div className="chat-hist-item">Visa process UK</div>
      </div>
      
      <div className="chat-main">
        <div className="chat-header">💬 AI Counselor</div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.role}`}>
              <div className="msg-avatar">{msg.role === 'ai' ? '✦' : (user?.name?.substring(0, 2).toUpperCase() || 'U')}</div>
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-area">
          <input 
            className="chat-input" 
            placeholder="Ask anything about your future…" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="send-btn" onClick={sendChat}>↑</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
