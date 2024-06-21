import {EventHandler} from "./EventHandler.js";

export class ShortCutKeyEventHandler extends EventHandler {
    constructor() {
        super();
    }

    onKeyDown(e) {
        switch (e.originEvent.key) {
            case 'q':
                    e.editor.tools.createLine();
                break;
            case 'w':
                    e.editor.tools.createRect();
                break;
            case 'e':
                    e.editor.tools.createTriangle();
                break;
            case 'r':
                    e.editor.tools.createCircle();
                break;
            case 't':
                    e.editor.tools.createImage();
                break;
            default:
                console.log(e.originEvent.key);
                break;
        }
    }

    onKeyUp(e) {
    }
}