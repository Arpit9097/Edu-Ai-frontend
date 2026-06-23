import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const Chat = () => {
  const { user, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Load chat session history from backend on mount/token change
  useEffect(() => {
    if (token) {
      const historyUrl = `${API_BASE_URL}/api/chat/history/`;
      console.log('[Chat] Final history request URL:', historyUrl);

      fetch(historyUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Use the most recent session
          const latestSession = data[0];
          setSessionId(latestSession.id);
          
          // Map database chat messages (user/ai) to frontend state
          const historyMessages = [];
          latestSession.messages.forEach(msg => {
            historyMessages.push({ role: msg.role, text: msg.content });
          });
          setMessages(historyMessages);
        } else {
          // Set default greeting if no history exists
          setMessages([
            { role: 'ai', text: `Hi ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI education counselor. Ask me anything about universities, admissions, loans, or career planning abroad.` }
          ]);
        }
      })
      .catch(err => {
        console.error("Error loading chat history:", err);
        setMessages([
          { role: 'ai', text: `Hi ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI education counselor. Ask me anything about universities, admissions, loans, or career planning abroad.` }
        ]);
      });
    } else {
      setMessages([
        { role: 'ai', text: `Hi ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI education counselor. Ask me anything about universities, admissions, loans, or career planning abroad.` }
      ]);
    }
  }, [token, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendChat = async (overrideText = null) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || loading) return;
    
    const userText = textToSend;
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    if (!overrideText) setInput('');
    setLoading(true);
    
    try {
      const chatUrl = `${API_BASE_URL}/api/chat/`;
      console.log('[Chat] Final chat request URL:', chatUrl);

      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          message: userText,
          session_id: sessionId
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        if (data.session_id) {
          setSessionId(data.session_id);
        }
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `Error: ${data.error || 'Failed to get response'}` }]);
      }
    } catch (err) {
      console.error("Chat communication error:", err);
      setMessages(prev => [...prev, { role: 'ai', text: "Error: Could not connect to backend server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };

  const handleSuggestionClick = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="chat-layout" style={{ margin: '-32px' }}>
      <div className="chat-sidebar">
        <h4>History</h4>
        <div className="chat-hist-list">
          <div className="chat-hist-item active">
            <span>🎓 Session #1</span>
            <span className="actions">✍️</span>
          </div>
          <div className="chat-hist-item">
            <span>💰 Education Loan Info</span>
            <span className="actions">✍️</span>
          </div>
          <div className="chat-hist-item">
            <span>🌍 Best Countries MS CS</span>
            <span className="actions">✍️</span>
          </div>
        </div>
      </div>
      
      <div className="chat-main">
        <div className="chat-header">
          <div className="logo-icon" style={{ width: 28, height: 28, fontSize: 13 }}>✦</div>
          <div>
            <div style={{ fontWeight: 600 }}>AI Counselor</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>Powered by Groq Llama 3.3</div>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.role}`}>
              <div className="msg-avatar">{msg.role === 'ai' ? '✦' : (user?.name?.substring(0, 2).toUpperCase() || 'U')}</div>
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="msg ai">
              <div className="msg-avatar">✦</div>
              <div className="msg-bubble">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        {!loading && messages.length <= 1 && (
          <div className="chat-suggestions">
            <div className="suggestion-pill" onClick={() => handleSuggestionClick("Shortlist best universities in US for CGPA 8.2")}>
              🎓 Shortlist Universities (8.2 CGPA)
            </div>
            <div className="suggestion-pill" onClick={() => handleSuggestionClick("What are the loan options for Canada study visa?")}>
              💰 Loan for Canada
            </div>
            <div className="suggestion-pill" onClick={() => handleSuggestionClick("Explain public university costs in Germany")}>
              🌍 Germany Study Costs
            </div>
          </div>
        )}
        
        <div className="chat-input-container">
          <div className="chat-input-area">
            <input 
              className="chat-input" 
              placeholder="Ask anything about your future abroad..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button className="send-btn" onClick={() => sendChat()} disabled={loading || !input.trim()}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
