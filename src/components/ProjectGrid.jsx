import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, Terminal, Code2 } from 'lucide-react';

const ProjectCard = ({ title, desc, tags, type, icon: Icon, color, link }) => (
    <motion.div
        whileHover={{ x: 5, y: 5 }}
        className="project-card px-border"
        data-type={type}
        style={{
            backgroundColor: 'black',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '280px',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontSize: '7px',
            padding: '4px 8px',
            border: `2px solid ${color}`,
            color: color
        }}>
            {type}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: color }}>
            <Icon size={24} />
            <h3 className="project-title" style={{ fontSize: '12px', color: 'var(--white)' }}>{title}</h3>
        </div>

        <p style={{ fontSize: '9px', color: 'var(--gray)', lineHeight: '1.6', flex: 1 }}>{desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map(tag => (
                <span key={tag} style={{
                    fontSize: '7px',
                    color: 'var(--green)',
                    border: '1px solid var(--green)',
                    padding: '3px 7px'
                }}>
                    {tag}
                </span>
            ))}
        </div>

        <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{
                display: 'inline-block',
                marginTop: '14px',
                fontSize: '8px',
                color: 'var(--white)',
                textDecoration: 'none',
                border: '2px solid var(--white)',
                padding: '6px 12px',
                textAlign: 'center'
            }}
        >
            VIEW PROJECT →
        </a>
        <style>{`
      .project-card:hover {
        box-shadow: none !important;
        border-color: var(--yellow) !important;
      }
      .project-card:hover .project-title {
        color: var(--yellow) !important;
      }
      .project-link:hover {
        background-color: var(--white);
        color: var(--black) !important;
      }
    `}</style>
    </motion.div>
);

const ProjectGrid = () => {
    const projects = [
        {
            title: 'PhishGuard',
            desc: 'Built a Chrome extension to detect phishing websites using rule-based and NLP techniques. Improved detection through iterative testing.',
            tags: ['JS', 'NLP', 'Chrome API'],
            type: 'SECURITY',
            icon: Globe,
            color: 'var(--soul)',
            link: '#'
        },
        {
            title: 'Servify',
            desc: 'Created a platform to compare service centers. Designed booking flow and improved UI based on feedback.',
            tags: ['React', 'Firebase', 'Tailwind'],
            type: 'FULLSTACK',
            icon: ShoppingBag,
            color: 'var(--green)',
            link: '#'
        },
        {
            title: 'LendAI',
            desc: 'Developed a loan risk scoring system. Implemented validation and structured backend logic for real-time processing.',
            tags: ['Python', 'AI', 'Analytics'],
            type: 'AI/ML',
            icon: Terminal,
            color: 'var(--blue)',
            link: '#'
        },
        {
            title: 'G-Chat',
            desc: 'Built a real-time chat app using Firebase. Integrated AI for automatic summary generation of long conversations.',
            tags: ['Firebase', 'React', 'OpenAI'],
            type: 'REALTIME',
            icon: Code2,
            color: 'var(--yellow)',
            link: '#'
        }
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '40px'
        }}>
            {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>
    );
};

export default ProjectGrid;
