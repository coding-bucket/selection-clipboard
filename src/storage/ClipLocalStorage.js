import { Clip } from '../model/Clip.js';

export class ClipLocalStorage {
    loadAll () {
        const clips = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (isNaN(parseInt(key))) continue; // skip prefs
            const clip = this.load(key);
            // let clip = Clip.load(key);
            clips[clip.order] = clip;
        }
        return clips;
    }

    save (clip) {
        const updatedJson = JSON.stringify(clip);
        localStorage.setItem(clip.key, updatedJson);
    }

    delete (key) {
        localStorage.removeItem(key);
    }

    load (key) {
        const json = localStorage.getItem(key);
        const clip = JSON.parse(json);
        return new Clip(
            key,
            clip.value,
            clip.url,
            clip.order,
            clip.selected,
            clip.expanded
        );
    }
}
