let cell_size = 115;
let angle = 0;
let columns;
let rows;
let lissajous_curve_table;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    columns = floor(windowWidth / cell_size);
    rows = floor(windowHeight / cell_size);

    lissajous_curve_table = new Array2D(rows, columns);
    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < columns; col++) {
            lissajous_curve_table.set(row, col, new LissajousCurve());
        }
    }

}

function draw() {
    background(0);
    noFill();

    let circle_width = floor(cell_size - 0.2 * cell_size);
    let circle_radius = floor(circle_width / 2);

    for (let col = 1; col < columns; col++) {
        let circle_center_x = (col + 1 / 2) * cell_size;
        let circle_center_y = floor(circle_width / 2) + 10;

        // drawing the circle
        stroke(128);
        strokeWeight(2);
        drawingContext.setLineDash([0]);
        ellipse(circle_center_x, circle_center_y, circle_width, circle_width);

        // using polar coordinates to indicate position on the circle
        let point_x = circle_center_x + circle_radius * cos(angle * 2 * col);
        let point_y = circle_center_y + circle_radius * sin(angle * 2 * col);

        stroke(255);
        strokeWeight(6);
        point(point_x, point_y);

        stroke(218, 165, 32, 128);
        strokeWeight(1);
        drawingContext.setLineDash([10, 5]);
        line(point_x, 0, point_x, windowHeight);

        for (let row = 1; row < rows; row++) {
            lissajous_curve_table.get(row, col).set_current_x(point_x);
        }
    }

    for (let row = 1; row < rows; row++) {
        let circle_center_x = floor(circle_width / 2) + 10;
        let circle_center_y = (row + 1 / 2) * cell_size;

        // drawing the circle
        stroke(128);
        strokeWeight(2);
        drawingContext.setLineDash([0]);
        ellipse(circle_center_x, circle_center_y, circle_width, circle_width);

        // using polar coordinates to indicate position on the circle
        let point_x = circle_center_x + circle_radius * cos(angle * 2 * row);
        let point_y = circle_center_y + circle_radius * sin(angle * 2 * row);

        stroke(255);
        strokeWeight(6);
        point(point_x, point_y);

        stroke(218, 165, 32, 128);
        strokeWeight(1);
        drawingContext.setLineDash([10, 5]);
        line(0, point_y, windowWidth, point_y);

        for (let col = 1; col < columns; col++) {
            lissajous_curve_table.get(row, col).set_current_y(point_y);
        }
    }

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < columns; col++) {
            lissajous_curve_table.get(row, col).add_current_to_path();
            lissajous_curve_table.get(row, col).show();
        }
    }

    if (angle >= TWO_PI) {
        angle = 0;
        lissajous_curve_table.clear();
    }
    else {
        angle += 0.03;
    }

}

