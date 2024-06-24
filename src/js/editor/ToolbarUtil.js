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
        this.#checkTagPosition(this.lineColorToolbar);
    }

    static #checkTagPosition(tag) {
        const rect = tag.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        if (rect.top < 0) {
            console.log('top 범위를 벗어났습니다.');
        } else if (rect.bottom > windowHeight) {
            console.log('bottom 범위를 벗어났습니다.');
        }

        if (rect.left < 0) {
            console.log('left 범위를 벗어났습니다.');
        } else if (rect.right > windowWidth) {
            const gap = rect.right - windowWidth;
            const left = rect.left - gap;
            tag.style.left = left;
            console.log('right[' + gap + ' 범위를 벗어났습니다.');
        }

        const outOfView = (
            rect.top < 0 ||
            rect.left < 0 ||
            rect.bottom > windowHeight ||
            rect.right > windowWidth
        );
    }

    static clear() {
        this.hideLineOptionToolbar();
    }
}