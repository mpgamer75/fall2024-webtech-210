// src/components/Logo.js
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/images/https://fr.pinterest.com/cerebraldefence/" // Placez votre logo dans public/images/
        alt="SABER"
        width={40}
        height={40}
        className="dark:invert" // Inverse les couleurs en mode sombre si nécessaire
      />
      <span className="font-bold text-xl text-gray-800 dark:text-white">
        SABER
      </span>
    </div>
  );
};

export default Logo;