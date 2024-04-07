import { shortenBy } from '../helper.js';

export class ClipContainer {
    clipNode;
    clip;

    constructor (clip) {
        this.clip = clip;
        const template = document.getElementById('clipTemplate');
        const node = template.content.cloneNode(true);
        this.clipNode = node.querySelector('.clip');
        this.clipNode.dataset.id = clip.key;
        this.clipNode.dataset.selected = clip.selected ? '1' : '0';

        if (clip.isCollapsable()) {
            this.setTextWithExpansion();
        } else {
            this.setTextWithoutExpansion();
        }

        this.addListeners();
        this.setBottomRow();
    }

    setTextWithExpansion () {
        const textNode = this.clipNode.querySelector('.clip-text');
        const expandButton = this.clipNode.querySelector('.expand-icon');
        expandButton.style.display = 'inline-block';

        if (this.clip.expanded) {
            textNode.innerText = this.clip.value;
            expandButton.innerHTML = '&#11207;';
        } else {
            textNode.innerText = this.clip.getCollapsedText();
            expandButton.innerHTML = '&#11208;';
        }

        this.dispatchEventOnClick(expandButton, 'expandClip', {});
    }

    setTextWithoutExpansion () {
        const textNode = this.clipNode.querySelector('.clip-text');
        const expandButton = this.clipNode.querySelector('.expand-icon');
        textNode.innerText = this.clip.value;
        expandButton.style.display = 'none';
    }

    dispatchEventOnClick = (button, eventName, details) => {
        button.addEventListener('click', (e) => {
            const key = e.target.parentNode.parentNode.dataset.id;
            document.dispatchEvent(new CustomEvent(eventName, { detail: { ...details, key } }));
            e.stopPropagation();
        });
    };

    addListeners () {
        const copyButton = this.clipNode.querySelector('.clip-button.copy');
        this.dispatchEventOnClick(copyButton, 'copyClip', { withUrl: false });

        const copyWithUrlButton = this.clipNode.querySelector('.clip-button.copy-with-url');
        if (!this.clip.hasUrl()) {
            copyWithUrlButton.style.display = 'none';
        } else {
            this.dispatchEventOnClick(copyWithUrlButton, 'copyClip', { withUrl: true });
        }

        const deleteButton = this.clipNode.querySelector('.clip-button.delete');
        this.dispatchEventOnClick(deleteButton, 'deleteClips', {});

        this.clipNode.addEventListener('click', (e) => {
            if (e.target.classList.contains('url') || e.target.classList.contains('expand-icon')) {
                return;
            }
            const clickedDiv = e.currentTarget;
            const key = clickedDiv.dataset.id;
            const selected = clickedDiv.dataset.selected !== '1';
            document.dispatchEvent(new CustomEvent('selectClip', { detail: { key, select: selected } })
            );
        });
    }

    setBottomRow () {
        const url = this.clip.hasUrl() ? this.clip.url : null;
        if (!this.clip.hasUrl()) {
            this.clipNode.querySelector('.bottom-row').style.display = 'none';
        } else {
            const source = this.clipNode.querySelector('a');
            source.href = url;
            source.innerText = shortenBy(url, 70, '...');
        }
    }
}
