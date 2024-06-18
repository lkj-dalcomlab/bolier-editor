export class ControlRender {
    constructor(control) {
        this._control = control;
    }

    get control() {
        return this._control;
    }

    render(painter) {}
}