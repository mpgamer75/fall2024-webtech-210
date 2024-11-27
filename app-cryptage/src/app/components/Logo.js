'use client';

import Image from 'next/image';
import { useState } from 'react';

const Logo = ({ size = 'small' }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dimensions = size === 'large' ? { width: 180, height: 180 } : { width: 40, height: 40 };
  
  return (
    <div className={`flex ${size === 'large' ? 'flex-col items-center' : 'items-center space-x-2'}`}>
      <div className="logo-glitch">
        <Image
          src="/logo-app3.png"
          alt="SABER"
          {...dimensions}
          className="object-contain relative z-10"
          priority
        />
      </div>
      
      {size === 'small' && (
        <span className="font-bold text-xl text-white">
          SABER
        </span>
      )}
    </div>
  );
};

export default Logo;