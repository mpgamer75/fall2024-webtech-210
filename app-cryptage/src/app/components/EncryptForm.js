// src/app/components/EncryptForm.js
'use client';

import React from 'react';
import { Lock, Copy, Download } from 'lucide-react';

const EncryptForm = () => {
  const [formData, setFormData] = React.useState({
    text: '',
    key: ''
  });
  const [errors, setErrors] = React.useState({});
  const [encryptedText, setEncryptedText] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);

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

  const generateRandomKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 16;
    let key = '';
    for (let i = 0; i < length; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData(prev => ({...prev, key}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const encrypted = btoa(formData.text);
      setEncryptedText(encrypted);
      setShowResult(true);
    } catch (err) {
      alert('Erreur lors du cryptage');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(encryptedText);
      alert('Texte copié !');
    } catch (err) {
      alert('Erreur lors de la copie');
    }
  };

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

  return React.createElement('div', {
    className: 'max-w-2xl mx-auto p-6'
  }, [
    React.createElement('div', {
      className: 'bg-white rounded-lg shadow-xl p-6',
      key: 'form-container'
    }, [
      // Titre
      React.createElement('div', {
        className: 'flex items-center gap-2 mb-6',
        key: 'title'
      }, [
        React.createElement(Lock, { 
          className: 'text-blue-600',
          size: 24,
          key: 'lock-icon'
        }),
        React.createElement('h2', {
          className: 'text-2xl font-bold',
          key: 'title-text'
        }, 'Crypter un message')
      ]),

      // Formulaire
      React.createElement('form', {
        onSubmit: handleSubmit,
        className: 'space-y-6',
        key: 'form'
      }, [
        // Zone de texte
        React.createElement('div', {
          key: 'text-area-container'
        }, [
          React.createElement('label', {
            className: 'block mb-2 font-medium'
          }, 'Texte à crypter'),
          React.createElement('textarea', {
            value: formData.text,
            onChange: (e) => setFormData(prev => ({...prev, text: e.target.value})),
            className: `w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.text ? 'border-red-500' : 'border-gray-300'}`,
            placeholder: 'Entrez votre texte ici...'
          }),
          errors.text && React.createElement('p', {
            className: 'text-red-500 text-sm mt-1'
          }, errors.text)
        ]),

        // Clé de cryptage
        React.createElement('div', {
          className: 'flex gap-4',
          key: 'key-container'
        }, [
          React.createElement('div', {
            className: 'flex-1'
          }, [
            React.createElement('label', {
              className: 'block mb-2 font-medium'
            }, 'Clé de cryptage'),
            React.createElement('input', {
              type: 'text',
              value: formData.key,
              onChange: (e) => setFormData(prev => ({...prev, key: e.target.value})),
              className: `w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.key ? 'border-red-500' : 'border-gray-300'}`,
              placeholder: 'Entrez votre clé...'
            }),
            errors.key && React.createElement('p', {
              className: 'text-red-500 text-sm mt-1'
            }, errors.key)
          ]),
          React.createElement('button', {
            type: 'button',
            onClick: generateRandomKey,
            className: 'self-end px-6 py-4 border rounded-lg hover:bg-gray-50'
          }, 'Générer une clé')
        ]),

        // Bouton de soumission
        React.createElement('button', {
          type: 'submit',
          className: 'w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700',
          key: 'submit-button'
        }, 'Crypter le message')
      ]),

      // Résultat
      showResult && React.createElement('div', {
        className: 'mt-6 border rounded-lg p-4',
        key: 'result'
      }, [
        React.createElement('div', {
          className: 'flex justify-between items-center mb-2'
        }, [
          React.createElement('h3', {
            className: 'font-medium'
          }, 'Texte crypté :'),
          React.createElement('div', {
            className: 'space-x-2'
          }, [
            React.createElement('button', {
              onClick: copyToClipboard,
              className: 'px-3 py-1 border rounded-md hover:bg-gray-50 inline-flex items-center'
            }, [
              React.createElement(Copy, {
                className: 'w-4 h-4 mr-2'
              }),
              'Copier'
            ]),
            React.createElement('button', {
              onClick: downloadText,
              className: 'px-3 py-1 border rounded-md hover:bg-gray-50 inline-flex items-center'
            }, [
              React.createElement(Download, {
                className: 'w-4 h-4 mr-2'
              }),
              'Télécharger'
            ])
          ])
        ]),
        React.createElement('div', {
          className: 'bg-gray-50 p-4 rounded-md break-all'
        }, encryptedText)
      ])
    ])
  ]);
};

export default EncryptForm;