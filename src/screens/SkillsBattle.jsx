import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/SoundManager';

const SkillsBattle = ({ onNavigate }) => {
    const skillCategories = [
        { name: 'PROGRAMMING', skills: ['Java', 'C++', 'Python', 'JS', 'C#'], hp: 90, color: '#f7df1e' },
        { name: 'TOOLS', skills: ['Node.js', 'Firebase', 'Android Studio', 'Unity', 'Git'], hp: 85, color: '#68a063' },
        { name: 'CONCEPTS', skills: ['OOP', 'Data Structures', 'API Integration', 'Security'], hp: 80, color: '#61dafb' },
    ];

    const menuOptions = ['FIGHT', 'ACT', 'ITEM', 'MERCY'];
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleMenuHover = (index) => {
        if (selectedMenu !== index) {
            setSelectedMenu(index);
            playSound('hover');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px', boxSizing: 'border-box' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', border: '4px solid white', padding: '20px', backgroundColor: 'black', overflowY: 'auto' }}>
                <p style={{ color: 'white', marginBottom: '10px' }}>* Maria's skills are displayed as HP bars.</p>

                {skillCategories.map((cat, index) => (
                    <div
                        key={cat.name}
                        onMouseEnter={() => setSelectedCategory(cat)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', border: selectedCategory?.name === cat.name ? '2px dotted white' : '2px solid transparent' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ width: '150px', fontSize: '1rem' }}>{cat.name}</span>
                            <div style={{ flex: 1, height: '20px', border: '2px solid white', backgroundColor: '#333' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${cat.hp}%` }}
                                    style={{ height: '100%', backgroundColor: cat.color }}
                                />
                            </div>
                            <span style={{ width: '50px' }}>{cat.hp}%</span>
                        </div>
                        {selectedCategory?.name === cat.name && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginLeft: '170px' }}>
                                {cat.skills.map(s => (
                                    <span key={s} style={{ fontSize: '0.7rem', color: '#aaa' }}>[{s}]</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', gap: '20px' }}>
                {menuOptions.map((option, index) => (
                    <motion.div
                        key={option}
                        onMouseEnter={() => handleMenuHover(index)}
                        onClick={() => {
                            playSound('select');
                            if (option === 'MERCY') onNavigate('menu');
                        }}
                        className="pixel-border"
                        style={{
                            flex: 1,
                            padding: '15px',
                            textAlign: 'center',
                            backgroundColor: 'black',
                            color: selectedMenu === index ? '#ffff00' : '#ff8000',
                            borderColor: selectedMenu === index ? '#ffff00' : '#ff8000',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        {selectedMenu === index && (
                            <svg viewBox="0 0 32 32" style={{ width: '20px', height: '20px', color: '#ff0000' }}>
                                <path fill="currentColor" d="M16,28.221l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.57c0-3.13,2.46-5.59,5.59-5.59c1.76,0,3.46,0.82,4.41,2.1
                  c0.95-1.28,2.65-2.1,4.41-2.1c3.13,0,5.59,2.46,5.59,5.59c0,3.82-3.4,6.9-8.55,11.58L16,28.221z" />
                            </svg>
                        )}
                        {option}
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span>JESIN</span>
                <span>LV 19</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>HP</span>
                    <div style={{ width: '100px', height: '15px', backgroundColor: 'red' }}>
                        <div style={{ width: '80%', height: '100%', backgroundColor: 'yellow' }} />
                    </div>
                    <span>72/92</span>
                </div>
            </div>
        </div>
    );
};

export default SkillsBattle;
