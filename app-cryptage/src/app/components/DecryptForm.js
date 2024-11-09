// src/components/DecryptForm.js
'use client';

import { useState } from 'react';
import { Unlock, Copy, Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DecryptForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    encryptedText: '',
    key: ''
  });
  const [errors, setErrors] = useState({});
  const [decryptedText, setDecryptedText] = useState('');
  const [showResult, setShowResult] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.encryptedText.trim()) {
      newErrors.encryptedText = "Le texte crypté ne peut pas être vide";
    }
    if (formData.key.length < 8) {
      newErrors.key = "La clé doit contenir au moins 8 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const decrypted = atob(formData.encryptedText);
      setDecryptedText(decrypted);
      setShowResult(true);
    } catch (err) {
      alert('Erreur lors du décryptage. Vérifiez votre texte et votre clé.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          encryptedText: event.target?.result?.toString() || ''
        }));
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(decryptedText);
      alert('Texte copié !');
    } catch (err) {
      alert('Erreur lors de la copie');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl p-6`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Unlock className="text-green-600" />
          Décrypter un message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Zone de texte crypté */}
          <div>
            <label className="block mb-2 font-medium">
              Texte crypté
            </label>
            <div className="space-y-2">
              <textarea
                value={formData.encryptedText}
                onChange={(e) => setFormData(prev => ({...prev, encryptedText: e.target.value}))}
                className={`w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-green-500
                  ${errors.encryptedText ? 'border-red-500' : 'border-gray-300'}
                  ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
                `}
                placeholder="Collez le texte crypté ici..."
              />
              <div className="flex justify-end">
                <label className={`cursor-pointer px-4 py-2 border rounded-lg inline-flex items-center
                  ${theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'bg-white hover:bg-gray-50 border-gray-300'}
                `}>
                  <Upload className="w-4 h-4 mr-2" />
                  Importer un fichier
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt"
                  />
                </label>
              </div>
            </div>
            {errors.encryptedText && (
              <p className="text-red-500 text-sm mt-1">{errors.encryptedText}</p>
            )}
          </div>

          {/* Clé de décryptage */}
          <div>
            <label className="block mb-2 font-medium">
              Clé de décryptage
            </label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) => setFormData(prev => ({...prev, key: e.target.value}))}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500
                ${errors.key ? 'border-red-500' : 'border-gray-300'}
                ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
              `}
              placeholder="Entrez votre clé de décryptage..."
            />
            {errors.key && (
              <p className="text-red-500 text-sm mt-1">{errors.key}</p>
            )}
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700"
          >
            Décrypter le message
          </button>
        </form>

        {/* Résultat */}
        {showResult && (
          <div className={`mt-6 border rounded-lg p-4
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          `}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Message décrypté :</h3>
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1 border rounded-md inline-flex items-center
                  ${theme === 'dark' 
                    ? 'hover:bg-gray-700 border-gray-600' 
                    : 'hover:bg-gray-50 border-gray-200'}
                `}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copier
              </button>
            </div>
            <div className={`p-4 rounded-md whitespace-pre-wrap
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}
            `}>
              {decryptedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecryptForm;