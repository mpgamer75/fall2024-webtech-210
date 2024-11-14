'use client';

import { Upload } from "lucide-react";

 // on définit d'abord les fonctions que l'on utilisera plus tard dans le code 
 
const FileUploadButton =({onFileSelect, acceptTypes = ".txt,.pdf"})=>{
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          
          reader.onload = (e) => {
            if (file.type === 'application/pdf') {
              // Gére les documents sous format PDF
              handlePDFFile(e.target.result);
            } else {
              // Gére les documents sous format .txt 
              onFileSelect(e.target.result);
            }
          };
    
          if (file.type === 'application/pdf') { // vérification du type de document
            reader.readAsArrayBuffer(file);
          } else {
            reader.readAsText(file);
          }
        }
      };
    
      return (
        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
          <Upload className="w-5 h-5 mr-2" />
          <span>Importer un fichier</span>
          <input
            type="file"
            onChange={handleFileChange}
            accept={acceptTypes}
            className="hidden"
          />
        </label>
      );
    };
    
export default FileUploadButton;