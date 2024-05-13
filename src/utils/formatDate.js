export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return `Сегодня, ${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })}`;
  }
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера, ${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })}`;
  }

  return `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })}`;
};
