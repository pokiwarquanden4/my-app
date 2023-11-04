export function formatTimeAgo(timestamp: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        const formattedDate = timestamp.toLocaleString();
        return formattedDate;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}

export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['code-block', 'image'],

    [{ 'header': [] }],               // custom button values

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
];

export const toolBarSmallOptions = [
    ['bold', 'italic', 'underline', 'strike'],

    [{ 'header': [] }],

    [{ 'color': [] }],
    [{ 'font': [] }],
];
