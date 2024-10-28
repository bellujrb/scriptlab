import React, { useState } from 'react';
import './AIChat.scss';
import Chat from './plus/Chat';

const AIChat = ({ onChatInteraction }) => {
    const [messages, setMessages] = useState([
        { text: "Type anything to view an exclusive example of the script from our beta version.", fromUser: false },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, fromUser: true }]);
            setInput('');
            setIsLoading(true);

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Finished! Good Study", fromUser: false },
                ]);
                setIsLoading(false);
            }, 2000);

            onChatInteraction(); 
        }
    };

    const handleAutoMessage = () => {
        const autoMessage = "Yes";
        setMessages([...messages, { text: autoMessage, fromUser: true }]);
        setIsLoading(true);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Here.", fromUser: false },
            ]);
            setIsLoading(false);
        }, 2000);

        onChatInteraction(); 
    };

    return (
        <div className="chatbot-container open">
            <div className="chatbot-content">
                <div className="chatbot-header">
                    <div className="header-info">
                        <img src="public/chat.png" alt="ScriptLab Logo" className="header-logo" />
                        <div className='scriptlab'>
                            <span className="header-title">AIChat</span>
                            <span className="header-status">Always available</span>
                        </div>
                    </div>
                </div>
                <div className="chatbot-body">
                    <Chat 
                        messages={messages} 
                        input={input} 
                        onSendMessage={handleSendMessage} 
                        setInput={setInput} 
                        isLoading={isLoading} 
                        handleAutoMessage={handleAutoMessage} 
                    />
                </div>
            </div>
        </div>
    );
};

export default AIChat;
