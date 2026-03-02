import { useState, useEffect } from 'react';

export default function useDimension() {
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
        pixelRatio: 1,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const resize = () => {
                setDimension({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    pixelRatio: Math.min(window.devicePixelRatio, 2),
                });
            };

            resize();
            window.addEventListener('resize', resize);
            return () => window.removeEventListener('resize', resize);
        }
    }, []);

    return dimension;
}
