'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Joke() {
  const router = useRouter();
  const canvasRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === 'y') {
      router.push('/success');
    } else if (event.key.toLowerCase() === 'n') {
      router.push('/exit');
    }
  };
 // petite animation sympa de fond style matrix
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function setCanvasSize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    setCanvasSize();

    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split('');
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      setCanvasSize();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono text-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ opacity: 0.2 }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="border border-green-500 p-12 max-w-2xl text-center bg-black bg-opacity-90">
          <p className="mb-8 text-green-400 animate-pulse text-xl">Are you sure you want to continue?</p>
          <pre className="text-green-400 leading-tight select-none text-sm md:text-base font-bold">
{`:'######:::::'###::::'########::'########:'########::
'##... ##:::'## ##::: ##.... ##: ##.....:: ##.... ##:
 ##:::..:::'##:. ##:: ##:::: ##: ##::::::: ##:::: ##:
. ######::'##:::. ##: ########:: ######::: ########::
:..... ##: #########: ##.... ##: ##...:::: ##.. ##:::
'##::: ##: ##.... ##: ##:::: ##: ##::::::: ##::. ##::
. ######:: ##:::: ##: ########:: ########: ##:::. ##:
:......:::..:::::..::........:::........::..:::::..::
`}</pre>
          <h1 className="mt-12 mb-8 text-3xl font-bold text-green-500 tracking-[0.5em] animate-glow">
            Select option
          </h1>
          <div className="mt-8 space-y-2">
            <p className="text-green-400">
              Press <span className="text-green-300 border border-green-500 px-2">[Y]</span> to proceed
            </p>
            <p className="text-green-400">
              Press <span className="text-green-300 border border-green-500 px-2">[N]</span> to exit
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
          50% { text-shadow: 0 0 20px rgba(74, 222, 128, 0.8); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}