'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const timerRef = useRef(null);
  const messageIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

  // Gestionnaire d'événements séparé
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isDone && !isRedirecting && event.key === 'Enter') {
        console.log('Touche Entrée détectée'); // Pour le débogage
        setIsRedirecting(true);
        // Affiche l'alerte pendant 2 secondes avant la redirection
        setTimeout(() => {
          window.open('https://www.nsa.gov', '_blank');
        }, 2000);
      }
    };

    window.addEventListener('keydown', handleKeyPress); // Changé à keydown au lieu de keypress

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isDone, isRedirecting]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono text-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ opacity: 0.2 }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="border border-green-500 p-8 max-w-xl text-center bg-black bg-opacity-90">
          <div className="mb-6 text-green-400 whitespace-pre-wrap text-left">{text}</div>
          {isDone && !isRedirecting && (
            <>
              <pre className="text-green-400 leading-tight select-none text-xs md:text-sm font-bold">
{`'##::::'##::::'###:::::'######::'##:::'##:'########:'########::
 ##:::: ##:::'## ##:::'##... ##: ##::'##:: ##.....:: ##.... ##:
 ##:::: ##::'##:. ##:: ##:::..:: ##:'##::: ##::::::: ##:::: ##:
 #########:'##:::. ##: ##::::::: #####:::: ######::: ##::::::::
 ##.... ##: #########: ##::::::: ##. ##::: ##...:::: ##::::::::
 ##:::: ##: ##.... ##: ##::: ##: ##:. ##:: ##::::::: ##:::: ##:
 ##:::: ##: ##:::: ##:. ######:: ##::. ##: ########: ########::
..:::::..::..:::::..:::......:::..::::..::........::........:::`}</pre>
              <h1 className="mt-8 mb-6 text-2xl font-bold text-green-500 tracking-[0.2em] animate-glow">
                HACK SUCCESSFUL
              </h1>
              <div className="mt-6 space-y-3 text-left">
                <p className="text-green-400">Données volées avec succès :</p>
                <ul className="list-disc list-inside text-green-300">
                  <li>Historique de recherche (très intéressant...)</li>
                  <li>Photos de vacances (plutôt embarrassant...)</li>
                  <li>Messages privés (on ne jugera pas...)</li>
                  <li>Historique des devoirs non rendus (oups...)</li>
                </ul>
                <p className="text-green-400 mt-4">
                  Vente à Omnes Education en cours...
                </p>
                <p className="text-center mt-6">
                  Appuyez sur <span className="text-green-300 border border-green-500 px-2">[ENTER]</span> pour accepter votre sort
                </p>
              </div>
            </>
          )}
          {isRedirecting && (
            <div className="text-red-500 animate-pulse text-xl font-bold">
              !!! ALERTE !!!
              <br />
              <span className="text-base">
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