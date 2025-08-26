import React from 'react';
import Checkbox from '../../shared/Checkbox';
import { RecommendationTypes } from '../../../constants/recommendationTypes';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value= {RecommendationTypes.SINGLE}
          onChange={() => onRecommendationTypeChange(RecommendationTypes.SINGLE)}
          className="mr-2"
        />
        <label htmlFor={RecommendationTypes.SINGLE} className="mr-4">Produto Único</label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value={RecommendationTypes.MULTIPLE}
          defaultChecked
          onChange={() => onRecommendationTypeChange(RecommendationTypes.MULTIPLE)}
          className="mr-2"
        />
        <label htmlFor={RecommendationTypes.MULTIPLE} >Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
