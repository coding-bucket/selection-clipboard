import { ClipboardSupport } from '../helper.js';

export class Controller {
    clipList = null;

    prefs = null;

    constructor (clipList, prefs) {
        this.clipList = clipList;
        this.prefs = prefs;
        document.addEventListener('deleteClips', (e) => this.deleteClips(e.detail.key));
        document.addEventListener('selectClip', (e) => this.selectClip(e.detail.key, e.detail.select));
        document.addEventListener('copyClip', (e) => this.copyClip(e.detail.key, e.detail.withUrl));
        document.addEventListener('selectAll', (e) => this.selectAll(e.detail.select));
        document.addEventListener('copyClips', (e) => this.copyClips(e.detail.withUrl));
        document.addEventListener('mergeClips', (e) => this.mergeClips(e.detail.withUrl));
        document.addEventListener('expandClip', (e) => this.expandClip(e.detail.key));
        document.addEventListener('moveClip', (e) => this.moveClip(e.detail.oldIndex, e.detail.newIndex));
        document.addEventListener('toggleOrder', () => this.toggleOrder());
    }

    copyClip (key, withUrl) {
        const clip = this.clipList.get(key);
        const text = clip.toText(withUrl);
        ClipboardSupport.write(text);
    }

    copyClips (withUrl) {
        const clips = this.clipList.getSelected();
        const text = this.combineClipTexts(clips, withUrl);
        ClipboardSupport.write(text);
    }

    deleteClips (key) {
        if (key !== null) {
            this.clipList.delete([key]);
            this.updateView();
            return;
        }
        const clips = this.clipList.getSelected();
        const clipKeys = clips.map((clip) => clip.key);
        this.clipList.delete(clipKeys);
        this.updateView();
    }

    selectClip (key, select) {
        this.clipList.select(key, select);
        this.updateView();
    }

    selectAll (select) {
        this.clipList.selectAll(select);
        this.updateView();
    }

    mergeClips (withUrl) {
        const selectedClips = this.clipList.getSelected();
        if (selectedClips.length < 2) {
            return;
        }

        const text = this.combineClipTexts(selectedClips, withUrl);
        this.clipList.create(text, '', true);
        const selectedKeys = selectedClips.map((clip) => clip.key);
        this.clipList.delete(selectedKeys);
        this.updateView();
    }

    combineClipTexts (clips, withUrl) {
        let text = '';
        for (let i = 0; i < clips.length; i++) {
            const clip = clips[i];
            text += i === 0 ? '' : '\n';
            text += clip.toText(withUrl);
        }
        return text;
    }

    expandClip (key) {
        this.clipList.expandClip(key);
        this.updateView();
    }

    moveClip (oldIndex, newIndex) {
        this.clipList.moveClip(oldIndex, newIndex);
        this.updateView();
    }

    toggleOrder () {
        this.prefs.toggleOrder();
        this.clipList.toggleOrder();
        this.updateView();
    }

    updateView () {
        document.dispatchEvent(new CustomEvent('updateView'));
    }
}
