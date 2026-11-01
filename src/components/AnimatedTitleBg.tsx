import { useEffect, useState } from "react";
import sheet from "@/assets/intro/title-sheet.jpg";

// 50 quadros (10×5) gerados por IA numa única imagem. A ordem segue o brilho da Árvore,
// tocada em vai-e-volta para a luz crescer e diminuir num ciclo suave.
const COLS = 10, ROWS = 5;
const ORDER = [20, 41, 21, 49, 40, 29, 30, 46, 42, 31, 45, 10, 43, 38, 0, 1, 2, 39, 48, 28, 36, 37, 11, 22, 27, 18, 32, 19, 26, 12, 8, 13, 47, 6, 23, 3, 16, 35, 9, 17, 7, 4, 33, 5, 25, 15, 44, 14, 24, 34];
const LOOP = [...ORDER, ...ORDER.slice(1, -1).reverse()];
const FPS = 10;

export function AnimatedTitleBg({ className }: { className?: string }) {
  const [f, setF] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setF((x) => (x + 1) % LOOP.length), 1000 / FPS);
    return () => window.clearInterval(id);
  }, []);
  const i = LOOP[f]!;
  const c = i % COLS, r = Math.floor(i / COLS);
  return (
    <div
      className={className}
      role="img"
      aria-label="A Árvore de Mana brilhando ao pôr do sol, com o herói do arco dourado no penhasco"
      style={{
        backgroundImage: `url(${sheet})`,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
