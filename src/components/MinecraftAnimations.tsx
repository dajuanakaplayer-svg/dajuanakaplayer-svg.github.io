import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  type: "smoke" | "spark" | "block";
}

export function FloatingTNT() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: 50,
        y: 80,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2,
        life: 1,
        type: "smoke",
      };
      setParticles((prev) => [...prev, newParticle].slice(-20));
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-16 h-16 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TNT Block */}
      <div
        className={`w-full h-full bg-red-600 border-4 border-red-800 rounded-sm transition-all duration-300 ${
          isHovered ? "animate-bounce scale-110" : "animate-float"
        }`}
        style={{
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
          TNT
        </div>
        {/* Fuse */}
        <div
          className={`absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-800 ${
            isHovered ? "animate-pulse" : ""
          }`}
        >
          {isHovered && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          )}
        </div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-gray-400 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.life,
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedCreeper() {
  const [isHovered, setIsHovered] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
    setTimeout(() => {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        setIsHovered(false);
      }, 500);
    }, 1500);
  };

  return (
    <div
      className="relative w-16 h-20 cursor-pointer"
      onMouseEnter={handleHover}
    >
      {/* Creeper Body */}
      <div
        className={`w-full h-full bg-green-600 border-4 border-green-800 rounded-sm transition-all duration-300 ${
          isHovered ? "scale-110 animate-pulse" : "animate-float-slow"
        } ${isExploding ? "scale-150 opacity-0" : ""}`}
        style={{
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        {/* Creeper Face */}
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
          {/* Eyes */}
          <div className="flex gap-2">
            <div className="w-2 h-3 bg-black" />
            <div className="w-2 h-3 bg-black" />
          </div>
          {/* Mouth */}
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-black" />
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-black" />
              <div className="w-2 h-2 bg-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Explosion Effect */}
      {isExploding && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-orange-500 rounded-full animate-ping opacity-75" />
          <div className="absolute w-16 h-16 bg-yellow-400 rounded-full animate-ping" />
        </div>
      )}

      {/* Hiss Text */}
      {isHovered && !isExploding && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 animate-bounce">
          Ssss...
        </div>
      )}
    </div>
  );
}

export function FloatingBlocks() {
  const blocks = [
    { type: "grass", color: "from-green-600 to-green-700", delay: "0s" },
    { type: "dirt", color: "from-amber-700 to-amber-800", delay: "0.5s" },
    { type: "stone", color: "from-gray-500 to-gray-600", delay: "1s" },
    { type: "diamond", color: "from-cyan-400 to-cyan-600", delay: "1.5s" },
  ];

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`w-12 h-12 bg-gradient-to-br ${block.color} border-2 border-black/30 rounded-sm cursor-pointer hover:scale-110 transition-transform`}
          style={{
            animation: `float 3s ease-in-out infinite`,
            animationDelay: block.delay,
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
          }}
        />
      ))}
    </div>
  );
}

export function BackgroundParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const createParticle = () => {
      return {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
      };
    };

    // Initial particles
    setParticles(Array.from({ length: 20 }, createParticle));

    // Add new particles periodically
    const interval = setInterval(() => {
      setParticles((prev) => {
        if (prev.length < 30) {
          return [...prev, createParticle()];
        }
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-white/10 rounded-sm"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `fall ${particle.duration}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}
