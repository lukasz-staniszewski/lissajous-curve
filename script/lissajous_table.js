let cell_size = 110;
let FPS = 60;
let board_width;
let board_height;

let columns;
let rows;
let circle_width;
let circle_height;

let angle;
let speed_step;

let lissajous_curve_table;
let circle_column_array = [];
let circle_row_array = [];

let slider;
let cb_grid;
let cb_freeze;


function draw_grid_line(x_start, y_start, x_end, y_end) {
    stroke(218, 165, 32, 200);
    strokeWeight(1);
    drawingContext.setLineDash([10, 5]);
    line(x_start, y_start, x_end, y_end);
}

function customSlider() {
    let max = range_speed.max;
    let val = (range_speed.value / max) * 100 + "%";
    progress.style.width = val;
    thumb.style.left = val;
}

function setup() {
    frameRate(FPS);

    cb_grid = document.querySelector('#grid');
    cb_freeze = document.querySelector('#freeze');

    let range_step = document.querySelector('#range_step');
    let value_step = document.querySelector('#value_step');
    slider = new Slider(range_step, value_step, { min: 1, max: 9, cur: 8 });
    slider.init();

    board_width = floor(windowWidth * 75 / 100);
    board_height = floor(windowHeight * 76 / 100);

    createCanvas(board_width, board_height);

    angle = 0;
    columns = floor(board_width / cell_size);
    rows = floor(board_height / cell_size);

    // there is 20% of cell space reserved for break between circles
    circle_width = floor(cell_size - 0.15 * cell_size);
    circle_radius = floor(circle_width / 2);


    let odd_numbers = new NumberGenerator(columns - 1, false).generate();
    for (let col = 1; col < columns; col++) {
        let fractial = 1 / 2 + col / (2 * columns);
        let color = new p5.Vector(floor(400 * fractial), floor(400 * fractial), floor(400 * fractial));

        circle_column_array.push(new SwingingCircle(cell_size, circle_width, circle_radius, col, board_width, board_height, color, odd_numbers[col - 1], -PI / 2));
        circle_column_array[col - 1].create_center_from_col();
    }

    let even_numbers = new NumberGenerator(rows - 1, true).generate();
    for (let row = 1; row < rows; row++) {
        let fractial = 1 / 2 + row / (2 * rows);
        let color = new p5.Vector(floor(400 * fractial), 400, 400);

        circle_row_array.push(new SwingingCircle(cell_size, circle_width, circle_radius, row, board_width, board_height, color, even_numbers[row - 1], -PI / 2));
        circle_row_array[row - 1].create_center_from_row();
    }

    lissajous_curve_table = new CurveTable(rows, columns);
    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < columns; col++) {
            lissajous_curve_table.set(row, col, new LissajousCurve(1 / 2 + row / (2 * rows), 1 / 2 + col / (2 * columns)));
        }
    }
}

function draw() {
    background(9, 5, 28);
    noFill();
    speed_step = (10 - slider.rangeElement.value) / 100;
    slider.valueElement.innerHTML = `${round(TWO_PI / speed_step, 0)}`;

    if (angle >= TWO_PI) {
        if (cb_freeze.checked === false) {

            // }
            // else {
            angle = 0;
            lissajous_curve_table.clear();
        }

    }
    else {
        angle += speed_step;
    }

    for (let circle_col of circle_column_array) {
        circle_col.update_position(angle);
        circle_col.draw(cb_grid.checked);
        let circle_pos = circle_col.get_position();
        for (let circle_row of circle_row_array) {
            lissajous_curve_table.get(circle_row.index, circle_col.index).set_current_x(circle_pos.x);
        }
        if (cb_grid.checked) {
            draw_grid_line(circle_col.position.x, 0, circle_col.position.x, board_height);
        }
    }

    for (let circle_row of circle_row_array) {
        circle_row.update_position(angle);
        circle_row.draw(cb_grid.checked);
        let circle_pos = circle_row.get_position();
        for (let circle_col of circle_column_array) {
            lissajous_curve_table.get(circle_row.index, circle_col.index).set_current_y(circle_pos.y);
        }
        if (cb_grid.checked) {
            draw_grid_line(0, circle_row.position.y, board_width, circle_row.position.y);
        }
    }

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < columns; col++) {
            lissajous_curve_table.get(row, col).add_current_to_path();
            lissajous_curve_table.get(row, col).show();
        }
    }
}

