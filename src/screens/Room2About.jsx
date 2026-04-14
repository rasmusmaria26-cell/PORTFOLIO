import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/SoundManager';

const CorruptedLog = ({ name, value, percent, colorClass }) => (
    <motion.div
        whileHover={{ x: 2, y: 2, filter: 'hue-rotate(90deg)' }}
        className="stat-card glass-panel glitch-hover"
        style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            border: '1px solid var(--gray)',
            borderLeft: `4px solid var(--${colorClass})`
        }}
    >
        <div style={{ fontSize: '10px', color: 'var(--gray)' }}>SUBJECT // {name}</div>
        <div style={{ fontSize: '14px', color: `var(--${colorClass})` }} className="flicker-text">{value}</div>
        <div style={{ height: '8px', background: 'var(--darkgray)', border: '1px solid var(--gray)', marginTop: 'auto' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                style={{
                    height: '100%',
                    backgroundColor: `var(--${colorClass})`,
                    boxShadow: `0 0 8px var(--${colorClass})`
                }}
            />
        </div>
    </motion.div>
);

const Room2About = () => {
    const logs = [
        { name: 'HP (CGPA)', value: '7.65 / 10', percent: 76, colorClass: 'white' },
        { name: 'AT (ATTITUDE)', value: 'DETERMINED', percent: 92, colorClass: 'soul' },
        { name: 'DF (DEDICATION)', value: '48H HACKATHONS', percent: 95, colorClass: 'green' },
        { name: 'EXP (YEAR)', value: '3RD YEAR CS', percent: 60, colorClass: 'blue' },
        { name: 'LOVE (PASSION)', value: 'CRYPTOGRAPHY', percent: 90, colorClass: 'soul' },
        { name: 'GOLD (PROJECTS)', value: '4 SHIPPED', percent: 70, colorClass: 'purple' },
    ];

    const dialogueLines = [
        "ENTRY NUMBER 17...",
        "Dark, darker, yet darker.",
        "Wait, wrong log file... r-recalibrating.",
        "...SUBJECT: MARIA RASMUS R.",
        "CS undergrad who gravitates toward the hard problems.",
        "B-built an encrypted offline m-mesh network from scratch...",
        "Ran face recognition entirely on-device... NO CLOUD!!",
        "She learns by breaking things... a-and rebuilding them better.",
        "Targeting Android and full-s-stack roles.",
        "R-real engineering. It's fascinating."
    ];

    const [currentLine, setCurrentLine] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (charIndex < dialogueLines[currentLine].length) {
            const timer = setTimeout(() => {
                // Alphys occasional glitch: 5% chance to type a random corrupted char, then correct it
                const isGlitch = Math.random() < 0.05;
                const charToType = isGlitch ? '@#[%&*'[(Math.floor(Math.random() * 6))] : dialogueLines[currentLine][charIndex];

                setDisplayText((prev) => prev + charToType);

                if (isGlitch) {
                    setTimeout(() => {
                        setDisplayText((prev) => prev.slice(0, -1) + dialogueLines[currentLine][charIndex]);
                        setCharIndex((prev) => prev + 1);
                    }, 50);
                } else {
                    setCharIndex((prev) => prev + 1);
                }

                if (charToType !== ' ') playSound('text');
            }, 40 + Math.random() * 40); // Variable typing speed for anxious Alphys feel
            return () => clearTimeout(timer);
        } else {
            // Auto advance after 3 seconds
            const nextTimer = setTimeout(() => {
                setDisplayText('');
                setCharIndex(0);
                setCurrentLine((prev) => (prev + 1) % dialogueLines.length);
            }, 3000);
            return () => clearTimeout(nextTimer);
        }
    }, [charIndex, currentLine, dialogueLines]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: '80px 40px', height: '100%', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
            <div style={{ fontSize: '12px', color: 'var(--gray)', letterSpacing: '4px' }}>SECTOR 2 // LAB CORRIDOR</div>

            {/* Alphys Log Box */}
            <div className="glass-panel" style={{ padding: '30px', borderTop: '4px solid var(--yellow)', position: 'relative' }}>
                <div style={{ fontSize: '10px', color: 'var(--yellow)', marginBottom: '15px' }}>ALPHYS_LOG.EXE</div>
                <p style={{ fontSize: '16px', lineHeight: '1.8', minHeight: '60px' }}>
                    <span style={{ color: 'var(--gray)' }}>* </span>
                    <span className={Math.random() < 0.02 ? 'flicker-text' : ''}>{displayText}</span>
                    <span style={{ animation: 'flicker 1s infinite' }}>_</span>
                </p>
            </div>

            {/* Corrupted Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {logs.map((log, i) => (
                    <CorruptedLog key={i} {...log} />
                ))}
            </div>
        </motion.div>
    );
};

export default Room2About;
