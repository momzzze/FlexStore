// hooks/useDashboardAnimations.ts
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export const useDashboardAnimations = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const setCardRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      gsap.from('.animate-card', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.4,
        ease: 'power3.out',
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return setCardRef;
};
