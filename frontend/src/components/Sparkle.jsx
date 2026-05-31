import { useEffect } from 'react'

function Sparkle() {
    useEffect(() => {
        const sparkles = Array.from({ length: 30 }, () => {
            const span = document.createElement('span')
            span.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        border-radius: 50%;
        background: ${['#ffffff', '#e8e8e8', '#c0c0c0', '#a8a8a8'][Math.floor(Math.random() * 4)]};
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: sparkle ${Math.random() * 3 + 1}s infinite;
        animation-delay: ${Math.random() * 3}s;
        pointer-events: none;
        z-index: 0;
      `
            document.body.appendChild(span);
            return span;
        })
        return () => sparkles.forEach(s => s.remove());
    }, []);

    return null;
}

export default Sparkle;