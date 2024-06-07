import {EventHandler} from "./EventHandler.js";
import {EventType} from "./EventType.js";
import {Circle} from "../editor/control/Circle.js";
import {CreateCircleRender} from "../editor/CreateCircleRender.js";

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
        const painter = e.editor.page.painter;
        if (!e.down) {
            this.circle.setPosition(e.point);

        } else {
            const p1 = e.downPoint;
            const p2 = e.point;


            const p = { x: p1.x + p2.x / 2, y: p1.y + p2.y / 2};
            this.circle.p.x = p.x;
            this.circle.p.y = p.y;
            const width = Math.abs(p2.x - p1.x);
            const height = Math.abs(p2.y - p1.y);
            this.circle.radius = Math.min(width, height) / 2;
        }
        this.editor.render();
    }

    onMouseUp(e) {
        if (Math.abs(e.downPoint.x - e.point.x) <= 5 &&
            Math.abs(e.downPoint.y - e.point.y) <= 5) {
            this.circle.setPosition(e.point);
        }
        this.editor.removeForegroundRender();
        this.editor.clearCommand();
        e.editor.page.addControl(this.circle);
    }
}