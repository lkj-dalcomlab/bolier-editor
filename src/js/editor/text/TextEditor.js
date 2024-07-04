export class TextEditor {
    constructor(editor, label) {
        const canvasRect = editor.canvas.getBoundingClientRect();
        this._p = {x: canvasRect.x, y: canvasRect.y};

        this.#init();
        this._editor = editor;
        this._label = label;
        this._input.value = label.text;
        this._input.style.fontSize = label.fontSize + 'px';
        this._input.fontFamily = 'sans-serif';
        editor.ctx.font = label.fontSize + 'px sans-serif';
        this.#resizeInput();
    }

    #init() {
        const input = document.getElementById('text-editor');
        if (input) {
            this._input = input;
            return;
        }

        this._input = document.createElement('input');
        this._input.id = 'text-editor';
        this._input.className = 'absolute pl-1 bg-transparent focus:border-transparent';
        document.body.appendChild(this._input);
    }

    #resizeInput() {
        this._input.style.width = (this.getInputSize().width + 15) + 'px';
    }

    getInputSize() {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'pre';
        span.style.fontSize = getComputedStyle(this._input).fontSize;
        span.style.fontFamily = getComputedStyle(this._input).fontFamily;
        span.textContent = this._input.value || this._input.placeholder;
        document.body.appendChild(span);
        const width = span.offsetWidth;
        const height = span.offsetHeight;
        document.body.removeChild(span);
        return {width: width, height: height};
    }

    show(p) {
        this._input.style.top = (p.y + this._p.y) + 'px';
        this._input.style.left = (p.x + this._p.x) + 'px';
        this._input.classList.remove('hidden');
        this.update();
        this.focus();
    }

    focus() {
        this._input.focus();
    }

    hide() {
        this._input.classList.add('hidden');
    }

    update() {
        this.#resizeInput();
        // const text = this._input.value;
        // const width = this._editor.ctx.measureText(text).width;
        // this._input.style.width = width + 'px';
        // console.log('input width', width);
    }

    get val() {
        return this._input.value;
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