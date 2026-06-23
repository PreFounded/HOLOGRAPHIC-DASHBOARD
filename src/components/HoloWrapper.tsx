import { ReactNode, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./ThemeContext";

type ColorTheme = "cyan" | "green" | "purple" | "amber" | "white" | "red" | "orange" | "rgb";

export function HoloWrapper({ children, className, theme: propTheme, delay = 0, noBg = false }: { children: ReactNode; className?: string, theme?: ColorTheme, delay?: number, noBg?: boolean }) {
  const { theme: contextTheme } = useTheme();
  // If in RGB mode (from context), override widget's default theme
  const theme = contextTheme === 'rgb' ? 'rgb' : (propTheme || contextTheme);
  const divRef = useRef<HTMLDivElement>(null);
  
  const themeClasses = {
    cyan: "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
    green: "border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]",
    purple: "border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.2)]",
    amber: "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]",
    white: "border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    red: "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    orange: "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]",
    rgb: "border-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.4)]",
  };

  const bgClasses = {
    cyan: "bg-black",
    green: "bg-black",
    purple: "bg-black",
    amber: "bg-black",
    white: "bg-black",
    red: "bg-black",
    orange: "bg-black",
    rgb: "bg-black",
  };

  // RGB animation effect - cycles through rainbow colors
  useEffect(() => {
    if (theme !== "rgb" || !divRef.current) return;
    
    const el = divRef.current;
    let hue = 0;
    let animationId: number;
    
    // Each widget starts at a different hue for rainbow effect
    const baseHue = Math.random() * 360;
    
    const animate = () => {
      hue = (hue + 1.5) % 360;
      const currentHue = (baseHue + hue) % 360;
      const color = `hsl(${currentHue}, 100%, 60%)`;
      const shadowColor = `hsla(${currentHue}, 100%, 60%, 0.5)`;
      
      el.style.borderColor = color;
      el.style.boxShadow = `0 0 30px ${shadowColor}, inset 0 0 20px ${shadowColor}`;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <div 
      ref={divRef}
      className={twMerge(
        "relative rounded-[1.5rem] w-full h-full flex flex-col overflow-hidden border-4",
        themeClasses[theme],
        noBg ? "bg-transparent" : bgClasses[theme],
        "backdrop-blur-md p-5 lg:p-6 animate-[holo-breath_8s_ease-in-out_infinite]",
        className
      )}
    >
      {children}
    </div>
  );
}
