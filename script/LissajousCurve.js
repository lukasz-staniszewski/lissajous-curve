class LissajousCurve {
    constructor() {
        this.current_point = createVector();
        this.curve_path = [];
    }

    clear() {
        this.curve_path = [];
    }

    set_current_x(x) {
        this.current_point.x = x;
    }

    set_current_y(y) {
        this.current_point.y = y;
    }

    add_current_to_path() {
        this.curve_path.push(this.current_point.copy());
    }

    show() {
        strokeWeight(2);
        // stroke(255);
        noFill();
        drawingContext.setLineDash([0]);
        colorMode(HSB, 400);
        beginShape();
        for (let i = 0; i < this.curve_path.length; i++) {
            // stroke(floor(400 * (this.curve_path.length / (TWO_PI / 0.03))), floor(400 * (this.curve_path.length / (TWO_PI / 0.03))), floor(400 * (this.curve_path.length / (TWO_PI / 0.03))));
            stroke(floor(400 * (this.curve_path.length / (TWO_PI / 0.03))), floor(400 * (this.curve_path.length / (TWO_PI / 0.03))), 400);
            let point = this.curve_path[i];
            curveVertex(point.x, point.y);
        }
        endShape();
        colorMode(RGB);

        stroke(218, 165, 32);
        strokeWeight(5);
        point(this.current_point.x, this.current_point.y);

    }
}