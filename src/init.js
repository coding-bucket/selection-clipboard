import { ClipList } from './model/ClipList.js';
import { View } from './view/View.js';
import { Controller } from './controller/Controller.js';
import { PrefsLocalStorage } from './storage/PrefsLocalStorage.js';
import { ClipLocalStorage } from './storage/ClipLocalStorage.js';
import { storageAvailable } from './helper.js';

if (!storageAvailable()) {
    document.getElementById('error-message').innerText +=
        'Local storage not available.';
} else {
    init();
}

function init () {
    const prefs = new PrefsLocalStorage();
    const clipStorage = new ClipLocalStorage();
    const model = new ClipList(clipStorage, prefs.getOrder());
    model.init();

    // eslint-disable-next-line no-unused-vars
    const controller = new Controller(model, prefs);

    // eslint-disable-next-line no-unused-vars
    const view = new View(model);
}
