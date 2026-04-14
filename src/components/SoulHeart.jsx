import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SoulHeart = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: position.y - 10,
                left: position.x - 10,
                width: '20px',
                height: '20px',
                color: '#ff0000',
                pointerEvents: 'none',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            animate={{
                scale: isClicking ? 0.8 : [1, 1.1, 1],
            }}
            transition={{
                scale: isClicking ? { duration: 0.1 } : { repeat: Infinity, duration: 0.6 }
            }}
        >
            <svg viewBox="0 0 32 32" style={{ width: '100%', height: '100%' }}>
                <path fill="currentColor" d="M16,28.221l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.57c0-3.13,2.46-5.59,5.59-5.59c1.76,0,3.46,0.82,4.41,2.1
          c0.95-1.28,2.65-2.1,4.41-2.1c3.13,0,5.59,2.46,5.59,5.59c0,3.82-3.4,6.9-8.55,11.58L16,28.221z" />
            </svg>
        </motion.div>
    );
};

export default SoulHeart;
