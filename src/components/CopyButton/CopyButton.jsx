import React, { useState } from 'react';

const CopyListButton = ({ items, label = "Copiar Lista", separator = "\n" }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!items || items.length === 0) return;

    const textToCopy = items.join(separator);

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
        ${isCopied 
          ? "bg-green-100 text-green-700 border border-green-200" 
          : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"}
      `}
    >
      {isCopied ? (
        <>
          {/* Ícone Check */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copiado!</span>
        </>
      ) : (
        <>
          {/* Ícone Lista/Copy */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          {/* <span>{label} ({items.length})</span> */}
        </>
      )}
    </button>
  );
};

export default CopyListButton;