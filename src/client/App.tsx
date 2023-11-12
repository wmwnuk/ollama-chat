// src/client/chat.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

let context: Array<number>;

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const focusTargetRef = useRef<HTMLTextAreaElement>(null);
  const responsesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {scrollToBottom();}, [responses]);

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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', // You can use 'auto' for an instant scroll
    });
  };

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col">
      <div className="bg-gray-700 flex justify-center p-4">
        <h1 className="text-white text-lg font-semibold">Ollama Chat</h1>
      </div>

    <div className="w-full max-w-screen-lg flex-1 m-auto p-8 my-4 pb-20" id="chat-messages">
    <div className="flex flex-col">
    {responses.map((response, index) => (
      <div className="mb-4" key={index}>
        <div className="flex items-start">
          <div className="ml-3 mb-3">
            <div
              className="bg-gray-700 text-white rounded-lg p-2 break-words"
              style={{backgroundColor: index%2 === 0 ? 'black' : ''}}
            >
              <span className="leading-5">
                <ReactMarkdown>
                  {response}
                </ReactMarkdown>
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
    </div>
    </div>

      <div className="fixed inset-x-0 bottom-0 bg-gray-700">
        <div className="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center">
        <textarea
          ref={focusTargetRef}
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3 rounded-lg border-none focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white resize-none"
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
    </div>
  );
};

export default App
