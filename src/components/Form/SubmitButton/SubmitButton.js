import React from 'react';

function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
