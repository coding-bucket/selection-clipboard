export class ClipMemoryStorage {
    clipsMap = new Map();

    loadAll () {
        return [...this.clipsMap.values()];
    }

    save (clip) {
        this.clipsMap.set(clip.key, clip);
    }

    delete (key) {
        this.clipsMap.delete(key);
    }

    load (key) {
        return this.clipsMap.get(key) ?? null;
    }

    setClips (clips) {
        clips.forEach((clip) => this.clipsMap.set(clip.key, clip));
    }
}
