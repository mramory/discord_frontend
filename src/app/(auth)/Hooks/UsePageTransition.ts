import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const ANIMATION_DURATION = 100;

const setInitialStyles = (container: HTMLDivElement) => {
    container.style.opacity = '0';
    container.style.transform = "scale(0.9) translateY(-100px) translateZ(100px)";
}

const setFinalStyles = (container: HTMLDivElement) => {
    container.style.opacity = '1';
    container.style.transform = "scale(1) translateY(0) translateZ(0)";
}

const usePageTransition = () => {
    const router = useRouter();

    const containerRef = useRef<HTMLDivElement>(null);

    const goTo = (path: string) => {
      const container = containerRef.current;

      if (container) {
        setInitialStyles(container);
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(router.push(path));
        }, ANIMATION_DURATION);
      });
    };

    useLayoutEffect(() => {
        const container = containerRef.current;

        if (container) {
            setInitialStyles(container);

            requestAnimationFrame(() => {
                setFinalStyles(container);
            });
        }

        return () => {
            if (container) {
                setInitialStyles(container);
            }
        };
    }, [router]);

    return { goTo, containerRef };
}

export { usePageTransition };
