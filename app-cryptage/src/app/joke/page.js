'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Joke() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === 'y') {
      router.push('/success');
    } else if (event.key.toLowerCase() === 'n') {
      router.push('/exit');
    }
  };

  // Gestionnaire tactile pour les appareils mobiles
  const handleTouch = (option) => {
    if (option === 'yes') {
      router.push('/success');
    } else {
      router.push('/exit');
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    // Initial dimensions
    updateDimensions();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function setCanvasSize() {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    setCanvasSize();

    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split('');
    // Ajuster la taille de la police en fonction de la largeur de l'écran
    const fontSize = Math.max(10, Math.min(14, window.innerWidth / 50));
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
      updateDimensions();
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

  // Adapter la taille du texte ASCII en fonction de la largeur de l'écran
  const getASCIIArtSize = () => {
    if (dimensions.width < 640) { // mobile
      return 'text-[8px]';
    } else if (dimensions.width < 768) { // tablet
      return 'text-xs';
    } else {
      return 'text-sm';
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono text-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ opacity: 0.2 }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="border border-green-500 p-4 md:p-8 lg:p-12 w-full max-w-2xl text-center bg-black bg-opacity-90">
          <p className="mb-4 md:mb-8 text-green-400 animate-pulse text-base md:text-xl">
            Are you sure you want to continue?
          </p>
          <pre className={`text-green-400 leading-tight select-none ${getASCIIArtSize()} font-bold whitespace-pre-wrap`}>
{`:'######:::::'###::::'########::'########:'########::
'##... ##:::'## ##::: ##.... ##: ##.....:: ##.... ##:
 ##:::..:::'##:. ##:: ##:::: ##: ##::::::: ##:::: ##:
. ######::'##:::. ##: ########:: ######::: ########::
:..... ##: #########: ##.... ##: ##...:::: ##.. ##:::
'##::: ##: ##.... ##: ##:::: ##: ##::::::: ##::. ##::
. ######:: ##:::: ##: ########:: ########: ##:::. ##:
:......:::..:::::..::........:::........::..:::::..::
`}</pre>
          <h1 className="mt-6 md:mt-12 mb-4 md:mb-8 text-xl md:text-3xl font-bold text-green-500 tracking-[0.3em] md:tracking-[0.5em] animate-glow">
            Select option
          </h1>
          <div className="mt-4 md:mt-8 space-y-4">
            {/* Boutons tactiles pour mobile */}
            <div className="md:hidden flex justify-center space-x-4">
              <button
                onClick={() => handleTouch('yes')}
                className="border border-green-500 px-6 py-2 text-green-300 hover:bg-green-500 hover:text-black transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => handleTouch('no')}
                className="border border-green-500 px-6 py-2 text-green-300 hover:bg-green-500 hover:text-black transition-colors"
              >
                No
              </button>
            </div>
            {/* Instructions clavier pour desktop */}
            <div className="hidden md:block space-y-2">
              <p className="text-green-400">
                Press <span className="text-green-300 border border-green-500 px-2">[Y]</span> to proceed
              </p>
              <p className="text-green-400">
                Press <span className="text-green-300 border border-green-500 px-2">[N]</span> to exit
              </p>
            </div>
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