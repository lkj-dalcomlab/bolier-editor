import {EventHandler} from "./EventHandler.js";
import {EventType} from "./EventType.js";
import {DragPageEventHandler} from "./DragPageEventHandler.js";
import {MoveControlEventHandler} from "./MoveControlEventHandler.js";
import {CursorType} from "../editor/CursorType.js";

export class SelectEventHandler extends EventHandler {
    constructor() {
        super();
    }

    get type() {
        return EventType.SELECT;
    }

    onMouseDown(e) {
        let render = null;
        const page = e.editor.page;
        const controls = page.controls;
        for (const control of controls) {
            render = control.ptInSelectControl(e.point);
            if (render !== null) {
                break;
            }
        }

        if (render === null) {
            e.editor.setDragHandler(new DragPageEventHandler());
        } else {
            e.editor.setDragHandler(new MoveControlEventHandler());
        }

        page.selectControl = render;
        page.render();
    }

    onMouseMove(e) {
        const page = e.editor.page;
        page.coordinate.curPoint = {x: e.originEvent.offsetX, y: e.originEvent.offsetY};

        let render = null;
        const controls = page.controls;
        for (const control of controls) {
            render = control.ptInHoverControl(e.point);
            if (render !== null) {
                break;
            }
        }

        if (page.selectControl !== null && render !== null) {
            page.setCursor(CursorType.MOVE);
        } else {
            page.setCursor(CursorType.DEFAULT);
        }

        page.hoverControl = render;
        page.render();
    }

    onMouseUp(e) {
    }

    onMouseWheel(e) {
    }

    onKeyDown(e) {
        console.log(e.originEvent.key);
    }

    onKeyUp(e) {
    }
}