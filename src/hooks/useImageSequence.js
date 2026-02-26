import { useRef, useEffect } from 'react';

const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const useImageSequence = ({
    frameCount,
    imagePrefix,
    imageSuffix,
    fps = 30,
    startIndex = 0,
    loop = true,
    zoomFrames = 15,    // how many frames from the end to start zooming
    zoomAmount = 0.08, // total zoom (0.06 = 6%)
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const imagesRef = useRef([]);
    const frameIndexRef = useRef(startIndex);
    const zoomStartTimeRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const loadImages = () => {
            const promises = [];
            for (let i = 0; i < frameCount; i++) {
                const indexStr = i.toString().padStart(3, '0');
                const img = new Image();
                img.src = `${imagePrefix}${indexStr}${imageSuffix}`;
                promises.push(new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                }));
                imagesRef.current[i] = img;
            }
            return Promise.all(promises);
        };

        const handleResize = () => {
            if (!canvas.parentElement) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            canvas._logicalWidth = rect.width;
            canvas._logicalHeight = rect.height;
        };

        const draw = (img, zoom) => {
            const logicalWidth = canvas._logicalWidth || canvas.width;
            const logicalHeight = canvas._logicalHeight || canvas.height;
            const hRatio = logicalWidth / img.width;
            const vRatio = logicalHeight / img.height;
            const ratio = Math.max(hRatio, vRatio) * zoom;
            const x = (logicalWidth - img.width * ratio) / 2;
            const y = (logicalHeight - img.height * ratio) / 2;
            ctx.clearRect(0, 0, logicalWidth, logicalHeight);
            ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
        };

        const interval = 1000 / fps;
        const zoomStartFrame = frameCount - zoomFrames;
        const zoomDuration = (zoomFrames / fps) * 1000; // total ms the zoom plays over

        let lastFrameTime = 0;

        const render = (time) => {
            const frameIndex = frameIndexRef.current;
            const isAtEnd = frameIndex >= frameCount - 1;

            // ── Zoom: only active during last N frames, stops at last frame ────────
            let zoomFactor = 1.0;

            if (frameIndex >= zoomStartFrame) {
                if (zoomStartTimeRef.current === null) {
                    zoomStartTimeRef.current = time;
                }
                const elapsed = time - zoomStartTimeRef.current;
                const t = Math.min(elapsed / zoomDuration, 1);
                zoomFactor = 1.0 + easeInOutCubic(t) * zoomAmount;
            }

            // ── Advance frame at target fps ────────────────────────────────────────
            if (time - lastFrameTime > interval) {
                const img = imagesRef.current[frameIndex];
                if (img?.complete) draw(img, zoomFactor);

                if (!isAtEnd) {
                    frameIndexRef.current = frameIndex + 1;
                } else if (loop) {
                    frameIndexRef.current = startIndex;
                    zoomStartTimeRef.current = null; // reset zoom for next loop
                }
                lastFrameTime = time;
            } else {
                // Between ticks — still redraw with latest zoom value for smoothness
                const img = imagesRef.current[frameIndex];
                if (img?.complete) draw(img, zoomFactor);
            }

            if (!isAtEnd || loop) {
                requestRef.current = requestAnimationFrame(render);
            }
        };

        loadImages().then(() => {
            frameIndexRef.current = startIndex;
            zoomStartTimeRef.current = null;
            requestRef.current = requestAnimationFrame(render);
        });

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [frameCount, imagePrefix, imageSuffix, fps, loop, startIndex, zoomFrames, zoomAmount]);

    return canvasRef;
};