const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const prefSet = new Set(selectedPreferences);
  const featSet = new Set(selectedFeatures);

  if (selectedRecommendationType === "SingleProduct") {
    const single = products.find(product =>
      product.preferences.some(pref => prefSet.has(pref)) ||
      product.features.some(feat => featSet.has(feat))
    );
    return single ? [single] : [];
  }

  const filteredProductsAll = products.filter(product =>
    product.preferences.some(pref => prefSet.has(pref)) ||
    product.features.some(feat => featSet.has(feat))
  );

  return filteredProductsAll;

};

export default { getRecommendations };
