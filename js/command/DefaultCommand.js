import {Command} from "./Command.js";
import {PageEventHandler} from "../event/PageEventHandler.js";

export class DefaultCommand extends Command {
    constructor(editor) {
        super();
        this.editor = editor;
        this.handler = new PageEventHandler();
    }

    active() {
        this.editor.addEventHandler(this.handler);
    }

    deActive() {
        this.editor.removeEventHandler(this.handler);
    }
}