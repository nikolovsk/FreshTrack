import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface Props {
    animationData: object;
    className?: string;
    speed?: number;
}

function GroceriesAnimation({ animationData, className, speed=1 }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const anim = lottie.loadAnimation({
            container: ref.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData,
        });

        anim.setSpeed(speed);

        return () => anim.destroy();
    }, [animationData, speed]);

    return <div ref={ref} className={className} />;
}

export default GroceriesAnimation;