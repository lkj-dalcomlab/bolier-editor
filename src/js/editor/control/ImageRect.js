import {Rect} from "./Rect.js";

export class ImageRect extends Rect {
    constructor(image) {
        super();
        this._image = image;
    }

    get image() {
        return this._image;
    }

    setPosition(p) {
        super.setPosition(p);
    }

    render(painter) {
        const width = this.rb.x - this.lt.x;
        const height = this.rb.y - this.lt.y;
        painter.drawImage(this._image, this.lt.x, this.lt.y, width, height);
    }
}