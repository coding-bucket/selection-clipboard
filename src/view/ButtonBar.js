export class ButtonBar {
    selectAllButton = document.getElementById('select-all-button');
    deselectAllButton = document.getElementById('deselect-all-button');
    copyButton = document.getElementById('copy-button');
    copyWithUrlButton = document.getElementById('copy-with-url-button');
    mergeButton = document.getElementById('merge-button');
    mergeWithUrlButton = document.getElementById('merge-with-url-button');
    deleteButton = document.getElementById('delete-button');
    toggleOrderButton = document.getElementById('toggle-order-button');

    constructor () {
        const setDispatch = (button, event) =>
            button.addEventListener('click', () =>
                document.dispatchEvent(event)
            );

        setDispatch(this.selectAllButton, new CustomEvent('selectAll', { detail: { select: true } }));
        setDispatch(this.deselectAllButton, new CustomEvent('selectAll', { detail: { select: false } }));
        setDispatch(this.copyButton, new CustomEvent('copyClips', { detail: { withUrl: false } }));
        setDispatch(this.copyWithUrlButton, new CustomEvent('copyClips', { detail: { withUrl: true } }));
        setDispatch(this.deleteButton, new CustomEvent('deleteClips', { detail: { key: null } }));
        setDispatch(this.mergeButton, new CustomEvent('mergeClips', { detail: { withUrl: false } }));
        setDispatch(this.mergeWithUrlButton, new CustomEvent('mergeClips', { detail: { withUrl: true } }));
        setDispatch(this.toggleOrderButton, new CustomEvent('toggleOrder', { detail: { withUrl: true } }));
    }

    updateButtonStatus (countSelected, countClips) {
        this.selectAllButton.disabled = countSelected === countClips;
        this.deselectAllButton.disabled = countSelected === 0;
        this.copyButton.disabled = countSelected < 1;
        this.copyWithUrlButton.disabled = countSelected < 1;
        this.mergeButton.disabled = countSelected < 2;
        this.mergeWithUrlButton.disabled = countSelected < 2;
        this.deleteButton.disabled = countSelected < 1;
        this.toggleOrderButton.disabled = countClips < 2;
    }
}
