import {EventHandler} from "./EventHandler.js";
import {EventType} from "./EventType.js";
import {Circle} from "../editor/control/Circle.js";
import {CreateCircleRender} from "../editor/CreateCircleRender.js";
import {ControlUtil} from "../editor/control/ControlUtil.js";

export class CreateCircleEventHandler extends EventHandler {
    constructor(editor) {
        super();
        this.editor = editor;
        this.circle = new Circle();
        editor.addForegroundRender(new CreateCircleRender(this.circle));
    }

    get type() {
        return EventType.CIRCLE;
    }

    onMouseDown(e) {
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
        console.log(this.circle.xRadius, this.circle.yRadius);
        this.editor.render();
    }

    onMouseUp(e) {
        ControlUtil.checkDragPosition(this.circle, e.downPoint, e.point);
        this.editor.removeForegroundRender();
        this.editor.clearCommand();
        e.editor.page.addControl(this.circle);
    }
}