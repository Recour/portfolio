import { useRef, useEffect, useState } from 'react';
import styles from '../page.module.css'

const Spotlight = ({ children, className }) => {
  const backgroundRef = useRef()

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!backgroundRef.current) return;
  
      const rect = backgroundRef.current.getBoundingClientRect();
  
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
  
    const handleMouseEnter = () => {
      setOpacity(1);
    };
  
    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const backgroundRefCurrent = backgroundRef.current;

    backgroundRefCurrent.addEventListener('mousemove', handleMouseMove);
    backgroundRefCurrent.addEventListener('mouseenter', handleMouseEnter);
    backgroundRefCurrent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      backgroundRefCurrent.removeEventListener('mousemove', handleMouseMove);
      backgroundRefCurrent.removeEventListener('mouseenter', handleMouseEnter);
      backgroundRefCurrent.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [])

  return (
    <div
      ref={backgroundRef}
      className={className}
    >
      <div
        className="pointer-events-none lg:absolute -inset-px opacity-0 transition-all"
        style={{
          opacity,
          background: `radial-gradient(1500px circle at ${position.x}px ${position.y}px, rgba(0,0,255,.1), transparent 40%)`,
        }}
      />

      {children}
    </div>
  )
}

export default Spotlight;