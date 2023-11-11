// src/client/chat.tsx
import React, { useState } from 'react';
import axios from 'axios';

let context: Array<number>;

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleSendMessage = async () => {
    try {
      setInputDisabled(true);

      setResponses([...responses, input]);
      const ollamaResponse = await axios.post('http://localhost:3000/ollama',
              { message: input, context: context }
      );
      context = ollamaResponse.data.context;
      setResponses([...responses, input, ollamaResponse.data.message]);
      setInput('');
    } catch (error) {
      console.error('Error sending message to Ollama:', error);
    } finally {
      setInputDisabled(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter key press
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent new line in textarea
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white font-sans relative">
      <div className="w-full p-6 bg-gray-800 rounded-lg shadow-lg flex-grow overflow-y-auto">
        <div>
          <ul className="list-none">
            {responses.map((response, index) => (
              <li className="border-t border-slate-700 p-5" key={index}>{response}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-5 gap-2 fixed bottom-0 w-full">
          <div className="mt-4 col-span-4">
            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-2 bg-gray-700 text-white rounded resize-none"
              placeholder="Type your message here..."
              disabled={inputDisabled}
            />
          </div>
          <div className="mt-3 col-span-1">
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 rounded w-full h-full ${inputDisabled ? 'cursor-not-allowed opacity-50' : ''}`}"
              disabled={inputDisabled}
            >
              Send
            </button>
          </div>
      </div>
      </div>
    </div>
  );
};

export default App
