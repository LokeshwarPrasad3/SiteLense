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
      <div className="relative mb-6 size-20">
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          <style>
            {`
              @keyframes rotateGlobe { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes radarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes pulseNode { 0%, 100% { opacity: 0.9; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
              @keyframes pulseLink { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.15; } }
              
              .animate-globe { animation: rotateGlobe 24s linear infinite; transform-origin: 50px 50px; }
              .animate-radar { animation: radarSweep 3s linear infinite; transform-origin: 50px 50px; }
              .animate-node { animation: pulseNode 2s ease-in-out infinite; transform-origin: center; }
              .animate-link { animation: pulseLink 3s ease-in-out infinite; }
            `}
          </style>

          <defs>
            <linearGradient id="primaryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="radarArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core Globe Structure - Rotating */}
          <g className="animate-globe">
            <g stroke="#e2e8f0" strokeWidth="0.75" fill="none">
              <circle cx="50" cy="50" r="38" />
              <ellipse cx="50" cy="50" rx="38" ry="12" />
              <ellipse cx="50" cy="50" rx="38" ry="26" />
              <ellipse cx="50" cy="50" rx="12" ry="38" />
              <ellipse cx="50" cy="50" rx="26" ry="38" />
            </g>

            {/* Connection Lines (Data Transfer) */}
            <g
              stroke="url(#primaryGlow)"
              strokeWidth="1"
              strokeDasharray="2 3"
              className="animate-link"
            >
              <line x1="25" y1="25" x2="70" y2="35" />
              <line x1="70" y1="35" x2="80" y2="60" />
              <line x1="80" y1="60" x2="35" y2="75" />
              <line x1="35" y1="75" x2="25" y2="25" />
              <line x1="25" y1="25" x2="50" y2="50" />
              <line x1="80" y1="60" x2="50" y2="50" />
            </g>

            {/* Orbiting Nodes */}
            <g filter="url(#glow)">
              {/* Note: transform-origin in CSS applies differently to inline SVG elements in some browsers, 
                  but cx/cy natively centers the scale due to transform-origin: center above. */}
              <circle
                cx="25"
                cy="25"
                r="3"
                fill="#6366f1"
                className="animate-node"
                style={{ transformOrigin: '25px 25px', animationDelay: '0s' }}
              />
              <circle
                cx="70"
                cy="35"
                r="4"
                fill="#8b5cf6"
                className="animate-node"
                style={{ transformOrigin: '70px 35px', animationDelay: '0.4s' }}
              />
              <circle
                cx="80"
                cy="60"
                r="3.5"
                fill="#3b82f6"
                className="animate-node"
                style={{ transformOrigin: '80px 60px', animationDelay: '0.8s' }}
              />
              <circle
                cx="35"
                cy="75"
                r="3"
                fill="#6366f1"
                className="animate-node"
                style={{ transformOrigin: '35px 75px', animationDelay: '1.2s' }}
              />
              <circle
                cx="50"
                cy="50"
                r="5"
                fill="#4f46e5"
                className="animate-node"
                style={{ transformOrigin: '50px 50px' }}
              />
            </g>
          </g>

          {/* Radar Sweep - Independent Rotation over the globe */}
          <g className="animate-radar">
            {/* Sweeping Cone */}
            <path d="M 50 12 A 38 38 0 0 1 88 50 L 50 50 Z" fill="url(#radarArc)" />
            {/* Leading Edge Scanning Laser */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="12"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
          </g>
        </svg>
      </div>

      <p className="mt-4 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-[13px] font-extrabold tracking-wider text-transparent uppercase shadow-indigo-500/10 drop-shadow-sm">
        {currentMessage}
      </p>
    </div>
  );
};

export default Loader;
