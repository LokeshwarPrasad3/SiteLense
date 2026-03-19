// components/results/Loader.tsx
import React, { useState, useEffect } from 'react';

type LoaderProps = {
  text?: string; // Optional initial text
};

const messages = [
  'Analyzing performance...',
  'Checking SEO...',
  'Evaluating best practices...',
  'Compiling results...',
  'Almost there!',
];

const Loader: React.FC<LoaderProps> = ({ text }) => {
  const initialMessage = text || messages[0];
  const [currentMessage, setCurrentMessage] = useState(initialMessage);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Start cycling messages only if initial text is not provided or matches the first message
    if (text === initialMessage) {
      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 3000); // Change message every 3 seconds

      return () => clearInterval(interval);
    }
  }, [initialMessage, text]);

  useEffect(() => {
    // Update the displayed message when the index changes
    setCurrentMessage(messages[messageIndex]);
  }, [messageIndex]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-indigo-600"></div>
      <p className="text-lg font-semibold text-gray-700">{currentMessage}</p>
    </div>
  );
};

export default Loader;
