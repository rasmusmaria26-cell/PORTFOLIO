import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/SoundManager';

const DialogueBox = ({ text, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
                if (text[index] !== ' ') playSound('text');
            }, 50);
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, text, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pixel-border"
            style={{
                width: '90%',
                maxWidth: '800px',
                padding: '20px',
                backgroundColor: 'black',
                color: 'white',
                fontSize: '1.2rem',
                lineHeight: '1.5',
                minHeight: '120px',
                zIndex: 10
            }}
        >
            <p style={{ margin: 0 }}>
                * {displayText}<span className="cursor">_</span>
            </p>
            <style >{`
        .cursor {
          animation: blink 1s infinite step-end;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
        </motion.div>
    );
};

export default DialogueBox;
