import { Clip } from './Clip.js';
import { Order } from './Order.js';

export class ClipList {
    clips = [];
    order;
    clipStorage;

    constructor (clipStorage, order = Order.NEWEST_UP) {
        this.order = order;
        this.clipStorage = clipStorage;
    }

    init () {
        const clips = this.clipStorage.loadAll();
        this.clips = clips.sort((a, b) => {
            return a.order - b.order;
        });
    }

    count () {
        return this.clips.length;
    }

    countSelected () {
        return this.getSelected().length;
    }

    getOrder () {
        return this.order;
    }

    create (value, url, selected = false) {
        const order = this.clips.length;
        const clip = new Clip(null, value, url, order, selected, false);
        this.clipStorage.save(clip);
        this.clips.push(clip); // todo: sort in case of merging
        return clip;
    }

    get (key) {
        if (key === undefined) { throw new Error('IllegalArgumentException: key is undefined'); }
        const clips = this.clips.filter((clip) => clip.key === key);
        if (clips.length !== 1) {
            throw new Error('RuntimeException: Clip not found');
        }
        return clips[0];
    }

    getSelected () {
        const selectedClips = this.clips.filter((clip) => clip.selected);
        return this.order === Order.NEWEST_DOWN
            ? selectedClips
            : selectedClips.reverse();
    }

    delete (keys) {
        if (keys === undefined) { throw new Error('IllegalArgumentException: keys is undefined'); }
        keys.forEach((key) => this.deleteClip(key));
    }

    deleteClip (key) {
        const clip = this.get(key);
        const order = clip.order;
        for (let i = order + 1; i < this.clips.length; i++) {
            const clipToStepDown = this.clips[i];
            this.positionClipAt(clipToStepDown, i - 1);
        }
        this.clips.pop();
        this.clipStorage.delete(key);
    }

    select (key, select) {
        const clip = this.get(key);
        clip.selected = select;
        this.clipStorage.save(clip);
    }

    selectAll (select) {
        this.clips.forEach((clip) => {
            clip.selected = select;
            this.clipStorage.save(clip);
        });
    }

    expandClip (key) {
        const clip = this.get(key);
        clip.expanded = !clip.expanded;
        this.clipStorage.save(clip);
    }

    translateVisualOrderToRealOrder (visualOrder) {
        if (this.order === Order.NEWEST_DOWN) return visualOrder;
        return this.clips.length - visualOrder - 1;
    }

    moveClip (oldIndex, newIndex) {
        oldIndex = this.translateVisualOrderToRealOrder(oldIndex);
        newIndex = this.translateVisualOrderToRealOrder(newIndex);

        if (oldIndex === newIndex) return;

        const movingClip = this.clips[oldIndex];

        if (newIndex < oldIndex) {
            for (let i = oldIndex - 1; i >= newIndex; i--) {
                const clipUp = this.clips[i];
                this.positionClipAt(clipUp, i + 1);
            }
        } else {
            for (let i = oldIndex + 1; i <= newIndex; i++) {
                const clipDown = this.clips[i];
                this.positionClipAt(clipDown, i - 1);
            }
        }

        this.positionClipAt(movingClip, newIndex);
    }

    positionClipAt (clip, order) {
        clip.order = order;
        this.clipStorage.save(clip);
        this.clips[order] = clip;
    }

    toggleOrder () {
        this.order =
            this.order === Order.NEWEST_UP
                ? Order.NEWEST_DOWN
                : Order.NEWEST_UP;
    }

    [Symbol.iterator] () {
        const clips = this.clips;
        const order = this.getOrder();
        let index = order === Order.NEWEST_DOWN ? 0 : clips.length - 1;

        return {
            next: function () {
                if (order === Order.NEWEST_DOWN && index < clips.length) {
                    return { value: clips[index++], done: false };
                }
                if (order === Order.NEWEST_UP && index >= 0) {
                    return { value: clips[index--], done: false };
                }
                return { done: true };
            }
        };
    }
}
