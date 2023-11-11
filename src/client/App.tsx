// src/client/chat.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';

let context: Array<number>;

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const focusTargetRef = useRef<HTMLTextAreaElement>(null);

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
      setTimeout(() => {
        if (focusTargetRef.current) {
          focusTargetRef.current.focus();
        }
      }, 1000)
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
    <div className="absolute inset-4 mx-4 my-4 bg-gray-900 rounded-lg shadow-lg overflow-hidden h-11/12">
      <div className="bg-gray-700 py-2 px-4">
        <h1 className="text-lg font-semibold">Ollama Chat</h1>
      </div>

    <div className="px-4 py-2 overflow-y-scroll h-full bg-gray-800" id="chat-messages">
    {responses.map((response, index) => (
      <div className="mb-4" key={index}>
        <div className="flex items-start">
          <div className="ml-3">
            <div className="bg-gray-700 text-white rounded-lg p-2">
              <p className="leading-5">{response}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
   </div>

      <div className="bg-gray-700 px-4 py-2 flex items-center absolute bottom-0 w-full">
        <textarea
          ref={focusTargetRef}
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3 rounded-lg border-none focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white"
          disabled={inputDisabled}
          style={{opacity: inputDisabled ? 0.5 : 1, cursor: inputDisabled ? 'not-allowed' : 'auto'}}
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-full"
          disabled={inputDisabled}
          style={{opacity: inputDisabled ? 0.5 : 1, cursor: inputDisabled ? 'not-allowed' : 'auto'}}
        >Send</button>
      </div>
    </div>
  );
};

export default App
