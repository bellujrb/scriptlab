import React from 'react';

const Chat = ({ messages, input, onSendMessage, setInput, isLoading }) => (
    <div className="chat">
        <div className="messages">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.fromUser ? 'from-user' : 'from-bot'}`}>
                    {msg.type === 'button' ? (
                        <button className="auto-message-button" onClick={onSendMessage}>
                            {msg.text}
                        </button>
                    ) : (
                        msg.text
                    )}
                </div>
            ))}
        </div>
        <div className="chatbot-footer">
            <input
                type="text"
                placeholder="Write a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
            />
            <button onClick={onSendMessage} disabled={isLoading}>
                <span role="img" aria-label="send">➤</span>
            </button>
        </div>
    </div>
);

export default Chat;
