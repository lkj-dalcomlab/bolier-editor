import {EventHandler} from "./EventHandler.js";
import {EventType} from "./EventType.js";
import {Circle} from "../editor/control/Circle.js";
import {ControlUtil} from "../editor/control/ControlUtil.js";
import {CreateCircleRender} from "../editor/control/render/CreateCircleRender.js";

export class CreateCircleEventHandler extends EventHandler {
    constructor(editor) {
        super();
        this.editor = editor;
        this.circle = new Circle();
        editor.addForegroundRender(new CreateCircleRender(this.circle));
    }

    get type() {
        return EventType.CREATE_CIRCLE;
    }

    onMouseDown(e) {
        e.editor.page.selectControl = null;
    }

    onMouseMove(e) {
        if (!e.down) {
            this.circle.setPosition(e.point);
        } else {
            this.circle.lt.x = e.downPoint.x;
            this.circle.lt.y = e.downPoint.y;

            this.circle.rt.x = e.point.x;
            this.circle.rt.y = e.downPoint.y;

            this.circle.rb.x = e.point.x;
            this.circle.rb.y = e.point.y;

            this.circle.lb.x = e.downPoint.x;
            this.circle.lb.y = e.point.y;
        }
        this.editor.render();
    }

    onMouseUp(e) {
        ControlUtil.checkDragPosition(this.circle, e.downPoint, e.point);
        this.editor.removeForegroundRender();
        this.editor.clearCommand();
        e.editor.page.addControl(this.circle);
    }
}