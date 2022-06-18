class SwingingCircle {
    constructor(cell_size, circle_width, circle_radius, index, screen_width, screen_height, color) {
        this.cell_size = cell_size;
        this.circle_width = circle_width;
        this.circle_radius = circle_radius;
        this.index = index;
        this.screen_width = screen_width;
        this.screen_height = screen_height;
        this.color = color;
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
        this.position.x = this.circle_center.x + this.circle_radius * cos(angle * this.index);
        this.position.y = this.circle_center.y + this.circle_radius * sin(angle * this.index);
    }

    get_position() {
        return this.position;
    }

    draw() {
        colorMode(HSB, 400);
        stroke(this.color.x, this.color.y, 200);
        strokeWeight(2);
        drawingContext.setLineDash([0]);
        ellipse(this.circle_center.x, this.circle_center.y, this.circle_width, this.circle_width);

        strokeWeight(10);
        stroke(this.color.x, this.color.y, this.color.z);
        point(this.position.x, this.position.y);
        colorMode(RGB);

    }
}