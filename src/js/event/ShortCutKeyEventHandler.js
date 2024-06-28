import {EventHandler} from "./EventHandler.js";
import {Line} from "../editor/control/Line.js";
import {Rect} from "../editor/control/Rect.js";
import {Triangle} from "../editor/control/Triangle.js";
import {Circle} from "../editor/control/Circle.js";

export class ShortCutKeyEventHandler extends EventHandler {
    constructor() {
        super();
    }

    onKeyDown(e) {
        switch (e.originEvent.key) {
            case 'q':
                e.editor.tools.createLine(e.point);
                break;
            case 'w':
                e.editor.tools.createRect(e.point);
                break;
            case 'e':
                e.editor.tools.createTriangle(e.point);
                break;
            case 'r':
                e.editor.tools.createCircle(e.point);
                break;
            case 't':
                e.editor.tools.createImage();
                break;
            case 'Escape':
                e.editor.tools.clear();
                break;
            default:
                console.log(e.originEvent.key);
                break;
        }
    }

    onKeyUp(e) {
    }
}