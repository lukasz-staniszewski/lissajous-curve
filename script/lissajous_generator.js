let cell_size = 120;
let FPS = 60;
let pixels_per_amp = 17;
let board_width;
let board_height;

let frame_idx = 0;
let period_occured = false;

let speed_step;
let phase_step = 0.05;
let angle = 0;
let phase = 0;
let amp_X;
let amp_Y;
let freq_X;
let freq_Y;
let damping_X;
let damping_Y;
let delta;
let points = [];
let liss_curve;

let slider_amp_X;
let slider_amp_Y;
let slider_freq_X;
let slider_freq_Y;
let slider_damp_X;
let slider_damp_Y;
let slider_delta;
let slider_step;
let cb_rotate;


function clear_points() {
    liss_curve.clear();
    period_occured = false;
    angle = 0;
    frame_idx = 0;
}


function setup() {
    frameRate(FPS);
    board_width = floor(windowWidth * 78 / 100);
    board_height = floor(windowHeight * 57.6 / 100);
    createCanvas(board_width, board_height);
    liss_curve = new LissajousCurve();

    cb_rotate = document.querySelector('#rotate');

    let range_amp_X = document.querySelector('#range_amp_X');
    let value_amp_X = document.querySelector('#value_amp_X');
    slider_amp_X = new Slider(range_amp_X, value_amp_X, { min: 1, max: 20, cur: 10 });
    slider_amp_X.init();

    let range_freq_X = document.querySelector('#range_freq_X');
    let value_freq_X = document.querySelector('#value_freq_X');
    slider_freq_X = new Slider(range_freq_X, value_freq_X, { min: 1, max: 12, cur: 1 });
    slider_freq_X.init();

    let range_damp_X = document.querySelector('#range_damp_X');
    let value_damp_X = document.querySelector('#value_damp_X');
    slider_damp_X = new Slider(range_damp_X, value_damp_X, { min: 0, max: 6, cur: 0 });
    slider_damp_X.init();

    let range_amp_Y = document.querySelector('#range_amp_Y');
    let value_amp_Y = document.querySelector('#value_amp_Y');
    slider_amp_Y = new Slider(range_amp_Y, value_amp_Y, { min: 1, max: 10, cur: 10 });
    slider_amp_Y.init();

    let range_freq_Y = document.querySelector('#range_freq_Y');
    let value_freq_Y = document.querySelector('#value_freq_Y');
    slider_freq_Y = new Slider(range_freq_Y, value_freq_Y, { min: 1, max: 12, cur: 1 });
    slider_freq_Y.init();

    let range_damp_Y = document.querySelector('#range_damp_Y');
    let value_damp_Y = document.querySelector('#value_damp_Y');
    slider_damp_Y = new Slider(range_damp_Y, value_damp_Y, { min: 0, max: 6, cur: 0 });
    slider_damp_Y.init();

    let range_delta = document.querySelector('#range_delta');
    let value_delta = document.querySelector('#value_delta');
    slider_delta = new Slider(range_delta, value_delta, { min: 0, max: 4, cur: 0 });
    slider_delta.init();

    let range_step = document.querySelector('#range_step');
    let value_step = document.querySelector('#value_step');
    slider_step = new Slider(range_step, value_step, { min: 1, max: 9, cur: 8 });
    slider_step.init();

    slider_amp_X.rangeElement.onchange = () => {
        clear_points();
    };

    slider_amp_Y.rangeElement.onchange = () => {
        clear_points();
    };

    slider_freq_X.rangeElement.onchange = () => {
        clear_points();
    };

    slider_freq_Y.rangeElement.onchange = () => {
        clear_points();
    };

    slider_damp_X.rangeElement.onchange = () => {
        clear_points();
    };

    slider_damp_Y.rangeElement.onchange = () => {
        clear_points();
    };

    slider_delta.rangeElement.onchange = () => {
        clear_points();
    };

    slider_step.rangeElement.onchange = () => {
        clear_points();
    };

    cb_rotate.onchange = () => {
        clear_points();
    };
}

