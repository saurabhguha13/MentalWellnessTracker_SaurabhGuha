import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import './CompanionChat.css';
import { generateCompanionResponse } from '../services/ai';

const CompanionChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi there! I am your Samridhi Companion. How are you feeling about your studies today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateCompanionResponse(messages, userMessage.text);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: response }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container glass fade-in">
      <div className="chat-header">
        <Bot size={24} color="var(--primary)" />
        <div>
          <h3>Samridhi Companion</h3>
          <p className="status">Online | Always here to listen</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`message-bubble ${msg.sender}`}>
              {msg.sender === 'bot' && <Bot size={16} className="msg-icon" />}
              {msg.sender === 'user' && <User size={16} className="msg-icon" />}
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-bubble bot typing">
              <Loader2 size={16} className="spinner" />
              <span>Companion is typing...</span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isTyping}
        />
        <button type="submit" className="btn btn-primary send-btn" disabled={!input.trim() || isTyping}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default CompanionChat;
