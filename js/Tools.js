import {CreateLine} from "./command/CreateLine.js";
import {CreateRect} from "./command/CreateRect.js";
import {CommandManager} from "./command/CommandManager.js";
import {DefaultCommand} from "./command/DefaultCommand.js";
import {CreateTriangle} from "./command/CreateTriangle.js";
import {CreateCircle} from "./command/CreateCircle.js";

export class Tools {
    constructor(editor) {
        this.commandManager = new CommandManager();
        this.createLine = () => {
            this.commandManager.execute(new CreateLine(editor));
        };

        this.createRect = () => {
            this.commandManager.execute(new CreateRect(editor));
        };

        this.createTriangle = () => {
            this.commandManager.execute(new CreateTriangle(editor));
        };

        this.createCircle = () => {
            this.commandManager.execute(new CreateCircle(editor));
        };

        this.clear = () => {
            this.commandManager.execute(new DefaultCommand(editor));
        };

        this.commandManager.execute(new DefaultCommand(editor));
    }
}