function update_params() {
    amp_X = slider_amp_X.rangeElement.value;
    amp_Y = slider_amp_Y.rangeElement.value;
    freq_X = slider_freq_X.rangeElement.value;
    freq_Y = slider_freq_Y.rangeElement.value;
    delta = slider_delta.rangeElement.value;
    speed_step = (10 - slider_step.rangeElement.value) / 100;


    if (delta == 0) {
        slider_delta.valueElement.innerHTML = `${delta}`;
    }
    else if (delta % 2 == 0) {
        slider_delta.valueElement.innerHTML = `${delta / 2} π`;
    }
    else {
        slider_delta.valueElement.innerHTML = `${delta}/2 π`;
    }
    delta = delta * (PI / 2);


    if (slider_damp_X.rangeElement.value > 0) {
        damping_X = 1 / (pow(10, 7 - slider_damp_X.rangeElement.value));
    }
    else {
        damping_X = 0;
    }
    slider_damp_X.valueElement.innerHTML = `${damping_X}`;

    if (slider_damp_Y.rangeElement.value > 0) {
        damping_Y = 1 / (pow(10, 7 - slider_damp_Y.rangeElement.value));
    }
    else {
        damping_Y = 0;
    }
    slider_damp_Y.valueElement.innerHTML = `${damping_Y}`;

    slider_step.valueElement.innerHTML = `${round(TWO_PI / speed_step, 0)}`;
}



function draw() {
    background(9, 5, 28);
    noFill();
    update_params();

    if (cb_rotate.checked) {
        liss_curve = new LissajousCurve();
        damping_x = 0;
        damping_y = 0;
        delta = 0;

        slider_damp_X.rangeElement.value = 0;
        slider_damp_Y.rangeElement.value = 0;
        slider_delta.rangeElement.value = 0;

        slider_damp_X.updateSlider();
        slider_damp_Y.updateSlider();
        slider_delta.updateSlider();

        slider_damp_X.rangeElement.disabled = true;
        slider_damp_Y.rangeElement.disabled = true;
        slider_delta.rangeElement.disabled = true;

        for (let angle = 0; angle <= TWO_PI; angle += speed_step) {
            let x = board_width / 2 + (amp_X * pixels_per_amp) * exp(-damping_X * frame_idx) * sin(sqrt(freq_X * freq_X - damping_X * damping_X) * angle + (-delta + phase));
            let y = board_height / 2 + (amp_Y * pixels_per_amp) * exp(-damping_Y * frame_idx) * sin(sqrt(freq_Y * freq_Y - damping_Y * damping_Y) * angle);
            liss_curve.set_current_x(x);
            liss_curve.set_current_y(y);
            liss_curve.add_current_to_path();
        }
        liss_curve.show_single(false);
        phase += phase_step;
    }
    else {
        let x = board_width / 2 + (amp_X * pixels_per_amp) * exp(-damping_X * frame_idx) * sin(sqrt(freq_X * freq_X - damping_X * damping_X) * angle + delta);
        let y = board_height / 2 + (amp_Y * pixels_per_amp) * exp(-damping_Y * frame_idx) * sin(sqrt(freq_Y * freq_Y - damping_Y * damping_Y) * angle);

        slider_damp_X.rangeElement.disabled = false;
        slider_damp_Y.rangeElement.disabled = false;
        slider_delta.rangeElement.disabled = false;

        stroke(218, 165, 32, 150);
        strokeWeight(5);
        line(board_width * 10 / 100, board_height * 5 / 100, board_width - (board_width * 10 / 100), board_height * 5 / 100);
        line(board_width * 5 / 100, board_height * 10 / 100, board_width * 5 / 100, board_height - (board_height * 10 / 100));
        strokeWeight(16);
        stroke(218, 165, 32);
        point(x, board_height * 5 / 100);
        point(board_width * 5 / 100, y);

        liss_curve.set_current_x(x);
        liss_curve.set_current_y(y);

        if (period_occured) {
            liss_curve.shift_curve();
        }
        liss_curve.add_current_to_path();
        liss_curve.show_single(true);

        if (angle >= TWO_PI) {
            angle = 0;
            period_occured = true;
        }
        else {
            angle += speed_step;
        }
        frame_idx++;
    }
}

