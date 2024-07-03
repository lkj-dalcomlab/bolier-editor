export class TextEditor {
    static _instance;
    constructor() {
        this._val = '';
        this._width = 0;
        this._height = 0;
        this._position = {x: 0, y:0};
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = this;
            this._input = document.createElement('input');
            this._input.className = 'absolute';
            document.body.appendChild(this._input);
        }
        return this._instance;
    }

    static show(p) {
        this._input.style.top = p.y + 'px';
        this._input.style.left = p.x + 'px';
        this._input.classList.remove('hidden');
    }

    static hide() {
        this._input.classList.add('hidden');
    }

    get val() {
        return this._val;
    }

    set val(value) {
        this._val = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._input.width = value;
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._input.height = value;
        this._height = value;
    }
}