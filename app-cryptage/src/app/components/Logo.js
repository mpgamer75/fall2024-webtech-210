// src/components/Logo.js
import Image from 'next/image';

const Logo = ({ size = 'small' }) => {
  const dimensions = size === 'large' ? { width: 120, height: 120 } : { width: 40, height: 40 };
  
  return (
    <div className={`
      flex ${size === 'large' ? 'flex-col' : 'items-center space-x-2'}
      ${size === 'large' ? 'animate-scale-in' : 'animate-slide-in'}
    `}>
      <Image
        src="/logo-app3.png"
        alt="SABER"
        {...dimensions}
        className="object-contain transform transition-transform duration-300 hover:scale-105"
        priority
      />
      {size === 'small' && (
        <span className="font-bold text-xl text-white">
          SABER
        </span>
      )}
    </div>
  );
};

export default Logo;