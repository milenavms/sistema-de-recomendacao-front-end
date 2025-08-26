import { RecommendationTypes } from '../constants/recommendationTypes';

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const prefSet = new Set(selectedPreferences);
  const featSet = new Set(selectedFeatures);

  if (selectedRecommendationType === RecommendationTypes.SINGLE) {
  const matchedProducts = products.filter(product =>
    product.preferences.some(pref => prefSet.has(pref)) ||
    product.features.some(feat => featSet.has(feat))
  );

  const single = matchedProducts[matchedProducts.length - 1];
  return single ? [single] : [];
}

  const filteredProductsAll = products.filter(product =>
    product.preferences.some(pref => prefSet.has(pref)) ||
    product.features.some(feat => featSet.has(feat))
  );

  return filteredProductsAll;

};

export default { getRecommendations };
