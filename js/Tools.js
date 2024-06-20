import {CreateLine} from "./command/CreateLine.js";
import {CreateRect} from "./command/CreateRect.js";
import {CommandManager} from "./command/CommandManager.js";
import {DefaultCommand} from "./command/DefaultCommand.js";
import {CreateTriangle} from "./command/CreateTriangle.js";
import {CreateCircle} from "./command/CreateCircle.js";
import {CreateImage} from "./command/CreateImage.js";

export class Tools {
    constructor(editor) {
        this.editor = editor;
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

        this.createImage = () => {
            this.#imageOpen((img)=> {
                this.commandManager.execute(new CreateImage(this.editor, img));
            });
        }

        this.clear = () => {
            this.commandManager.execute(new DefaultCommand(editor));
        };

        this.commandManager.execute(new DefaultCommand(editor));
    }

    #imageOpen(execute) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';

        let img;
        input.addEventListener('change', (e) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image;
                img.onload = function() {
                    execute(img);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        });

        input.click();
        return img;
    }
}
