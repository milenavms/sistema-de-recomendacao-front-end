import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData) => {
    const recommendation = recommendationService.getRecommendations(formData, products);
    setRecommendations(recommendation);
    return recommendation;
  };

  return { recommendations, getRecommendations};
}

export default useRecommendations;
