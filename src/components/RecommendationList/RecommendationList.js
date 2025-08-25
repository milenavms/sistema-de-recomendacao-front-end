import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div className='bg-gray-50  max-w-md mx-auto p-4 bg-white rounded-lg shadow-md'>
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2">
            {recommendation.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;
