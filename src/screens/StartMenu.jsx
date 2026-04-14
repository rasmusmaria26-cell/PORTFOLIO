import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/SoundManager';

const StartMenu = ({ onNavigate }) => {
    const options = ['START', 'ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'];
    const [selected, setSelected] = useState(0);

    const handleHover = (index) => {
        if (selected !== index) {
            setSelected(index);
            playSound('hover');
        }
    };

    const handleClick = (option) => {
        playSound('select');
        onNavigate(option.toLowerCase());
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ marginBottom: '60px', textAlign: 'center' }}
            >
                <h1 style={{ fontSize: '3rem', letterSpacing: '8px' }}>UNDERTALE</h1>
                <p style={{ color: '#aaa', marginTop: '10px' }}>PORTFOLIO EDITION</p>
                <p style={{ color: '#888', marginTop: '20px', fontSize: '0.8rem' }}>* Learning. Building. Improving.</p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
                {options.map((option, index) => (
                    <motion.div
                        key={option}
                        onMouseEnter={() => handleHover(index)}
                        onClick={() => handleClick(option)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: selected === index ? '#ffff00' : 'white'
                        }}
                        whileHover={{ x: 10 }}
                    >
                        {selected === index && (
                            <motion.svg
                                viewBox="0 0 32 32"
                                style={{ width: '24px', height: '24px', color: '#ff0000' }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <path fill="currentColor" d="M16,28.221l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.57c0-3.13,2.46-5.59,5.59-5.59c1.76,0,3.46,0.82,4.41,2.1
                  c0.95-1.28,2.65-2.1,4.41-2.1c3.13,0,5.59,2.46,5.59,5.59c0,3.82-3.4,6.9-8.55,11.58L16,28.221z" />
                            </motion.svg>
                        )}
                        <span style={{ marginLeft: selected === index ? '0' : '44px' }}>{option}</span>
                    </motion.div>
                ))}
            </div>

            {/* Decorative flickering stars could go here */}
            <div className="stars-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: '2px',
                            height: '2px',
                            backgroundColor: 'white',
                        }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: Math.random() * 3 + 1, delay: Math.random() * 5 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StartMenu;
