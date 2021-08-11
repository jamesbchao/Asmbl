const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function renderDate(date) {
    const localDate = new Date(date);
    const now = new Date();

    if (localDate.getFullYear() === now.getFullYear() &&
      localDate.getMonth() === now.getMonth()) {
      const datesDifference = now.getDate() - localDate.getDate();
      if (datesDifference < 1) {
        const hoursDifference = now.getHours() - localDate.getHours();
        if (hoursDifference < 1) {
          const minutesDifference = now.getMinutes() - localDate.getMinutes();
          if (minutesDifference < 1) return 'just now';
          if (minutesDifference === 1)
            return minutesDifference.toString() + ' minute ago';
          return minutesDifference.toString() + ' minutes ago';
        }
        if (hoursDifference === 1)
          return hoursDifference.toString() + ' hour ago';
        return hoursDifference.toString() + ' hours ago';
      }
      else if (datesDifference < 6) {
        if (datesDifference === 1)
          return datesDifference.toString() + ' day ago';
        return datesDifference.toString() + ' days ago';
      }
    }
    const month = months[localDate.getMonth()];
    const day = localDate.getDate().toString();
    if (localDate.getFullYear() === now.getFullYear()) {
      return month + ' ' + day;
    }
    return month + ' ' + day + ', ' + localDate.getFullYear();

}
