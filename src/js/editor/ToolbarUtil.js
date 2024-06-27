export const ToolbarPosition = {
    TOOLBAR_TOP : -50,
    LINE_WIDTH_LEFT : -30,
    LINE_STYLE_LEFT : 10,
    LINE_COLOR_LEFT : 60,
}
export class ToolbarUtil {
    static instance;
    constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = this;
            this.toolbars = [];
            this.lineOptionToolbar = document.getElementById('line-option');
            this.lineWidthToolbar = document.getElementById('line-width');
            this.lineStyleToolbar = document.getElementById('line-style');
            this.lineColorToolbar = document.getElementById('line-color');
        }
        return this.instance;
    }

    static showLineOptionToolbar(p) {
        this.lineOptionToolbar.classList.remove('hidden');
        this.lineWidthToolbar.classList.add('hidden');
        this.lineStyleToolbar.classList.add('hidden');
        this.lineColorToolbar.classList.add('hidden');
        this.lineOptionToolbar.style.top = p.y + 'px';
        this.lineOptionToolbar.style.left = p.x + 'px';
    }

    static hideLineOptionToolbar() {
        this.lineOptionToolbar.classList.add('hidden');
        this.lineWidthToolbar.classList.add('hidden');
        this.lineStyleToolbar.classList.add('hidden');
        this.lineColorToolbar.classList.add('hidden');
    }

    static showLineWidthToolbar() {
        this.lineWidthToolbar.classList.remove('hidden');
        this.lineStyleToolbar.classList.add('hidden');
        this.lineColorToolbar.classList.add('hidden');
    }

    static showLineStyleToolbar() {
        this.lineStyleToolbar.classList.remove('hidden');
        this.lineWidthToolbar.classList.add('hidden');
        this.lineColorToolbar.classList.add('hidden');
    }

    static showLineColorToolbar() {
        this.lineColorToolbar.classList.remove('hidden');
        this.lineStyleToolbar.classList.add('hidden');
        this.lineWidthToolbar.classList.add('hidden');
        this.#checkTagPosition(this.lineColorToolbar, ToolbarPosition.LINE_COLOR_LEFT);
    }

    static #checkTagPosition(tag, tagLeft) {
        const rect = tag.getBoundingClientRect();
        console.log(window.innerWidth, document.documentElement.clientWidth)
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const gap = rect.right - windowWidth;
        let left = tag.style.left.replace("px", "");
        if (gap >= 0) {
            left = left - gap;
            tag.style.left = left + 'px';
        } else {
            tag.style.left = tagLeft + 'px';
        }
    }

    static clear() {
        this.hideLineOptionToolbar();
    }
}