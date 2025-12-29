import { useState, useEffect } from 'react';

interface RedstoneTextProps {
  children: string;
  isHovered: boolean;
}

export function RedstoneText({ children, isHovered }: RedstoneTextProps) {
  const words = children.split(' ');
  const [litWords, setLitWords] = useState<number>(0);
  const [isLightingUp, setIsLightingUp] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && !isLightingUp) {
      // Start lighting up words
      setIsLightingUp(true);
      interval = setInterval(() => {
        setLitWords((prev) => {
          if (prev >= words.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 150); // Light up one word every 150ms
    } else if (!isHovered && isLightingUp) {
      // Start fading out words
      interval = setInterval(() => {
        setLitWords((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setIsLightingUp(false);
            return 0;
          }
          return prev - 1;
        });
      }, 150); // Fade out one word every 150ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, isLightingUp, words.length]);

  return (
    <p className="text-muted-foreground">
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            index < litWords ? 'redstone-lit' : 'redstone-off'
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
