'use client';

import { useState } from 'react';
import { Lock, Copy, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import CryptoJS from 'crypto-js';

const EncryptForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    text: '',
    key: '',
    method: 'BTOA64'
  });
  const [errors, setErrors] = useState({});
  const [encryptedText, setEncryptedText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyPair, setKeyPair] = useState(null);

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.text.trim()) {
      newErrors.text = "Le texte ne peut pas être vide";
    }
    if (formData.method !== 'BTOA64' && !formData.key) {
      newErrors.key = "Une clé est requise";
    }
    if (formData.method === 'AES' && formData.key.length < 8) {
      newErrors.key = "La clé AES doit contenir au moins 8 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Encodage Base64
  const encryptBTOA64 = (text) => {
    try {
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    } catch (error) {
      throw new Error('Erreur lors de l\'encodage Base64');
    }
  };

  // Chiffrement AES
  const encryptAES = (text, key) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(text, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    } catch (error) {
      throw new Error('Erreur lors du chiffrement AES');
    }
  };

  // Chiffrement RSA
  const encryptRSA = (text) => {
    try {
      const JSEncrypt = require('jsencrypt').default;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(formData.key);
      const encrypted = encrypt.encrypt(text);
      if (!encrypted) {
        throw new Error('Échec du chiffrement');
      }
      return encrypted;
    } catch (error) {
      throw new Error('Erreur lors du chiffrement RSA');
    }
  };

  // Génération de clé aléatoire
  const generateRandomKey = () => {
    setIsLoading(true);
    try {
      let key = '';
      if (formData.method === 'BTOA64' || formData.method === 'AES') {
        // Génération de clé pour AES
        const keySize = formData.method === 'AES' ? 32 : 16;
        const wordArray = CryptoJS.lib.WordArray.random(keySize);
        key = CryptoJS.enc.Base64.stringify(wordArray);
      } else if (formData.method === 'RSA') {
        // Génération de paire de clés RSA
        const JSEncrypt = require('jsencrypt').default;
        const encrypt = new JSEncrypt({ default_key_size: 2048 });
        encrypt.getKey();
        key = encrypt.getPublicKey();
        setKeyPair({
          publicKey: encrypt.getPublicKey(),
          privateKey: encrypt.getPrivateKey()
        });
      }
      setFormData(prev => ({ ...prev, key }));
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Erreur lors de la génération de la clé: ' + error.message 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion de la copie dans le presse-papiers
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
    try {
      let filename = 'message-crypte.txt';
      let content = encryptedText;

      // Si c'est RSA, inclure aussi la clé privée
      if (formData.method === 'RSA' && keyPair) {
        filename = 'cryptage-rsa.txt';
        content = JSON.stringify({
          messageChiffre: encryptedText,
          clePrivee: keyPair.privateKey
        }, null, 2);
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Erreur lors du téléchargement');
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      let encrypted;
      switch (formData.method) {
        case 'BTOA64':
          encrypted = encryptBTOA64(formData.text);
          break;
        case 'AES':
          encrypted = encryptAES(formData.text, formData.key);
          break;
        case 'RSA':
          encrypted = encryptRSA(formData.text);
          break;
        default:
          throw new Error('Méthode non supportée');
      }
      setEncryptedText(encrypted);
      setShowResult(true);
      setErrors({});
    } catch (error) {
      console.error('Erreur de chiffrement:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Erreur de chiffrement: ' + error.message 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // [Le JSX reste le même que dans votre code]
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className={`rounded-lg shadow-xl p-6 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        {/* Titre */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lock className="text-blue-600" />
          Crypter un message
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélecteur de méthode */}
          <div>
            <label className="block mb-2 font-medium">
              Méthode de cryptage
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData(prev => ({...prev, method: e.target.value}))}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500
                ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white border-gray-300'}
              `}
              disabled={isLoading}
            >
              <option value="BTOA64">Base64 (Simple)</option>
              <option value="AES">AES (Symétrique)</option>
              <option value="RSA">RSA (Asymétrique)</option>
            </select>
            
            {/* Info sur la méthode */}
            {formData.method !== 'BTOA64' && (
              <p className="text-sm text-gray-500 mt-1">
                {formData.method === 'AES' 
                  ? "AES utilise la même clé pour crypter et décrypter" 
                  : "RSA utilise une paire de clés publique/privée"}
              </p>
            )}
          </div>

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
              disabled={isLoading}
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-1">{errors.text}</p>
            )}
          </div>

          {/* Section clé de cryptage (conditionnelle) */}
          {formData.method !== 'BTOA64' && (
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1">
                <label className="block mb-2 font-medium">
                  {formData.method === 'RSA' ? 'Clé publique' : 'Clé de cryptage'}
                </label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData(prev => ({...prev, key: e.target.value}))}
                  className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500
                    ${errors.key ? 'border-red-500' : 'border-gray-300'}
                    ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
                  `}
                  placeholder={formData.method === 'RSA' 
                    ? "Clé publique générée automatiquement..." 
                    : "Entrez ou générez une clé..."}
                  readOnly={formData.method === 'RSA'}
                  disabled={isLoading}
                />
                {errors.key && (
                  <p className="text-red-500 text-sm mt-1">{errors.key}</p>
                )}
              </div>
              
              {/* Bouton de génération de clé */}
              <button
                type="button"
                onClick={generateRandomKey}
                disabled={isLoading}
                className={`self-end px-6 py-4 border rounded-lg transition-colors whitespace-nowrap
                  ${theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600' 
                    : 'bg-white hover:bg-gray-50 border-gray-300'}
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? 'Génération...' : `Générer une ${formData.method === 'RSA' ? 'paire de clés' : 'clé'}`}
              </button>
            </div>
          )}

          {/* Message d'erreur général */}
          {errors.submit && (
            <div className="text-red-500 text-sm p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              {errors.submit}
            </div>
          )}

          {/* Bouton de soumission */}
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
              <span>Chiffrement en cours...</span>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Crypter avec {formData.method}
              </>
            )}
          </button>
        </form>

        {/* Résultat */}
        {showResult && (
          <div className={`mt-6 border rounded-lg p-4 
            ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <h3 className="font-medium">Texte crypté ({formData.method}) :</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  disabled={isLoading}
                  className={`flex-1 sm:flex-none px-3 py-1 border rounded-md inline-flex items-center justify-center transition-colors
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
                  disabled={isLoading}
                  className={`flex-1 sm:flex-none px-3 py-1 border rounded-md inline-flex items-center justify-center transition-colors
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