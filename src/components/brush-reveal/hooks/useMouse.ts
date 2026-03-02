import { useState, useEffect } from 'react';

export default function useMouse() {
    const [mouse, setMouse] = useState({ x: 0, y: 0, pixelRatio: 0 });

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMouse({
                x: e.clientX,
                y: e.clientY,
                pixelRatio: Math.min(window.devicePixelRatio, 2),
            });
        };

        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, []);

    return mouse;
}
