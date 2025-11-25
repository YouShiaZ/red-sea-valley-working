export const formatPrice = (value) => {
  if (!value && value !== 0) return '';
  return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

export const formatArea = (value) => `${value} m²`;
