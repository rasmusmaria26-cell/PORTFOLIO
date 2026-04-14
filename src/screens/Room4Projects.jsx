import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/SoundManager';

const Specimen = ({ title, type, desc, tags, colorClass, onEngage }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => { playSound('select'); onEngage({ title, colorClass, type, tags }); }}
        className="glass-panel"
        style={{
            padding: '30px',
            cursor: 'none',
            border: '2px solid #333',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        {/* Broken Glass Effect Overlay */}
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, transparent 20%, rgba(0,0,0,0.8) 100%)',
            pointerEvents: 'none'
        }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.3 }}>
                <path d="M80% 20% L10% 90% M80% 20% L40% 100% M80% 20% L0% 40% M80% 20% L100% 60%" stroke={`var(--${colorClass})`} strokeWidth="2" />
            </svg>
        </div>

        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '8px', color: `var(--${colorClass})`, border: `1px solid var(--${colorClass})`, padding: '2px 4px' }}>
            {type}
        </div>

        <h3 style={{ fontSize: '14px', color: 'var(--white)', marginBottom: '15px' }}>{title}</h3>
        <p style={{ fontSize: '9px', color: 'var(--gray)', lineHeight: '1.8', marginBottom: '20px', minHeight: '60px' }}>{desc}</p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tags.map((tag, i) => (
                <span key={i} style={{ fontSize: '7px', color: `var(--${colorClass})`, border: `1px solid var(--${colorClass})`, padding: '2px 6px' }}>{tag}</span>
            ))}
        </div>
    </motion.div>
);

const Room4Projects = () => {
    const [activeEncounter, setActiveEncounter] = useState(null);

    const projects = [
        { title: 'OFFGRID_MESH', type: 'HACKATHON', colorClass: 'soul', desc: 'Zero internet. Zero servers. Encrypted offline mesh communication app.', tags: ['Bluetooth LE', 'Wi-Fi Aware', 'Kotlin'] },
        { title: 'SERVIFY_CORE', type: 'FULL-STACK', colorClass: 'green', desc: '2-role Android app to compare verified repair vendors. Real-time status.', tags: ['Supabase', 'Jetpack Compose', 'MVVM'] },
        { title: 'PHISH_GUARD', type: 'SECURITY', colorClass: 'purple', desc: 'Chrome extension using NLP & heuristic scanning to identify high-risk URLs.', tags: ['NLP', 'JS', 'Extension'] },
        { title: 'IRON_FACE_AI', type: 'AI_ML', colorClass: 'cyan', desc: 'Face recognition kiosk. Inference runs locally via WASM. No cloud.', tags: ['TensorFlow.js', 'WASM', 'Node.js'] }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: '60px 40px', height: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}
        >
            <div style={{ fontSize: '12px', color: 'var(--gray)', letterSpacing: '4px', marginBottom: '40px' }}>SECTOR 4 // CONTAINMENT</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {projects.map((p, i) => (
                    <Specimen key={i} {...p} onEngage={setActiveEncounter} />
                ))}
            </div>

            <AnimatePresence>
                {activeEncounter && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        style={{
                            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <div className="flicker-text" style={{ fontSize: '24px', color: `var(--${activeEncounter.colorClass})`, marginBottom: '40px' }}>
                            ENGAGING SPECIMEN: {activeEncounter.title}...
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button className="battle-btn" onClick={() => { playSound('select'); setActiveEncounter(null); }}>⚔ FIGHT (GITHUB)</button>
                            <button className="battle-btn" onClick={() => { playSound('select'); setActiveEncounter(null); }}>💬 ACT (DETAILS)</button>
                            <button className="battle-btn" style={{ borderColor: 'var(--blue)' }} onClick={() => { playSound('select'); setActiveEncounter(null); }}>🤍 MERCY (FLEE)</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Room4Projects;
