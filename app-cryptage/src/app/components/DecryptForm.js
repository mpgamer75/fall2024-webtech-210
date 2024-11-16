// src/components/DecryptForm.js
'use client';

import { useState } from 'react';
import { Unlock, Copy, Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import CryptoJS from 'crypto-js';

const DecryptForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    encryptedText: '',
    key: '',
    method: 'BTOA64' // Par défaut
  });
  const [errors, setErrors] = useState({});
  const [decryptedText, setDecryptedText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.encryptedText.trim()) {
      newErrors.encryptedText = "Le texte crypté ne peut pas être vide";
    }
    if (formData.method !== 'BTOA64' && !formData.key) {
      newErrors.key = "Une clé est requise pour le décryptage";
    }
    if (formData.method === 'AES' && formData.key.length < 8) {
      newErrors.key = "La clé AES doit contenir au moins 8 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Décodage Base64
  const decryptBTOA64 = (text) => {
    try {
      const decoded = CryptoJS.enc.Base64.parse(text);
      return decoded.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error('Erreur lors du décodage Base64');
    }
  };

  // Déchiffrement AES
  const decryptAES = (encryptedText, key) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      if (!result) throw new Error('Clé invalide ou texte corrompu');
      return result;
    } catch (error) {
      throw new Error('Erreur lors du déchiffrement AES');
    }
  };

  // Déchiffrement RSA
  const decryptRSA = (encryptedText, privateKey) => {
    try {
      const JSEncrypt = require('jsencrypt').default;
      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(privateKey);
      const decrypted = decrypt.decrypt(encryptedText);
      if (!decrypted) throw new Error('Clé privée invalide ou texte corrompu');
      return decrypted;
    } catch (error) {
      throw new Error('Erreur lors du déchiffrement RSA');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result?.toString() || '';
        try {
          // Tenter de parser comme JSON pour les fichiers RSA
          const jsonContent = JSON.parse(content);
          if (jsonContent.messageChiffre && jsonContent.clePrivee) {
            setFormData(prev => ({
              ...prev,
              encryptedText: jsonContent.messageChiffre,
              key: jsonContent.clePrivee,
              method: 'RSA'
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              encryptedText: content
            }));
          }
        } catch {
          // Si ce n'est pas du JSON, utiliser le contenu tel quel
          setFormData(prev => ({
            ...prev,
            encryptedText: content
          }));
        }
        setIsLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      let decrypted;
      switch (formData.method) {
        case 'BTOA64':
          decrypted = decryptBTOA64(formData.encryptedText);
          break;
        case 'AES':
          decrypted = decryptAES(formData.encryptedText, formData.key);
          break;
        case 'RSA':
          decrypted = decryptRSA(formData.encryptedText, formData.key);
          break;
        default:
          throw new Error('Méthode non supportée');
      }
      setDecryptedText(decrypted);
      setShowResult(true);
      setErrors({});
    } catch (error) {
      console.error('Erreur de déchiffrement:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Erreur de déchiffrement: ' + error.message 
      }));
    } finally {
      setIsLoading(false);
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
      <div className={`rounded-lg shadow-xl p-6 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Unlock className="text-green-600" />
          Décrypter un message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélecteur de méthode */}
          <div>
            <label className="block mb-2 font-medium">
              Méthode de décryptage
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData(prev => ({...prev, method: e.target.value}))}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500
                ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white border-gray-300'}
              `}
              disabled={isLoading}
            >
              <option value="BTOA64">Base64 (Simple)</option>
              <option value="AES">AES (Symétrique)</option>
              <option value="RSA">RSA (Asymétrique)</option>
            </select>
            
            {formData.method !== 'BTOA64' && (
              <p className="text-sm text-gray-500 mt-1">
                {formData.method === 'AES' 
                  ? "Utilisez la même clé que pour le chiffrement" 
                  : "Utilisez la clé privée RSA"}
              </p>
            )}
          </div>

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
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <label className={`cursor-pointer px-4 py-2 border rounded-lg inline-flex items-center
                  ${theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                    : 'bg-white hover:bg-gray-50 border-gray-300'}
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                  <Upload className="w-4 h-4 mr-2" />
                  Importer un fichier
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".txt"
                    disabled={isLoading}
                  />
                </label>
              </div>
              {errors.encryptedText && (
                <p className="text-red-500 text-sm mt-1">{errors.encryptedText}</p>
              )}
            </div>
          </div>

          {/* Clé de décryptage (conditionnelle) */}
          {formData.method !== 'BTOA64' && (
            <div>
              <label className="block mb-2 font-medium">
                {formData.method === 'RSA' ? 'Clé privée RSA' : 'Clé de décryptage'}
              </label>
              <input
                type="text"
                value={formData.key}
                onChange={(e) => setFormData(prev => ({...prev, key: e.target.value}))}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500
                  ${errors.key ? 'border-red-500' : 'border-gray-300'}
                  ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
                `}
                placeholder={formData.method === 'RSA' 
                  ? "Collez la clé privée RSA..." 
                  : "Entrez la clé de décryptage..."}
                disabled={isLoading}
              />
              {errors.key && (
                <p className="text-red-500 text-sm mt-1">{errors.key}</p>
              )}
            </div>
          )}

          {/* Message d'erreur général */}
          {errors.submit && (
            <div className="text-red-500 text-sm p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              {errors.submit}
            </div>
          )}

          {/* Bouton de soumission // prblème au niveau de l'effet hoover pour le bouton de decryptage  */}
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg transition-colors flex items-center justify-center gap-2
              
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-800 hover:bg-red-800'} 
              text-white
            `}
          >
            {isLoading ? (
              <span>Déchiffrement en cours...</span>
            ) : (
              <>
                <Unlock className="w-5 h-5" />
                Décrypter avec {formData.method}
              </>
            )}
          </button>
        </form>

        {/* Résultat */}
        {showResult && (
          <div className={`mt-6 border rounded-lg p-4 
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Message décrypté :</h3>
              <button
                onClick={copyToClipboard}
                disabled={isLoading}
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

// dans cette nouvelle version on a jouter la possibilité à l'utilisateur de choisir sa méthode de décryptage ( en fonction de la nature de cryptage qu'il a choisit )

// utilistation de "isLoading" comme pour le formulaire de cryptage 

// un support de fichier JSON pour RSA car il y a une clé public et une clé privé ( trouver en ligne )