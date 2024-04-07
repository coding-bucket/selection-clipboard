import { ClipboardSupport } from './helper.js';
import { ClipList } from './model/ClipList.js';
import { ClipLocalStorage } from './storage/ClipLocalStorage.js';

function addToClipList (text, url) {
    const clipLocalStorage = new ClipLocalStorage();
    const clipList = new ClipList(clipLocalStorage);
    clipList.init();
    clipList.create(text, url, false);
    ClipboardSupport.write(text);
}

browser.runtime.onMessage.addListener((request) => {
    if (request.type === 'clipboard') {
        addToClipList(request.content, request.url);
    }
});

function updateIcon () {
    const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const icon = matches
        ? './assets/icons/clipboard-dark.svg'
        : './assets/icons/clipboard-light.svg';
    browser.browserAction.setIcon({ path: icon });
}

// Update the icon when the user's color scheme changes
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', updateIcon);

// Update the icon when the extension is installed or updated
browser.runtime.onInstalled.addListener(updateIcon);
