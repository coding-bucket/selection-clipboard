import { ClipContainer } from './ClipContainer.js';

export class ClipListContainer {
    clipListNode = document.getElementById('clips');

    constructor () {
        const fireOnMove = (e) => document.dispatchEvent(
            new CustomEvent('moveClip', { detail: { oldIndex: e.oldIndex, newIndex: e.newIndex } })
        );
        // eslint-disable-next-line no-undef
        Sortable.create(this.clipListNode, { onEnd: fireOnMove });
    }

    showClips (clipList) {
        this.clipListNode.innerHTML = '';
        for (const clip of clipList) {
            const clipNode = (new ClipContainer(clip)).clipNode;
            this.clipListNode.append(clipNode);
        }
    }
}
