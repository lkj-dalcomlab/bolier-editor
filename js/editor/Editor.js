import {EventManager} from "../event/EventManager.js";
import {Page} from "./Page.js";
import {Tools} from "../Tools.js";

export class Editor {
    constructor(id, {width, height}) {
        this.canvas = document.createElement('canvas');
        this.canvas.style.border = 'solid 2px #000';
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext('2d');
        this.page = new Page(this.ctx);
        this.eventManager = new EventManager(this);
        this._tools = new Tools(this);

        this.foregroundRender = null;

        // this._undoManager = new UndoManager();

        const root = document.getElementById(id);
        this.#init(root);
    }

    #init(root) {
        const toolbar = document.createElement('div');
        toolbar.className = 'toolbar';
        root.appendChild(toolbar);
        root.appendChild(this.canvas);

        this.page.render();

        this.canvas.addEventListener('mousedown', (e)=> {
            this.eventManager.onMouseDown(e);
        });

        this.canvas.addEventListener('mousemove', (e)=> {
            this.eventManager.onMouseMove(e);
        });

        this.canvas.addEventListener('mouseup', (e)=> {
            this.eventManager.onMouseUp(e);
        });

        this.canvas.addEventListener('wheel', (e) => {
            this.eventManager.onMouseWheel(e);
        });

        document.addEventListener('keydown', (e) => {
            this.eventManager.onKeyDown(e);
        });

        document.addEventListener('keyup', (e) => {
            this.eventManager.onKeyUp(e);
        });

        this.#createToolbar(toolbar);
    }

    #createToolbar(toolbar) {
        const lineBtn = this.#createButton('draw line', () => {
            this._tools.createLine();
        });
        const rectBtn = this.#createButton('draw rect', () => {
            this._tools.createRect();
        });
        const triangleBtn = this.#createButton('draw triangle', () => {
            this._tools.createTriangle();
        });
        const circleBtn = this.#createButton('draw circle', () => {
            this._tools.createCircle();
        });
        toolbar.appendChild(lineBtn);
        toolbar.appendChild(rectBtn);
        toolbar.appendChild(triangleBtn);
        toolbar.appendChild(circleBtn);
    }

    #createButton(text, clickEvent) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.addEventListener('click', clickEvent);
        return btn;
    }

    capture() {
        this.#captureRender();
        const dataURL = this.canvas.toDataURL("image/png");

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas_image.png';
        link.click();
        this.render();
    }

    #captureRender() {
        this.page.captureRender();
    }

    addEventHandler(handler) {
        this.eventManager.addHandler(handler);
    }

    removeEventHandler(handler) {
        this.eventManager.removeHandler(handler);
    }

    addForegroundRender(render) {
        this.foregroundRender = render;
    }

    removeForegroundRender() {
        this.foregroundRender = null;
    }

    setDragHandler(handler) {
        this.eventManager.setDragHandler(handler);
    }

    clearDragHandler() {
        this.eventManager.clearDragHandler();
    }

    clearCommand() {
        this._tools.clear();
    }

    render() {
        this.page.render();
        this.foregroundRender?.render(this.page.painter);
    }

    get tools() {
        return this._tools;
    }

// get undoManager() {
    //     return this._undoManager;
    // }
}