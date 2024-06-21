export class ToolbarUtil {
    constructor() {
        this.lineOptionToolbar = document.getElementById('line-option');
    }
    showLineOptionToolbar() {
        console.log('show line Option');
        this.lineOptionToolbar.classList.remove('hidden');
    }

    hideLineOptionToolbar() {
        console.log('hide line Option');
        this.lineOptionToolbar.classList.add('hidden');
    }
}