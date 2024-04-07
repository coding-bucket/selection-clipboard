import test from 'ava';
import { Order } from '../src/model/Order.js';
import { ClipList } from '../src/model/ClipList.js';
import { ClipMemoryStorage } from './ClipMemoryStorage.js';
import { Clip } from '../src/model/Clip.js';

function setStorage (clips) {
    const storage = new ClipMemoryStorage();
    storage.setClips(clips);
    return storage;
}

function data () {
    return [
        new Clip(0, 'value1', 'url1', 0),
        new Clip(1, 'value2', 'url2', 1),
        new Clip(2, 'value3', 'url3', 2),
        new Clip(3, 'value4', 'url4', 3),
        new Clip(4, 'value5', 'url5', 4),
        new Clip(5, 'value6', 'url6', 5),
        new Clip(6, 'value7', 'url7', 6)
    ];
}

test('get order', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.is(model.getOrder(), Order.NEWEST_UP);
});

test('get order with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    t.is(model.getOrder(), Order.NEWEST_DOWN);
});

test('create clip', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    const clip = model.create('value8', 'url8', 0);
    t.is(clip.value, 'value8');
    t.is(clip.url, 'url8');
    t.is(clip.order, 7);
    t.is(clip.selected, 0);
    t.is(clip.expanded, false);
});

test('create clip with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    const clip = model.create('value8', 'url8', 0);
    t.is(clip.value, 'value8');
    t.is(clip.url, 'url8');
    t.is(clip.order, 7);
    t.is(clip.selected, 0);
    t.is(clip.expanded, false);
});

test('get clip from clip list by key', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    const clip = model.get(0);
    t.is(clip.key, 0);
    t.is(clip.value, 'value1');
});

test('get throws IllegalArgumentException when clip is not found', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.get(100);
        },
        { instanceOf: Error, message: 'RuntimeException: Clip not found' }
    );
});

test('get throws IllegalArgumentException when key is undefined', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.get();
        },
        {
            instanceOf: Error,
            message: 'IllegalArgumentException: key is undefined'
        }
    );
});

test('get selected clips', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.select(0, 1);
    model.select(1, 1);
    model.select(2, 0);
    const clips = model.getSelected();
    t.is(clips.length, 2);
    t.is(clips[1].key, 0);
    t.is(clips[0].key, 1);
});

test('get selected clips with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    model.select(0, 1);
    model.select(1, 1);
    model.select(2, 0);
    const clips = model.getSelected();
    t.is(clips.length, 2);
    t.is(clips[0].key, 0);
    t.is(clips[1].key, 1);
});

test('delete clip', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.deleteClip(0);
    t.throws(
        () => {
            model.get(0);
        },
        { instanceOf: Error, message: 'RuntimeException: Clip not found' }
    );
});

test('delete clip throws IllegalArgumentException when key is undefined', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.deleteClip();
        },
        {
            instanceOf: Error,
            message: 'IllegalArgumentException: key is undefined'
        }
    );
});

test('delete clip throws IllegalArgumentException when clip is not found', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.deleteClip(100);
        },
        { instanceOf: Error, message: 'RuntimeException: Clip not found' }
    );
});

test('delete clips', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.select(0, 1);
    model.select(1, 1);
    model.select(2, 0);
    model.delete([0, 1]);
    const clips = model.getSelected();
    t.is(clips.length, 0);
});

test('delete clips throws IllegalArgumentException when keys is undefined', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.delete();
        },
        {
            instanceOf: Error,
            message: 'IllegalArgumentException: keys is undefined'
        }
    );
});

test('delete clips throws IllegalArgumentException when clip is not found', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.delete([100]);
        },
        { instanceOf: Error, message: 'RuntimeException: Clip not found' }
    );
});

test('select clip', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.select(0, 1);
    const clip = model.get(0);
    t.is(clip.selected, 1);
});

test('select clip throws IllegalArgumentException when key is undefined', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.select();
        },
        {
            instanceOf: Error,
            message: 'IllegalArgumentException: key is undefined'
        }
    );
});

test('select clip throws IllegalArgumentException when clip is not found', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.select(100);
        },
        { instanceOf: Error, message: 'RuntimeException: Clip not found' }
    );
});

test('select all clips', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.selectAll(1);
    const clips = model.getSelected();
    t.is(clips.length, 7);
});

test('deselect all clips', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.selectAll(false);
    const clips = model.getSelected();
    t.is(clips.length, 0);
});

test('select all clips with select undefined', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.selectAll();
    const clips = model.getSelected();
    t.is(clips.length, 0);
});

test('expand clip', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.expandClip(0);
    const clip = model.get(0);
    t.is(clip.expanded, true);
});

test('expand clip throws IllegalArgumentException when key is undefined', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.expandClip();
        },
        {
            instanceOf: Error,
            message: 'IllegalArgumentException: key is undefined'
        }
    );
});

test('expand clip throws IllegalArgumentException when clip is not found', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    t.throws(
        () => {
            model.expandClip(100);
        },
        { instanceOf: Error, message: 'RuntimeException: Clip not found' }
    );
});

test('translate visual order to real order', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    const order = model.translateVisualOrderToRealOrder(0);
    t.is(order, data().length - 1);
});

test('translate visual order to real order with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    const order = model.translateVisualOrderToRealOrder(0);
    t.is(order, 0);
});

test('move clip up', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.moveClip(1, 2);
    t.is(model.get(6).order, 6);
    t.is(model.get(4).order, 5);
    t.is(model.get(5).order, 4);
    t.is(model.get(3).order, 3);
});

test('move clip up with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    model.moveClip(1, 2);
    t.is(model.get(0).order, 0);
    t.is(model.get(2).order, 1);
    t.is(model.get(1).order, 2);
    t.is(model.get(3).order, 3);
});

test('move clip down', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.moveClip(3, 1);
    t.is(model.get(6).order, 6);
    t.is(model.get(3).order, 5);
    t.is(model.get(5).order, 4);
    t.is(model.get(4).order, 3);
    t.is(model.get(2).order, 2);
});

test('move clip down with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    model.moveClip(3, 1);
    t.is(model.get(0).order, 0);
    t.is(model.get(3).order, 1);
    t.is(model.get(1).order, 2);
    t.is(model.get(2).order, 3);
    t.is(model.get(4).order, 4);
});

test('toggle order', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage);
    model.init();
    model.toggleOrder();
    t.is(model.getOrder(), Order.NEWEST_DOWN);
});

test('toggle order with order NEWEST_DOWN', (t) => {
    const storage = setStorage(data());
    const model = new ClipList(storage, Order.NEWEST_DOWN);
    model.init();
    model.toggleOrder();
    t.is(model.getOrder(), Order.NEWEST_UP);
});
