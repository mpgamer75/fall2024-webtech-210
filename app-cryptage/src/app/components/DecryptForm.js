// src/components/DecryptForm.js
'use client';

import React, { useState } from 'react';
import { Unlock, Copy, Upload } from 'lucide-react';

const DecryptForm = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Texte copié !');
    } catch (err) {
      alert('Erreur lors de la copie');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Méthode de décryptage simple (à remplacer par une méthode plus sécurisée)
      const decrypted = atob(formData.encryptedText);
      setDecryptedText(decrypted);
      setShowResult(true);
    } catch (err) {
      alert('Erreur lors du décryptage. Vérifiez votre texte et votre clé.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Unlock className="text-green-600" />
          Décrypter un message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Texte crypté
            </label>
            <div className="space-y-2">
              <textarea
                name="encryptedText"
                value={formData.encryptedText}
                onChange={handleInputChange}
                className={`w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-green-500
                  ${errors.encryptedText ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Collez le texte crypté ici..."
              />
              <div className="flex justify-end">
                <label className="cursor-pointer bg-white px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  <span>Importer un fichier</span>
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

          <div>
            <label className="block mb-2 font-medium">
              Clé de décryptage
            </label>
            <input
              name="key"
              type="text"
              value={formData.key}
              onChange={handleInputChange}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500
                ${errors.key ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Entrez votre clé de décryptage..."
            />
            {errors.key && (
              <p className="text-red-500 text-sm mt-1">{errors.key}</p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700"
          >
            Décrypter le message
          </button>
        </form>

        {showResult && (
          <div className="mt-6 space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Message décrypté :</h3>
                <button
                  onClick={() => copyToClipboard(decryptedText)}
                  className="px-3 py-1 border rounded-md hover:bg-gray-50 inline-flex items-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copier
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                {decryptedText}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecryptForm;