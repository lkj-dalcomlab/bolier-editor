import {EventHandler} from "./EventHandler.js";
import {CreateTriangleRender} from "../editor/CreateTriangleRender.js";
import {Triangle} from "../editor/control/Triangle.js";
import {EventType} from "./EventType.js";
import {ControlUtil} from "../editor/control/ControlUtil.js";

export class CreateTriangleEventHandler extends EventHandler {
    constructor(editor) {
        super();
        this.editor = editor;
        this.triangle = new Triangle();
        editor.addForegroundRender(new CreateTriangleRender(this.triangle));
    }


    get type() {
        return EventType.TRIANGLE;
    }

    onMouseMove(e) {
        if (!e.down) {
            this.triangle.setPosition(e.point);
        } else {
            const width = e.point.x - e.downPoint.x;

            this.triangle.top.x = e.downPoint.x + width/2;
            this.triangle.top.y = e.downPoint.y;
            this.triangle.left.x = e.downPoint.x;
            this.triangle.left.y = e.point.y;
            this.triangle.right.x = e.point.x;
            this.triangle.right.y = e.point.y;
        }
        e.editor.render();
    }

    onMouseUp(e) {
        ControlUtil.checkDragPosition(this.triangle, e.downPoint, e.point);
        this.editor.removeForegroundRender();
        this.editor.clearCommand();
        e.editor.page.addControl(this.triangle);
    }

    onKeyUp(e) {
        super.onKeyUp(e);
    }
}