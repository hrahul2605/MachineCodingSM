export const generateId = () => Math.random().toString(36).substr(2, 9);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    Food: '🍽️',
    Travel: '🚗',
    Shopping: '🛍️',
    Other: '📝',
  };
  return icons[category] || '📝';
};
