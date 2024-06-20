import {EventHandler} from "./EventHandler.js";
import {CreateImageRender} from "../editor/control/render/CreateImageRender.js";
import {EventType} from "./EventType.js";
import {ControlUtil} from "../editor/control/ControlUtil.js";
import {ImageRect} from "../editor/control/ImageRect.js";

export class CreateImageEventHandler extends EventHandler {
    constructor(editor, image) {
        super();
        this.editor = editor;
        this.image = new ImageRect(image);
        editor.addForegroundRender(new CreateImageRender(this.image));
    }

    get type() {
        return EventType.IMAGE;
    }

    onMouseDown(e) {
    }

    onMouseMove(e) {
        const image = this.image;
        if (!e.down) {
            image.setPosition(e.point);
        } else {
            image.lt.x = e.downPoint.x;
            image.lt.y = e.downPoint.y;

            image.rt.x = e.point.x;
            image.rt.y = e.downPoint.y;

            image.rb.x = e.point.x;
            image.rb.y = e.point.y;

            image.lb.x = e.downPoint.x;
            image.lb.y = e.point.y;
        }
        this.editor.render();
    }

    onMouseUp(e) {
        ControlUtil.checkDragPosition(this.image, e.downPoint, e.point);
        this.image.updateSelectPosition();
        this.image.updatePointRatio();
        this.editor.removeForegroundRender();
        this.editor.clearCommand();
        e.editor.page.addControl(this.image);
    }
}