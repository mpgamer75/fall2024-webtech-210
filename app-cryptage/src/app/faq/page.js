'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import soundFile from '../../../public/sounds/son3.mp3';

export default function FAQ() {
   const audioRef = useRef(null);

   useEffect(() => {
       let isComponentMounted = true;
   
       const initAudio = async () => {
           try {
               audioRef.current = new Audio(soundFile);
               audioRef.current.volume = 1.0;
               
               if (isComponentMounted) {
                   await audioRef.current.play();
               }
           } catch (error) {
               if (isComponentMounted) {
                   console.error('Error playing audio:', error);
               }
           }
       };
   
       initAudio();
   
       return () => {
           isComponentMounted = false;
           if (audioRef.current) {
               audioRef.current.pause();
               audioRef.current = null;
           }
       };
   }, []);

   return (
       <div className="min-h-screen flex flex-col items-center justify-center gap-8">
           <h1 className='text-3xl font-serif text-white'>Pas de FAQ ici mais on a Bellingham🔥</h1>
           <Image
               src="/bellingham.jpg"
               alt="Bellingham"
               width={500}
               height={300}
               priority
               className="rounded-lg shadow-lg"
           />
       </div>
   );
}