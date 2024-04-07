import { ButtonBar } from './ButtonBar.js';
import { ClipListContainer } from './ClipListContainer.js';

export class View {
    clipList = null;
    clipListContainer = new ClipListContainer();
    buttonBar = new ButtonBar();

    constructor (clipList) {
        this.clipList = clipList;
        document.addEventListener('updateView', () => { this.updateView(); });
        this.updateView();
    }

    updateView () {
        this.clipListContainer.showClips(this.clipList);
        this.buttonBar.updateButtonStatus(
            this.clipList.countSelected(),
            this.clipList.count()
        );
    }
}
