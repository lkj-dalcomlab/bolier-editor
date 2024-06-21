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
        const toolbarWrap = document.createElement('div');
        toolbarWrap.className = 'flex w-52 m-2';
        const toolbar = document.createElement('div');
        toolbar.id = 'toolbar';
        toolbarWrap.appendChild(toolbar);
        root.appendChild(toolbarWrap);
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
        toolbar.className =
            'pointer-events-auto flex items-center rounded-md border border-slate-200 ' +
            'shadow-sm bg-background text-foreground relative gap-0.5 p-0.5 p-1 pl-3 pr-3';
        const lineBtn = this.#createButton('./icon/line.png', 'Q', () => {
            this._tools.createLine();
        });
        const rectBtn = this.#createButton('./icon/rect.png', 'W', () => {
            this._tools.createRect();
        });
        const triangleBtn = this.#createButton('./icon/triangle.png', 'E', () => {
            this._tools.createTriangle();
        });
        const circleBtn = this.#createButton('./icon/circle.png', 'R', () => {
            this._tools.createCircle();
        });
        const imageBtn = this.#createButton('./icon/image.png', 'T', () => {
            this._tools.createImage();
        });
        toolbar.appendChild(lineBtn);
        toolbar.appendChild(rectBtn);
        toolbar.appendChild(triangleBtn);
        toolbar.appendChild(circleBtn);
        toolbar.appendChild(imageBtn);

        const seperator = document.createElement('div');
        seperator.className = 'shrink-0 bg-border h-full w-[1px] dark:bg-gray-300';
        seperator.role = 'none';
        toolbar.appendChild(seperator);
    }

    #createButton(imgSrc, shortCutKey, clickEvent) {
        const btnWrap = document.createElement('div');
        btnWrap.className = 'relative flex item-center justify-center mr-1';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'w-5 h-5 mr-2';

        const btn = document.createElement('button');
        btn.className = 'w-8 h-8 inline-flex items-center justify-center rounded hover:bg-slate-200';
        btn.addEventListener('click', clickEvent);

        const shortcutBtn = document.createElement('div');
        shortcutBtn.className = 'w-2 h-3 items-center justify-center absolute right-0 bottom-0 text-[8px] opacity-40';
        shortcutBtn.textContent = shortCutKey;

        btn.appendChild(img);
        btnWrap.appendChild(btn);
        btnWrap.appendChild(shortcutBtn);
        return btnWrap;
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