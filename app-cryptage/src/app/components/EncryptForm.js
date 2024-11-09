// src/app/components/EncryptForm.js
'use client';

import { useState } from 'react';
import { Lock, Copy, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const EncryptForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    text: '',
    key: ''
  });
  const [errors, setErrors] = useState({});
  const [encryptedText, setEncryptedText] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.text.trim()) {
      newErrors.text = "Le texte ne peut pas être vide";
    }
    if (formData.key.length < 8) {
      newErrors.key = "La clé doit contenir au moins 8 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Génération de clé aléatoire
  const generateRandomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,?;.:/!§ù%$£¤*µ=\#';
    const length = 16;
    let key = '';
    for (let i = 0; i < length; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({ ...prev, key }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Méthode de cryptage simple ( on va la remplacer avec une méthode comme RSA ou AES qui sont plus robuste mais nécessite Crypto.js)
      const encrypted = btoa(formData.text);
      setEncryptedText(encrypted);
      setShowResult(true);
    } catch (err) {
      alert('Erreur lors du cryptage');
    }
  };

  // Copie dans le presse-papiers
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(encryptedText);
      alert('Texte copié !');
    } catch (err) {
      alert('Erreur lors de la copie');
    }
  };

  // Téléchargement du texte crypté
  const downloadText = () => {
    const blob = new Blob([encryptedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'message-crypte.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };



  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className={`rounded-lg shadow-xl p-6 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lock className="text-blue-600" />
          Crypter un message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Zone de texte */}
          <div>
            <label className="block mb-2 font-medium">
              Texte à crypter
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({...prev, text: e.target.value}))}
              className={`w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500
                ${errors.text ? 'border-red-500' : 'border-gray-300'}
                ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
              `}
              placeholder="Entrez votre texte ici..."
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-1">{errors.text}</p>
            )}
          </div>

          {/* Clé de cryptage */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">
                Clé de cryptage
              </label>
              <input
                type="text"
                value={formData.key}
                onChange={(e) => setFormData(prev => ({...prev, key: e.target.value}))}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500
                  ${errors.key ? 'border-red-500' : 'border-gray-300'}
                  ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
                `}
                placeholder="Entrez votre clé..."
              />
              {errors.key && (
                <p className="text-red-500 text-sm mt-1">{errors.key}</p>
              )}
            </div>
            <button
              type="button"
              onClick={generateRandomKey}
              className={`self-end px-6 py-4 border rounded-lg transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600' 
                  : 'bg-white hover:bg-gray-50 border-gray-300'}
              `}
            >
              Générer une clé
            </button>
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crypter le message
          </button>
        </form>

        {/* Résultat */}
        {showResult && (
          <div className={`mt-6 border rounded-lg p-4 
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Texte crypté :</h3>
              <div className="space-x-2">
                <button
                  onClick={copyToClipboard}
                  className={`px-3 py-1 border rounded-md inline-flex items-center transition-colors
                    ${theme === 'dark' 
                      ? 'hover:bg-gray-700 border-gray-600' 
                      : 'hover:bg-gray-50 border-gray-200'}
                  `}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copier
                </button>
                <button
                  onClick={downloadText}
                  className={`px-3 py-1 border rounded-md inline-flex items-center transition-colors
                    ${theme === 'dark' 
                      ? 'hover:bg-gray-700 border-gray-600' 
                      : 'hover:bg-gray-50 border-gray-200'}
                  `}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
            <div className={`p-4 rounded-md break-all
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}
            `}>
              {encryptedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncryptForm;