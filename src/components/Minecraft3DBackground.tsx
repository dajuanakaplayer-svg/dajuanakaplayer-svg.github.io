import { useEffect, useRef } from 'react';

interface Block {
  x: number;
  y: number;
  z: number;
  type: 'grass' | 'stone' | 'dirt' | 'oak' | 'diamond' | 'emerald' | 'iron' | 'gold' | 'coal' | 'redstone';
  rotation: number;
  rotationSpeed: number;
  speed: number;
}

const blockColors = {
  // Top, Left, Right faces for 3D effect
  grass: { top: '#7cbd6b', left: '#5a9c4d', right: '#4a8c3d', glow: false },
  stone: { top: '#7f7f7f', left: '#6a6a6a', right: '#555555', glow: false },
  dirt: { top: '#8b6f47', left: '#7a5f3a', right: '#6a4f2a', glow: false },
  oak: { top: '#9c7f4f', left: '#8a6f3f', right: '#7a5f2f', glow: false },
  diamond: { top: '#5decf5', left: '#4dccdd', right: '#3dbccd', glow: true },
  emerald: { top: '#50c878', left: '#40b868', right: '#30a858', glow: true },
  iron: { top: '#d8d8d8', left: '#c8c8c8', right: '#b8b8b8', glow: false },
  gold: { top: '#ffdf00', left: '#efcf00', right: '#dfbf00', glow: true },
  coal: { top: '#2a2a2a', left: '#1a1a1a', right: '#0a0a0a', glow: false },
  redstone: { top: '#ff0000', left: '#ef0000', right: '#df0000', glow: true },
};

export function Minecraft3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocksRef = useRef<Block[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize blocks with variety
    const blockTypes: Block['type'][] = [
      'grass', 'grass', 'grass', // More common blocks
      'stone', 'stone', 'stone',
      'dirt', 'dirt',
      'oak', 'oak',
      'diamond', 'emerald', 'iron', 'gold', 'coal', 'redstone', // Rare ores
    ];

    for (let i = 0; i < 40; i++) {
      blocksRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speed: 0.2 + Math.random() * 0.5,
      });
    }

    // Sort blocks by z-index for proper depth
    blocksRef.current.sort((a, b) => b.z - a.z);

    // Mouse move handler for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Draw isometric block with textures
    const drawBlock = (block: Block) => {
      const scale = 1 - block.z / 1000;
      const size = 30 * scale;
      
      // Parallax effect
      const parallaxX = mouseRef.current.x * (block.z / 10);
      const parallaxY = mouseRef.current.y * (block.z / 10);
      
      const x = block.x + parallaxX;
      const y = block.y + parallaxY;

      const colors = blockColors[block.type];
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(block.rotation);

      // Isometric projection
      const isoX = size * 0.866; // cos(30°) * size
      const isoY = size * 0.5;   // sin(30°) * size

      // Top face (lighter)
      ctx.beginPath();
      ctx.moveTo(0, -isoY);
      ctx.lineTo(isoX, 0);
      ctx.lineTo(0, isoY);
      ctx.lineTo(-isoX, 0);
      ctx.closePath();
      ctx.fillStyle = colors.top;
      ctx.fill();
      
      // Add texture detail to top
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(
              -isoX / 2 + (i * isoX / 3),
              -isoY / 2 + (j * isoY / 3),
              isoX / 3,
              isoY / 3
            );
          }
        }
      }

      // Left face (darker)
      ctx.beginPath();
      ctx.moveTo(-isoX, 0);
      ctx.lineTo(0, isoY);
      ctx.lineTo(0, isoY + size);
      ctx.lineTo(-isoX, size);
      ctx.closePath();
      ctx.fillStyle = colors.left;
      ctx.fill();

      // Right face (darkest)
      ctx.beginPath();
      ctx.moveTo(isoX, 0);
      ctx.lineTo(0, isoY);
      ctx.lineTo(0, isoY + size);
      ctx.lineTo(isoX, size);
      ctx.closePath();
      ctx.fillStyle = colors.right;
      ctx.fill();

      // Glow effect for ores
      if (colors.glow) {
        ctx.shadowBlur = 20 * scale;
        ctx.shadowColor = colors.top;
        ctx.strokeStyle = colors.top;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Ambient occlusion (subtle shadow)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(-isoX, isoY + size, isoX * 2, 2);

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blocks
      blocksRef.current.forEach((block) => {
        // Move blocks downward
        block.y += block.speed;
        block.rotation += block.rotationSpeed;

        // Reset position when off screen
        if (block.y > canvas.height + 100) {
          block.y = -100;
          block.x = Math.random() * canvas.width;
        }

        drawBlock(block);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
