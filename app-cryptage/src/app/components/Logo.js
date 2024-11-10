// src/components/Logo.js
'use client';

import Image from 'next/image';
import { useState } from 'react';

const Logo = ({ size = 'small' }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dimensions = size === 'large' ? { width: 180, height: 180 } : { width: 40, height: 40 };
  
  return (
    <div className={`flex ${size === 'large' ? 'flex-col items-center' : 'items-center space-x-2'}`}>
      {size === 'large' ? (
        <div 
          className="glitch-container"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Image principale */}
          <Image
            src="/logo-app3.png"
            alt="SABER"
            {...dimensions}
            className="object-contain relative z-10"
            priority
          />
          {/* Couches de glitch */}
          {isHovering && (
            <>
              <div className="glitch-effect">
                <Image
                  src="/logo-app3.png"
                  alt=""
                  {...dimensions}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="glitch-effect">
                <Image
                  src="/logo-app3.png"
                  alt=""
                  {...dimensions}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="glitch-effect">
                <Image
                  src="/logo-app3.png"
                  alt=""
                  {...dimensions}
                  className="object-contain"
                  priority
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <Image
          src="/logo-app3.png"
          alt="SABER"
          {...dimensions}
          className="object-contain"
          priority
        />
      )}
      {size === 'small' && (
        <span className="font-bold text-xl text-white">
          SABER
        </span>
      )}
    </div>
  );
};

export default Logo;