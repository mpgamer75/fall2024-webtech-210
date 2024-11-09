// src/components/Logo.js
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/images/https://fr.pinterest.com/cerebraldefence/" // lien logo
        alt="SABER"
        width={40}
        height={40}
        className="dark:invert" // Inverse les couleurs en cas d'activation du mode sombre 
      />
      <span className="font-bold text-xl text-gray-800 dark:text-white">
        SABER
      </span>
    </div>
  );
};

export default Logo;