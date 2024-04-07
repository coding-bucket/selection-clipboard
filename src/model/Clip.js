export class Clip {
    key = null;
    value = null;
    url = null;
    order = null;
    selected = '0';
    expanded = false;

    constructor (key, value, url, order, selected = false, expanded = false) {
        this.key = key ?? Date.now().toString();
        this.value = value;
        this.url = url;
        this.order = order;
        this.selected = selected;
        this.expanded = expanded;
    }

    hasUrl () {
        return typeof this.url === 'string' && this.url.length > 0;
    }

    toText (withUrl) {
        const optionalUrl =
            withUrl && this.url !== null && this.url.length > 0
                ? this.url + '\n'
                : '';
        return this.value + '\n' + optionalUrl;
    }

    isCollapsable () {
        return this.value.length > 400 || this.value.split('\n').length > 8;
    }

    getCollapsedText (maxCharacters = 400, maxLines = 8) {
        const text = this.value;
        const lines = text.split('\n');
        const shortenedLines = lines.slice(0, maxLines);
        const shortenedText = shortenedLines.join('\n');
        if (lines.length > maxLines) {
            return shortenedText + '\n...';
        }
        if (shortenedText.length > maxCharacters) {
            return shortenedText.slice(0, maxCharacters) + '...';
        }
        return shortenedText;
    }
}
