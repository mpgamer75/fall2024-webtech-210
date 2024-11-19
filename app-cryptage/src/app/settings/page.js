'use client';
import { Settings, Bell, Shield, Moon, Skull, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ToggleSwitch = ({ checked, onChange, label }) => (
 <label className="relative inline-flex items-center cursor-pointer">
   <input
     type="checkbox"
     className="sr-only peer"
     checked={checked}
     onChange={onChange}
   />
   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                   peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
                   peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                   peer-checked:after:border-white after:content-[''] after:absolute 
                   after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                   after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                   dark:border-gray-600 peer-checked:bg-blue-600" />
   <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
     {label}
   </span>
 </label>
);

export default function SettingsPage() {
 const { theme, toggleTheme } = useTheme();
 const [notifications, setNotifications] = useState(true);
 const [twoFactor, setTwoFactor] = useState(false);
 const [doNotTouch, setDoNotTouch] = useState(false);
 const router = useRouter();

 const handleRedirect = () => {
   setDoNotTouch(!doNotTouch);
   if (!doNotTouch) {
     router.push('/joke');
   }
 };

 return (
   <div className="max-w-4xl mx-auto px-6 py-8 dark:bg-gray-900">
     <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 dark:text-white">
       <Settings className="text-blue-600" />
       Paramètres
     </h1>

     <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
       <div className="p-6 border-b dark:border-gray-700">
         <h2 className="text-xl font-semibold mb-4 dark:text-white">
           Préférences générales
         </h2>

         <div className="space-y-6">
           {/* Mode sombre / clair */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               {theme === 'dark' ? (
                 <Sun className="dark:text-white" size={20} />
               ) : (
                 <Moon className="text-gray-900" size={20} />
               )}
               <span className="dark:text-white text-gray-900">
                 {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
               </span>
             </div>
             <ToggleSwitch
               checked={theme === 'light'}
               onChange={toggleTheme}
             />
           </div>

           {/* Notifications */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Bell className="dark:text-white text-gray-900" size={20} />
               <span className="dark:text-white text-gray-900">Notifications</span>
             </div>
             <ToggleSwitch
               checked={notifications}
               onChange={() => setNotifications(!notifications)}
             />
           </div>

           {/* Double authentification */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Shield className="dark:text-white text-gray-900" size={20} />
               <span className="dark:text-white text-gray-900">Double authentification</span>
             </div>
             <ToggleSwitch
               checked={twoFactor}
               onChange={() => setTwoFactor(!twoFactor)}
             />
           </div>

           {/* Ne pas toucher */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Skull className="dark:text-white text-gray-900" size={20} />
               <span className="dark:text-white text-gray-900">Ne pas toucher</span>
             </div>
             <ToggleSwitch
               checked={doNotTouch}
               onChange={handleRedirect}
             />
           </div>

           {/* Choix de la langue */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Globe className="dark:text-white text-gray-900" size={20} />
               <span className="dark:text-white text-gray-900">Langue</span>
             </div>
             <select
              
               onChange={(e) => changeLanguage(e.target.value)}
               className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
             >
               <option value="en">Français</option>
               <option value="fr">English</option>
             </select>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}