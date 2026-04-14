import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/SoundManager';
import { Building2, ShoppingBag, Terminal, Globe } from 'lucide-react';

const WorldMap = ({ onNavigate }) => {
    const projects = [
        { id: 1, name: 'PhishGuard', type: 'Chrome Ext', icon: Globe, color: '#4285f4', desc: 'Detects phishing websites using rule-based and NLP techniques.' },
        { id: 2, name: 'Servify', type: 'Platform', icon: ShoppingBag, color: '#34a853', desc: 'Platform to compare service centers with a streamlined booking flow.' },
        { id: 3, name: 'LendAI', type: 'Backend', icon: Terminal, color: '#fbbc05', desc: 'Loan risk scoring system with structured validation logic.' },
        { id: 4, name: 'G-Chat', type: 'Firebase App', icon: Globe, color: '#ea4335', desc: 'Real-time chat app with AI-powered summary generation.' },
    ];

    const [hovered, setHovered] = useState(null);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            <p style={{ position: 'absolute', top: '20px', left: '20px', color: '#888' }}>* Use your Soul to explore the map.</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '100px', padding: '100px', justifyContent: 'center' }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        onMouseEnter={() => {
                            setHovered(project);
                            playSound('hover');
                        }}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => playSound('select')}
                        style={{
                            width: '120px',
                            height: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            border: `4px solid ${project.color}`,
                            backgroundColor: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: hovered?.id === project.id ? `0 0 20px ${project.color}` : 'none'
                        }}>
                            <project.icon size={40} color={project.color} />
                        </div>
                        <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>{project.name}</span>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="pixel-border"
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '80%',
                            maxWidth: '600px',
                            padding: '20px',
                            backgroundColor: 'black',
                            zIndex: 10
                        }}
                    >
                        <p style={{ color: hovered.color, marginBottom: '10px' }}>{hovered.type.toUpperCase()}: {hovered.name}</p>
                        <p style={{ fontSize: '0.9rem' }}>{hovered.desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => onNavigate('menu')}
                className="pixel-border"
                style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: 'black', color: 'white', padding: '10px 20px', cursor: 'pointer' }}
            >
                BACK
            </button>
        </div>
    );
};

export default WorldMap;
