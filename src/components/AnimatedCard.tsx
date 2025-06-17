
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const AnimatedCard = ({ children, className = '', glowColor = 'primary' }: AnimatedCardProps) => {
  const cardRef = useGSAPAnimations();

  const getGlowClass = () => {
    switch (glowColor) {
      case 'primary':
        return 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:border-primary/50';
      case 'secondary':
        return 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-500/50';
      case 'accent':
        return 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-blue-500/50';
      default:
        return 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:border-primary/50';
    }
  };

  return (
    <Card 
      ref={cardRef as any}
      className={`
        transition-all duration-300 ease-out
        transform hover:-translate-y-2
        ${getGlowClass()}
        backdrop-blur-sm bg-card/80
        border border-border/50
        ${className}
      `}
    >
      {children}
    </Card>
  );
};
