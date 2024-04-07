export function shortenBy (text, length, add) {
    return text.length > length ? text.substring(0, length) + add : text;
}

export function storageAvailable () {
    const testString = 'modernizr';
    try {
        localStorage.setItem(testString, testString);
        localStorage.removeItem(testString);
        return true;
    } catch (e) {
        return false;
    }
}

export class ClipboardSupport {
    static write (text) {
        navigator.clipboard.writeText(text).catch((error) => {
            console.error('Error writing to clipboard:', error);
        });
    }
}
