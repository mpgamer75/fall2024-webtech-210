'use client';

import { useState } from 'react';
import { Lock, Copy, Download, Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import CryptoJS from 'crypto-js';


const EncryptForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    text: '',
    key: '',
    method: 'BTOA64',
    file: null 
  });
  const [errors, setErrors] = useState({});
  const [encryptedText, setEncryptedText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyPair, setKeyPair] = useState(null);
  const [fileName, setFileName] = useState(''); // Nous permet d'afficher le nom du fichier 

  // Fonction pour lire un fichier texte
  const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  // Fonction pour lire un fichier PDF
  const readPdfFile = async (file) => {
    try {
      if (typeof window === 'undefined' || !window.pdfjsLib) {
        throw new Error('PDF.js non disponible');
      }
  
      const fileArrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText;
    } catch (error) {
      console.error('PDF Error:', error);
      throw new Error('Erreur lors de la lecture du PDF. Vérifiez que le fichier est valide.');
    }
  };
  // Gestion de l'import de fichier
  const handleFileImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setIsLoading(true);
    setFileName(file.name);
    
    try {
      let fileContent = '';
      
      if (file.type === 'application/pdf') {
        fileContent = await readPdfFile(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        fileContent = await readTextFile(file);
      } else {
        throw new Error('Format de fichier non supporté (utilisez .txt ou .pdf)');
      }
  
      setFormData(prev => ({
        ...prev,
        text: fileContent,
        file: file
      }));
      
      setErrors({});
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        file: 'Erreur lors de la lecture du fichier: ' + error.message
      }));
    } finally {
      setIsLoading(false);
    }
  };

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
  
      // Fonction pour découper le texte en morceaux de taille maximale
      const chunkSize = 100; // Taille sécurisée pour RSA 2048 bits ( on va modifier pour aller au oins à 4086 bits)
      const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
      
      // Chiffre chaque morceau
      const encryptedChunks = chunks.map(chunk => {
        const encrypted = encrypt.encrypt(chunk);
        if (!encrypted) {
          throw new Error('Échec du chiffrement d\'un segment');
        }
        return encrypted;
      });
  
      // Joins ici les morceaux chiffrés avec un séparateur
      return JSON.stringify(encryptedChunks);
    } catch (error) {
      throw new Error('Erreur lors du chiffrement RSA: ' + error.message);
    }
  };
  // Génération de clé aléatoire
  const generateRandomKey = async () => {
    setIsLoading(true);
    try {
      let key = '';

      if (formData.method === 'BTOA64' || formData.method === 'AES') {
        // Génération de clé pour AES
        const keySize = formData.method === 'AES' ? 32 : 16;
        const wordArray = CryptoJS.lib.WordArray.random(keySize);
        key = CryptoJS.enc.Base64.stringify(wordArray);
        setFormData(prev => ({ ...prev, key }));
      } else if (formData.method === 'RSA') {
        // Génération de paire de clés RSA
        const JSEncrypt = require('jsencrypt').default;
        const encrypt = new JSEncrypt({ 
          default_key_size: 4096 // On utilise au final une taille de clé à 4096 bits ( même si le coût en compléxité augmente vis à vis du processeur, la sécurité face aux attaques elle augmente)
        });
  
        // Génération asynchrone des clés pour éviter le blocage de l'interface
        await new Promise(resolve => {
          setTimeout(() => {
            encrypt.getKey();
            resolve();
          }, 100);
        });
  
        // Récupération des clés
        const publicKey = encrypt.getPublicKey();
        const privateKey = encrypt.getPrivateKey();

        if (!publicKey || !privateKey) {
          throw new Error('Échec de la génération des clés RSA');
        }
  
        // Mise à jour de l'état avec les nouvelles clés
        key = publicKey;
        setKeyPair({
          publicKey,
          privateKey
        });
        setFormData(prev => ({ ...prev, key: publicKey }));
      }
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
  
      // Si c'est RSA, on inclu également la clé privée
      if (formData.method === 'RSA' && keyPair) {
        filename = 'cryptage-rsa.txt';
        content = JSON.stringify({
          messageChiffre: JSON.parse(encryptedText), 
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className={`rounded-lg shadow-xl p-6 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        {/* Titre */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lock className="text-green-600" />
          Crypter un message ou un fichier
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

          {/* Import de fichier */}
          <div>
            <label className="block mb-2 font-medium">
              Importer un fichier (optionnel)
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  onChange={handleFileImport}
                  accept=".txt,.pdf"
                  className="hidden"
                  id="file-upload"
                  disabled={isLoading}
                />
                <label
                  htmlFor="file-upload"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                      : 'bg-white hover:bg-gray-50 border-gray-300'}
                  `}
                >
                  <Upload className="w-5 h-5" />
                  Choisir un fichier
                </label>
                {fileName && (
                  <span className="text-sm text-gray-500">
                    {fileName}
                  </span>
                )}
              </div>
              {errors.file && (
                <p className="text-red-500 text-sm">{errors.file}</p>
              )}
            </div>
          </div>

          {/* Zone de texte */}
          <div>
            <label className="block mb-2 font-medium">
              Texte à crypter {formData.file && "(ou contenu du fichier)"}
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({...prev, text: e.target.value}))}
              className={`w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500
                ${errors.text ? 'border-red-500' : 'border-gray-300'}
                ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}
              `}
              placeholder={formData.file ? "Le contenu du fichier apparaîtra ici..." : "Entrez votre texte ici..."}
              disabled={isLoading}
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-1">{errors.text}</p>
            )}
          </div>

          {/* Section clé de cryptage (conditionnelle/ l'utilisateur peut créer sa propre clé) */}
          {formData.method !== 'BTOA64' && (
            <div className="flex gap-4 flex-col">
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

              {/* Affichage de la clé privée pour RSA */}
              {formData.method === 'RSA' && keyPair && (
                <div className="flex-1">
                  <label className="block mb-2 font-medium">
                    Clé privée (à conserver précieusement)
                  </label>
                  <textarea
                    value={keyPair.privateKey}
                    readOnly
                    className={`w-full p-4 border rounded-lg h-32 resize-none
                      ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'}
                    `}
                  />
                  <p className="text-sm text-yellow-500 mt-1">
                    ⚠️ Cette clé privée est nécessaire pour le déchiffrement. Conservez-la en lieu sûr.
                  </p>
                </div>
              )}
              
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
            className={`ui-btn w-full py-4 rounded-lg transition-colors flex items-center justify-center gap-2
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-800 hover:bg-dark'}
              text-white
            `}
          >
            {isLoading ? (
              <span className="glitch-text">Chiffrement en cours...</span>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span className="glitch-text">Crypt<span className='glitch-text'>er</span> </span> <span className="glitch-text">avec </span> <span className="glitch-text"> {formData.method}</span>
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
              <h3 className="font-medium">
                {formData.file ? 'Fichier crypté' : 'Texte crypté'} ({formData.method}) :
              </h3>
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