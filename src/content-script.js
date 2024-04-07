document.addEventListener('mouseup', (e) => {
    if (e.button !== 0) {
        return;
    }

    let selection = window.getSelection();

    if (selection === null) {
        return;
    }

    selection = selection.toString().trim();

    // If the selection is empty, try to get the selection from an input or textarea
    // element. This is useful for sites like GitHub.
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection#related_objects
    if (selection.length === 0) {
        const selectedElement = e.target;
        if (
            selectedElement.tagName === 'INPUT' ||
            selectedElement.tagName === 'TEXTAREA'
        ) {
            const selectionStart = selectedElement.selectionStart;
            const selectionEnd = selectedElement.selectionEnd;
            selection = selectedElement.value
                .substring(selectionStart, selectionEnd)
                .trim();
        }
    }

    if (selection.length === 0) {
        return;
    }

    browser.runtime
        .sendMessage({
            type: 'clipboard',
            content: selection,
            url: window.location.href
        })
        .then(
            () => {},
            (error) => console.error(`Error: ${error}`)
        );
});
