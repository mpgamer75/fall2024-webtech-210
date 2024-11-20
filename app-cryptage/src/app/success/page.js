'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const timerRef = useRef(null);
  const messageIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  // Gestion des dimensions de l'écran
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation Matrix
  useEffect(() => {
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
      setCanvasSize();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation de texte
  useEffect(() => {
    const messages = [
      "> INITIALIZING HACK.EXE ...",
      "> CONNEXION ÉTABLIE ...",
      "> SCAN EN COURS ...",
      "> RÉCUPÉRATION DES DONNÉES ...",
      "> ANALYSE TERMINÉE"
    ];

    const typeWriter = () => {
      const currentMessage = messages[messageIndexRef.current];
      
      if (charIndexRef.current < currentMessage.length) {
        setText(text => text + currentMessage[charIndexRef.current]);
        charIndexRef.current++;
      } else {
        if (messageIndexRef.current < messages.length - 1) {
          setText(text => text + '\n');
          messageIndexRef.current++;
          charIndexRef.current = 0;
          clearInterval(timerRef.current);
          setTimeout(() => {
            timerRef.current = setInterval(typeWriter, 30);
          }, 800);
        } else {
          setIsDone(true);
          clearInterval(timerRef.current);
        }
      }
    };

    timerRef.current = setInterval(typeWriter, 30);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Gestion des événements clavier et tactiles
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isDone && !isRedirecting && event.key === 'Enter') {
        handleRedirection();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDone, isRedirecting]);

  const handleRedirection = () => {
    if (!isRedirecting) {
      setIsRedirecting(true);
      setTimeout(() => {
        window.open('https://www.nsa.gov', '_blank');
      }, 2000);
    }
  };

  // Fonction pour adapter la taille du texte ASCII
  const getASCIIArtSize = () => {
    if (dimensions.width < 640) {
      return 'text-[6px]';
    } else if (dimensions.width < 768) {
      return 'text-[8px]';
    } else {
      return 'text-xs md:text-sm';
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono text-base md:text-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ opacity: 0.2 }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="border border-green-500 p-4 md:p-8 w-full max-w-xl text-center bg-black bg-opacity-90">
          <div className="mb-4 md:mb-6 text-green-400 whitespace-pre-wrap text-left text-sm md:text-base">
            {text}
          </div>
          {isDone && !isRedirecting && (
            <>
              <pre className={`text-green-400 leading-tight select-none ${getASCIIArtSize()} font-bold whitespace-pre-wrap`}>
{`'##::::'##::::'###:::::'######::'##:::'##:'########:'########::
 ##:::: ##:::'## ##:::'##... ##: ##::'##:: ##.....:: ##.... ##:
 ##:::: ##::'##:. ##:: ##:::..:: ##:'##::: ##::::::: ##:::: ##:
 #########:'##:::. ##: ##::::::: #####:::: ######::: ##::::::::
 ##.... ##: #########: ##::::::: ##. ##::: ##...:::: ##::::::::
 ##:::: ##: ##.... ##: ##::: ##: ##:. ##:: ##::::::: ##:::: ##:
 ##:::: ##: ##:::: ##:. ######:: ##::. ##: ########: ########::
..:::::..::..:::::..:::......:::..::::..::........::........:::`}</pre>
              <h1 className="mt-4 md:mt-8 mb-4 md:mb-6 text-xl md:text-2xl font-bold text-green-500 tracking-[0.2em] animate-glow">
                HACK SUCCESSFUL
              </h1>
              <div className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-left text-sm md:text-base">
                <p className="text-green-400">Données volées avec succès :</p>
                <ul className="list-disc list-inside text-green-300">
                  <li>Historique de recherche (très intéressant...)</li>
                  <li>Photos de vacances (plutôt embarrassant...)</li>
                  <li>Messages privés (on ne jugera pas...)</li>
                  <li>Historique des devoirs non rendus (oups...)</li>
                </ul>
                <p className="text-green-400 mt-2 md:mt-4">
                  Vente à Omnes Education en cours...
                </p>
                {/* Desktop instruction */}
                <p className="hidden md:block text-center mt-4 md:mt-6">
                  Appuyez sur <span className="text-green-300 border border-green-500 px-2">[ENTER]</span> pour accepter votre sort
                </p>
                {/* Mobile button */}
                <div className="md:hidden flex justify-center mt-4">
                  <button
                    onClick={handleRedirection}
                    className="border border-green-500 px-6 py-2 text-green-300 hover:bg-green-500 hover:text-black transition-colors"
                  >
                    Accepter votre sort
                  </button>
                </div>
              </div>
            </>
          )}
          {isRedirecting && (
            <div className="text-red-500 animate-pulse text-lg md:text-xl font-bold">
              !!! ALERTE !!!
              <br />
              <span className="text-sm md:text-base">
                Redirection vers nos partenaires...
              </span>
            </div>
          )}
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