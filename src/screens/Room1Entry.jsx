import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/SoundManager';
import SpritePlayer from '../components/SpritePlayer';

const Room1Entry = ({ goToRoom }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const options = [
        { label: 'ABOUT', room: 1 },
        { label: 'SKILLS', room: 2 },
        { label: 'PROJECTS', room: 3 },
        { label: 'CONTACT', room: 4 },
    ];

    useEffect(() => {
        const handleMenuKeys = (e) => {
            if (e.key === 'ArrowDown') {
                setSelectedOption((prev) => (prev + 1) % options.length);
                playSound('hover');
            } else if (e.key === 'ArrowUp') {
                setSelectedOption((prev) => (prev - 1 + options.length) % options.length);
                playSound('hover');
            } else if (e.key === 'Enter') {
                playSound('select');
                goToRoom(options[selectedOption].room);
            }
        };
        window.addEventListener('keydown', handleMenuKeys);
        return () => window.removeEventListener('keydown', handleMenuKeys);
    }, [selectedOption, goToRoom]);

    // Corrupted determination text effect
    const [determinationText, setDeterminationText] = useState('');
    const fullText = 'DETERMINATION';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                // Randomly generate a glitch character before setting the real one
                const chars = '!@#$%^&*()_+-=[]{}|;:",.<>?';
                setDeterminationText((prev) => prev + chars.charAt(Math.floor(Math.random() * chars.length)));

                setTimeout(() => {
                    setDeterminationText((prev) => prev.slice(0, -1) + fullText[index]);
                    index++;
                }, 100);
            } else {
                clearInterval(interval);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--darkgray)' }}>
            {/* Light flicker effect on background */}
            <motion.div
                className="flicker-text"
                style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: '24px', letterSpacing: '8px', color: 'var(--red)', textShadow: '0 0 10px red' }}
            >
                {determinationText}
            </motion.div>

            <div className="enemy-sprite glitch-hover" style={{ marginBottom: '40px', filter: 'drop-shadow(0 0 15px rgba(200,200,200,0.4))' }}>
                <SpritePlayer size={160} frameX={0} frameY={1} />
            </div>

            <h2 className="glitch-hover" style={{ fontSize: '32px', marginBottom: '8px' }}>MARIA RASMUS R</h2>
            <div style={{ color: 'var(--gray)', fontSize: '10px', marginBottom: '60px' }}>* A CORRUPTED DEVELOPER APPEARED.</div>

            {/* Vertical Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', minWidth: '200px' }}>
                {options.map((opt, idx) => (
                    <div
                        key={idx}
                        style={{ display: 'flex', alignItems: 'center', gap: '15px', color: selectedOption === idx ? 'var(--yellow)' : 'var(--white)', opacity: selectedOption === idx ? 1 : 0.5 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: selectedOption === idx ? [0, 1, 0.5, 1] : 0 }}
                            style={{ color: 'var(--soul)', display: 'inline-block' }}
                        >
                            ♥
                        </motion.div>
                        <span style={{ fontSize: '16px' }}>{opt.label}</span>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '60px' }}>
                <div style={{ fontSize: '9px', color: 'var(--gray)', marginBottom: '6px' }}>HP — CGPA</div>
                <div style={{ width: '300px', height: '22px', background: 'var(--black)', border: '2px solid var(--gray)', margin: '0 auto', overflow: 'hidden' }}>
                    <motion.div
                        className="flicker-text"
                        style={{ height: '100%', background: 'var(--yellow)', width: '76.5%' }}
                    />
                </div>
                <div style={{ fontSize: '8px', color: 'var(--white)', marginTop: '6px' }}>7.65 / 10.0</div>
            </div>
        </div>
    );
};

export default Room1Entry;
