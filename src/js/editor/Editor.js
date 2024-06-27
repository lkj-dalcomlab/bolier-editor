import {EventManager} from "../event/EventManager.js";
import {Page} from "./Page.js";
import {Tools} from "../Tools.js";
import {ToolbarPosition, ToolbarUtil} from "./ToolbarUtil.js";
import {LineStyle} from "./control/LineStyle.js";

export class Editor {
    constructor(id, {width, height}) {
        const root = document.getElementById(id);
        root.className = 'm-5';


        this.canvas = document.createElement('canvas');
        this.canvas.style.border = 'solid 2px #000';
        this.canvas.width = width;
        this.canvas.height = height;

        root.appendChild(this.#createLineOptionToolbar());

        this.ctx = this.canvas.getContext('2d');
        this.page = new Page(this.ctx);
        this.eventManager = new EventManager(this);
        this._tools = new Tools(this);

        this.foregroundRender = null;

        // this._undoManager = new UndoManager();

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

        const separator = document.createElement('div');
        separator.className = 'shrink-0 bg-border h-full w-[1px] dark:bg-gray-300';
        separator.role = 'none';
        toolbar.appendChild(separator);
    }

    #createLineOptionToolbar() {
        const lineToolbar = document.createElement('div');
        lineToolbar.id = 'line-option';
        lineToolbar.className =
            'hidden pointer-events-auto flex items-center rounded-md border border-slate-200 ' +
            'shadow-sm bg-background bg-slate-100 text-foreground absolute gap-0.5 p-1';

        const lineWidthToolbar = this.#createLineWidthToolbar();
        const lineWidthBtn = this.#createButton('./icon/line_width.png', '', () => {
            ToolbarUtil.showLineWidthToolbar();
        });

        const lineStyleToolbar = this.#createLineStyleToolbar();
        const lineStyleBtn = this.#createButton('./icon/line_style.png', '', () => {
            ToolbarUtil.showLineStyleToolbar();
        });

        const lineColorToolbar = this.#createLineColorToolbar();
        const lineColorBtn = this.#createButton('./icon/line_color.png', '', () => {
            ToolbarUtil.showLineColorToolbar();
        });

        lineToolbar.appendChild(lineWidthBtn);
        lineToolbar.appendChild(lineStyleBtn);
        lineToolbar.appendChild(lineColorBtn);

        lineToolbar.appendChild(lineWidthToolbar);
        lineToolbar.appendChild(lineStyleToolbar);
        lineToolbar.appendChild(lineColorToolbar);
        return lineToolbar;
    }

    #createLineColorToolbar() {
        const lineColorToolbar = document.createElement('div');
        lineColorToolbar.id = 'line-color';
        lineColorToolbar.style.left = ToolbarPosition.LINE_COLOR_LEFT + 'px';
        lineColorToolbar.style.top = ToolbarPosition.TOOLBAR_TOP + 'px';
        lineColorToolbar.className = 'hidden absolute pointer-events-auto flex items-center rounded-md border border-slate-200 ' +
            'shadow-sm bg-background bg-slate-100 text-foreground flex gap-0.5 p-0.5 p-1 pl-3 pr-3';

        const colorSet = ['rgb(255,255,255)', 'rgb(0,0,0)','rgb(113,113,113)',
                                    'rgb(216,61,27)', 'rgb(236,145,38)', 'rgb(233,186,31)',
                                    'rgb(28,138,79)', 'rgb(14,136,224)', 'rgb(134,57,235)'];
        colorSet.forEach(color => {
            const colorBtn = this.#createCircleButton(color, ()=> {
                this.page.selectControl.control.lineColor = color;
                this.render();
            });
            lineColorToolbar.appendChild(colorBtn);
        });

        return lineColorToolbar;
    }

    #createLineStyleToolbar() {
        const lineStyleToolbar = document.createElement('div');
        lineStyleToolbar.id = 'line-style';
        lineStyleToolbar.style.left = ToolbarPosition.LINE_STYLE_LEFT + 'px';
        lineStyleToolbar.style.top = ToolbarPosition.TOOLBAR_TOP + 'px';
        lineStyleToolbar.className = 'hidden absolute pointer-events-auto flex items-center rounded-md border border-slate-200 ' +
            'shadow-sm bg-background bg-slate-100 text-foreground flex gap-0.5 p-0.5 p-1 pl-3 pr-3';

        const lineSolid = this.#createButton('./icon/line_width_1.png', '', () => {
            this.page.selectControl.control.lineStyle = LineStyle.SOLID;
            this.render();
        });
        lineStyleToolbar.appendChild(lineSolid);

        const lineDash = this.#createButton('./icon/line_dash.png', '', () => {
            this.page.selectControl.control.lineStyle = LineStyle.DASH;
            this.render();
        });
        lineStyleToolbar.appendChild(lineDash);

        return lineStyleToolbar;
    }

    #createLineWidthToolbar() {
        const lineWidthToolbar = document.createElement('div');
        lineWidthToolbar.id = 'line-width';
        lineWidthToolbar.style.left = ToolbarPosition.LINE_WIDTH_LEFT + 'px';
        lineWidthToolbar.style.top = ToolbarPosition.TOOLBAR_TOP + 'px';
        lineWidthToolbar.className = 'hidden absolute pointer-events-auto flex items-center rounded-md border border-slate-200 ' +
            'shadow-sm bg-background bg-slate-100 text-foreground flex gap-0.5 p-0.5 p-1 pl-3 pr-3';

        for (let i = 1; i <= 5; ++i) {
            const lineWidth = this.#createButton('./icon/line_width_1.png', '', () => {
                this.page.selectControl.control.lineWidth = i;
                this.render();
            });
            lineWidthToolbar.appendChild(lineWidth);
        }

        return lineWidthToolbar;
    }

    #createCircleButton(color, clickEvent) {
        const btnWrap = document.createElement('div');
        btnWrap.className = 'relative flex item-center justify-center mr-1 pt-0.5 pb-0.5 rounded-full hover:bg-slate-200';

        const btn = document.createElement('button');
        btn.className = 'w-6 h-6 mt-1 mb-1 ml-2 mr-2 inline-flex items-center justify-center rounded-full';
        btn.style.backgroundColor = color;
        btn.addEventListener('click', clickEvent);
        btnWrap.appendChild(btn);

        return btnWrap;
    }

    #createButton(imgSrc, shortCutKey, clickEvent) {
        const btnWrap = document.createElement('div');
        btnWrap.className = 'relative flex item-center justify-center mr-1';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'w-5 h-5';

        const btn = document.createElement('button');
        btn.className = 'w-8 h-8 inline-flex items-center justify-center rounded hover:bg-slate-200';
        btn.addEventListener('click', clickEvent);

        btn.appendChild(img);
        btnWrap.appendChild(btn);

        if (shortCutKey !== '') {
            img.classList.add('mr-2');

            const shortcutBtn = document.createElement('div');
            shortcutBtn.className = 'w-2 h-3 items-center justify-center absolute right-0 bottom-0 text-[8px] opacity-40';
            shortcutBtn.textContent = shortCutKey;
            btnWrap.appendChild(shortcutBtn);
        }

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

    startDragHandler(handler) {
        ToolbarUtil.getInstance().clear();
        this.eventManager.startDragHandler(handler);
    }

    finishDragHandler() {
        this.eventManager.finishDragHandler();
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