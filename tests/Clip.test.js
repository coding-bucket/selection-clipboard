import test from 'ava';
import { Clip } from '../src/model/Clip.js';

test('create clip', (t) => {
    const clip = new Clip(0, 'value', 'url', 0);
    t.is(clip.value, 'value');
    t.is(clip.url, 'url');
    t.is(clip.order, 0);
    t.is(clip.selected, false);
    t.is(clip.expanded, false);
});

test('has url', (t) => {
    const clip = new Clip(0, 'value', 'url', 0);
    t.is(clip.hasUrl(), true);
});

test('has url with empty string', (t) => {
    const clip = new Clip(0, 'value', '', 0);
    t.is(clip.hasUrl(), false);
});

test('has url with null', (t) => {
    const clip = new Clip(0, 'value', null, 0);
    t.is(clip.hasUrl(), false);
});

test('to text with url', (t) => {
    const clip = new Clip(0, 'value', 'url', 0);
    t.is(clip.toText(true), 'value\nurl\n');
});

test('to text without url', (t) => {
    const clip = new Clip(0, 'value', 'url', 0);
    t.is(clip.toText(false), 'value\n');
});

test('to text with empty url', (t) => {
    const clip = new Clip(0, 'value', '', 0);
    t.is(clip.toText(true), 'value\n');
});

test('to text with null url', (t) => {
    const clip = new Clip(0, 'value', null, 0);
    t.is(clip.toText(true), 'value\n');
});
