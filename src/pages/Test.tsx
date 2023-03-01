import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import MapGoogle from 'components/map/Google';

const socket: Socket = io('http://localhost:3000');

export default function Chatting() {
  const [messages, setMessages] = useState<string[]>(['1', 'abd']);
  const [inputValue, setInputValue] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('message', (message: string) => {
      console.log(message, 'recieved');
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      console.log('emit', inputValue);
      socket.emit('message', inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='App'>
      <h1>Chat App</h1>
      <div className='messages-container'>
        {messages.map((message, index) => (
          <div key={index} className='message'>
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={inputValue} onChange={handleInputChange} />
        <button type='submit'>Send</button>
      </form>
      <MapGoogle />
    </div>
  );
}
