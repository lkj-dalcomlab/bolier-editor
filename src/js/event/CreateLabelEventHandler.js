import {EventHandler} from "./EventHandler.js";
import {EventType} from "./EventType.js";
import {CreateLabelRender} from "../editor/control/render/CreateLabelRender.js";
import {TextEditor} from "../editor/text/TextEditor.js";

export class CreateLabelEventHandler extends EventHandler {
    constructor(editor) {
        super();
        this.label = editor.page.newControl;
        this.editor = editor;
        editor.addForegroundRender(new CreateLabelRender(this.label));
        this.isDown = false;
    }

    get type() {
        return EventType.CREATE_LABEL;
    }

    onMouseDown(e) {
        if (this.isDown) {
            this.editor.removeForegroundRender();
            this.editor.clearCommand();
            if (this.label.text === '') {
                return;
            }
            this.label.updatePosition();
            e.editor.page.addControl(this.label);
            return;
        }
        this.isDown = true;
        this.label.lt.x = e.point.x;
        this.label.lt.y = e.point.y;

        TextEditor.getInstance().show(e.point);
    }

    onMouseMove(e) {
        super.onMouseMove(e);
    }

    onMouseUp(e) {
        super.onMouseUp(e);
    }

    onMouseWheel(e) {
        super.onMouseWheel(e);
    }

    onKeyDown(e) {
        // const regex = /^[a-zA-Z0-9]$/;
        // const key = e.originEvent.key;
        // if (regex.test(key)) {
        //     let text = this.label.text;
        //     console.log(text);
        //     text += key;
        //     this.label.text = text;
        //     e.editor.render();
        // }
        //
        // console.log(key);
    }

    onKeyUp(e) {

    }
}