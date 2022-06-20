class SwingingCircle {
    constructor(cell_size, circle_width, circle_radius, index, screen_width, screen_height, color, fluct_freq, phase_start = 0) {
        this.cell_size = cell_size;
        this.circle_width = circle_width;
        this.circle_radius = circle_radius;
        this.index = index;
        this.screen_width = screen_width;
        this.screen_height = screen_height;
        this.color = color;
        this.fluct_freq = fluct_freq;
        this.phase_start = phase_start;
        this.position = new p5.Vector();
        this.circle_center = new p5.Vector();
    }

    create_center_from_col() {
        this.circle_center = new p5.Vector(floor((this.index + 1 / 2) * this.cell_size), floor(this.circle_width / 2) + 10);
    }

    create_center_from_row() {
        this.circle_center = new p5.Vector(floor(this.circle_width / 2) + 10, floor((this.index + 1 / 2) * cell_size));
    }

    update_position(angle) {
        this.position.x = this.circle_center.x + this.circle_radius * cos(angle * this.fluct_freq + this.phase_start);
        this.position.y = this.circle_center.y + this.circle_radius * sin(angle * this.fluct_freq + this.phase_start);
    }

    get_position() {
        return this.position;
    }

    draw(is_grid_shown = false) {
        colorMode(HSB, 400);
        stroke(this.color.x, this.color.y, 200);
        strokeWeight(2);
        drawingContext.setLineDash([0]);
        ellipse(this.circle_center.x, this.circle_center.y, this.circle_width, this.circle_width);

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = color(this.color.x, this.color.y, 400);
        if (is_grid_shown) {
            textSize(24);
            textAlign(CENTER, CENTER);
            fill(this.color.x, this.color.y, 400);
            text("ω=" + this.fluct_freq, this.circle_center.x, this.circle_center.y);
        }
        drawingContext.shadowBlur = 0;
        noFill();

        strokeWeight(10);
        stroke(this.color.x, this.color.y, this.color.z);
        point(this.position.x, this.position.y);
        colorMode(RGB);

    }
}