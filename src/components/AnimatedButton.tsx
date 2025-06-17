
import { ReactNode, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = "default", 
  size = "default",
  className = '' 
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleClick = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      onClick={onClick}
      className={`
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-primary/25
        ${className}
      `}
    >
      {children}
    </Button>
  );
};
