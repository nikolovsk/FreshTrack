import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import groceriesAnimation from "../assets/groceries.json";

export default function GroceriesAnimation({ className }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const anim = lottie.loadAnimation({
            container: ref.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: groceriesAnimation,
        });

        return () => anim.destroy();
    }, []);

    return <div ref={ref} className={className} />;
}