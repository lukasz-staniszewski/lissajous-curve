class LissajousCurve {
    constructor(fractial_pos_row, fractial_pos_col) {
        this.current_point = createVector();
        this.curve_path = [];
        this.fractial_pos_row = fractial_pos_row;
        this.fractial_pos_col = fractial_pos_col;
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

    shift_curve() {
        this.curve_path.shift();
    }

    show() {
        strokeWeight(3);
        noFill();
        colorMode(HSB, 400);
        drawingContext.setLineDash([0]);
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(floor(400 * this.fractial_pos_row), floor(400 * this.fractial_pos_col), 350);
        stroke(floor(400 * this.fractial_pos_row), floor(400 * this.fractial_pos_col), 400);

        beginShape();
        for (let i = 0; i < this.curve_path.length; i++) {
            let point = this.curve_path[i];
            vertex(point.x, point.y);
        }
        endShape();

        colorMode(RGB);
        drawingContext.shadowBlur = 0;

        stroke(218, 165, 32);
        strokeWeight(8);
        point(this.current_point.x, this.current_point.y);
    }

    show_single(show_point) {
        stroke(218, 165, 32, 200);
        strokeWeight(4);

        colorMode(HSB, 400);
        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(floor(400 / 2), floor(400 / 2), 350);
        stroke(floor(400 / 2), floor(400 / 2), 400);

        beginShape();
        for (let pt of this.curve_path) {
            vertex(pt.x, pt.y);
        }
        endShape();

        colorMode(RGB);
        drawingContext.shadowBlur = 0;

        if (show_point) {
            stroke(218, 165, 32, 200);
            strokeWeight(12);
            point(this.current_point.x, this.current_point.y);
        }

    }
}