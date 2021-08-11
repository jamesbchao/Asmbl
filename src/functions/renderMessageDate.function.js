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

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

export function renderMessageDate(date) {

    const now = new Date();

    const ld = new Date(date);
    const y = ld.getFullYear();
    const m = ld.getMonth();
    const d = ld.getDate();
    const day = ld.getDay();

    if (now.getFullYear() === y) {
        if (now.getMonth() === m) {
            if (now.getDate() === d) {
                return 'Today';
            } else if (now.getDate() === d + 1) {
                return 'Yesterday';
            }

            if (d > now.getDate() - 7) {
                return days[day] + ', ' + months[m] + ' ' + d;
            }   
        }
        return months[m] + ' ' + d;
    }

    return months[m] + ' ' + d + ', ' + y;

}