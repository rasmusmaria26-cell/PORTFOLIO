import { Howl } from 'howler';

// Using placeholder URLs for sounds - in a real project these would be local assets
const sounds = {
    select: new Howl({ src: ['https://www.soundjay.com/buttons/button-09.mp3'], volume: 0.5 }),
    hover: new Howl({ src: ['https://www.soundjay.com/buttons/button-11.mp3'], volume: 0.3 }),
    text: new Howl({ src: ['https://www.soundjay.com/communication/typewriter-key-1.mp3'], volume: 0.2, rate: 1.5 }),
    save: new Howl({ src: ['https://www.soundjay.com/buttons/button-3.mp3'], volume: 0.6 }),
};

export const playSound = (name) => {
    if (sounds[name]) {
        sounds[name].play();
    }
};

let bgm = null;

export const playBGM = (url) => {
    if (bgm) bgm.stop();
    bgm = new Howl({
        src: [url],
        loop: true,
        volume: 0.3,
    });
    bgm.play();
};

export const stopBGM = () => {
    if (bgm) bgm.stop();
};
