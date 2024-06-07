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
            const p1 = e.downPoint;
            const p2 = e.point;

            const width = p2.x - p1.x;
            const height = p2.y - p1.y;
            const p = { x: p1.x + width / 2, y: p1.y + height / 2};
            this.circle.p.x = p.x;
            this.circle.p.y = p.y;
            this.circle.xRadius = Math.abs(width) / 2;
            this.circle.yRadius = Math.abs(height) / 2;
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