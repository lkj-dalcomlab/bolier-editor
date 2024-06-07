import {EventHandler} from "./EventHandler.js";
import {EventType} from "./EventType.js";

export class SelectEventHandler extends EventHandler {

    get type() {
        return EventType.SELECT;
    }

    onMouseDown(e) {
    }

    onMouseMove(e) {
        const page = e.editor.page;
        page.coordinate.curPoint = {x: e.originEvent.offsetX, y: e.originEvent.offsetY};

        const controls = page.controls;
        for (const control of controls) {
            const render = control.ptInHoverControl(e.point);
            if (render !== null) {
                page.hoverControl = render;
                page.render();
                console.log('render');
                return;
            }
        }

        page.hoverControl = null;
    }

    onMouseUp(e) {
    }

    onMouseWheel(e) {
    }

    onKeyDown(e) {
    }

    onKeyUp(e) {
    }
}