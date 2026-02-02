"use client";

import { useEffect, useRef } from "react";

interface Shape {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    type: "circle" | "triangle" | "square" | "hexagon" | "diamond" | "cross" | "ring";
    opacity: number;
    color: string;
    pulsePhase: number;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapesRef = useRef<Shape[]>([]);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Gaming theme colors
        const colors = [
            "rgba(176, 38, 255, 0.4)",   // Purple
            "rgba(255, 0, 127, 0.35)",   // Magenta
            "rgba(0, 242, 255, 0.4)",    // Cyan
            "rgba(176, 38, 255, 0.25)",  // Light Purple
            "rgba(0, 242, 255, 0.25)",   // Light Cyan
        ];

        const shapeTypes: Shape["type"][] = ["circle", "triangle", "square", "hexagon", "diamond", "cross", "ring"];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createShapes = () => {
            // Adjust count based on screen size for performance
            const shapeCount = Math.min(30, Math.max(15, Math.floor(window.innerWidth / 50)));
            shapesRef.current = [];

            for (let i = 0; i < shapeCount; i++) {
                shapesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 35 + 15,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.008,
                    type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
                    opacity: Math.random() * 0.4 + 0.2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    pulsePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        const drawShape = (shape: Shape, time: number) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);

            // Pulsing effect
            const pulse = Math.sin(time * 0.001 + shape.pulsePhase) * 0.2 + 0.8;
            ctx.globalAlpha = shape.opacity * pulse;

            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 1.5;
            ctx.fillStyle = shape.color.replace(/[\d.]+\)$/, "0.08)");

            const size = shape.size;

            switch (shape.type) {
                case "circle":
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fill();
                    break;

                case "ring":
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
                    ctx.stroke();
                    break;

                case "triangle":
                    ctx.beginPath();
                    ctx.moveTo(0, -size / 2);
                    ctx.lineTo(size / 2, size / 2);
                    ctx.lineTo(-size / 2, size / 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                    break;

                case "square":
                    ctx.beginPath();
                    ctx.rect(-size / 2, -size / 2, size, size);
                    ctx.stroke();
                    ctx.fill();
                    break;

                case "hexagon":
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i - Math.PI / 6;
                        const x = (size / 2) * Math.cos(angle);
                        const y = (size / 2) * Math.sin(angle);
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                    break;

                case "diamond":
                    ctx.beginPath();
                    ctx.moveTo(0, -size / 2);
                    ctx.lineTo(size / 2, 0);
                    ctx.lineTo(0, size / 2);
                    ctx.lineTo(-size / 2, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                    break;

                case "cross":
                    const thickness = size / 4;
                    ctx.beginPath();
                    // Vertical bar
                    ctx.rect(-thickness / 2, -size / 2, thickness, size);
                    // Horizontal bar
                    ctx.rect(-size / 2, -thickness / 2, size, thickness);
                    ctx.stroke();
                    ctx.fill();
                    break;
            }

            ctx.restore();
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Subtle mouse parallax
            const mouseInfluenceX = (mouseRef.current.x / canvas.width - 0.5) * 30;
            const mouseInfluenceY = (mouseRef.current.y / canvas.height - 0.5) * 30;

            shapesRef.current.forEach((shape, index) => {
                // Update position with slight mouse influence
                const parallax = (index % 3 + 1) * 0.3;
                shape.x += shape.speedX + mouseInfluenceX * 0.002 * parallax;
                shape.y += shape.speedY + mouseInfluenceY * 0.002 * parallax;
                shape.rotation += shape.rotationSpeed;

                // Wrap around edges smoothly
                if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
                if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

                drawShape(shape, time);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        resizeCanvas();
        createShapes();
        animationRef.current = requestAnimationFrame(animate);
        window.addEventListener("resize", () => {
            resizeCanvas();
            createShapes();
        });
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none gpu-accelerated"
            style={{ background: "transparent" }}
        />
    );
};

export default AnimatedBackground;
