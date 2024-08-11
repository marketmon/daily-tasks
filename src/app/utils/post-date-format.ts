export function formatPostDate(date: Date | string | undefined): string {
    if (!date) {
        return 'Invalid Date';
    }

    const dateData = new Date(date);

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isToday = dateData.toDateString() === now.toDateString();
    const isYesterday = dateData.toDateString() === yesterday.toDateString();

    if (isToday) {
        return 'Today';
    } else if (isYesterday) {
        return 'Yesterday';
    } else {
        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return dateData.toLocaleDateString("en-US", dateOptions);
    }
}


