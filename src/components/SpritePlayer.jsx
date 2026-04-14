import React from 'react';
import { motion } from 'framer-motion';
import spriteImg from '../assets/sprite.png';

const SpritePlayer = ({ size = 120, frameX = 0, frameY = 0, animate = true }) => {
    // Sprite sheet info: 6 columns, 4 rows
    // To avoid the confusion of CSS percentages, we use negative pixel offsets.
    // We scale the background-size to exactly 6x by 4x the container size.

    const posX = -(frameX * size);
    const posY = -(frameY * size);

    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto',
            imageRendering: 'pixelated'
        }}>
            <motion.div
                animate={animate ? {
                    y: [0, -4, 0], // Idle bobbing
                } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut'
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${spriteImg})`,
                    // We force the background image to be a grid of perfect squares based on the size prop
                    backgroundSize: `${size * 6}px ${size * 4}px`,
                    backgroundPosition: `${posX}px ${posY}px`,
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
        </div>
    );
};

export default SpritePlayer;
