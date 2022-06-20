let cell_size = 120;
let FPS = 60;
let pixels_per_amp = 20;
let board_width;
let board_height;

let slider_amp_X;
let thumb_amp_X;
let progress_amp_X;
let info_amp_X;
let slider_amp_Y;
let thumb_amp_Y;
let progress_amp_Y;
let info_amp_Y;
let slider_freq_X;
let thumb_freq_X;
let progress_freq_X;
let info_freq_X;
let slider_freq_Y;
let thumb_freq_Y;
let progress_freq_Y;
let info_freq_Y;
let slider_damp_X;
let thumb_damp_X;
let progress_damp_X;
let info_damp_X;
let slider_damp_Y;
let thumb_damp_Y;
let progress_damp_Y;
let info_damp_Y;
let slider_delta;
let thumb_delta;
let progress_delta;
let info_delta;

let cb_rotate;

let slider_step;
let thumb_step;
let progress_step;
let info_step;

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
let curve;

function clear_points() {
    curve.clear();
    period_occured = false;
    angle = 0;
    frame_idx = 0;
}

function customSliderAmpX() {
    let max = slider_amp_X.max;
    let val = (slider_amp_X.value / max) * 100 + "%";
    progress_amp_X.style.width = val;
    thumb_amp_X.style.left = val;
}

function customSliderAmpY() {
    let max = slider_amp_Y.max;
    let val = (slider_amp_Y.value / max) * 100 + "%";
    progress_amp_Y.style.width = val;
    thumb_amp_Y.style.left = val;
}

function customSliderFreqX() {
    let max = slider_freq_X.max;
    let val = (slider_freq_X.value / max) * 100 + "%";
    progress_freq_X.style.width = val;
    thumb_freq_X.style.left = val;
}

function customSliderFreqY() {
    let max = slider_freq_Y.max;
    let val = (slider_freq_Y.value / max) * 100 + "%";
    progress_freq_Y.style.width = val;
    thumb_freq_Y.style.left = val;
}


function customSliderDampX() {
    let max = slider_damp_X.max;
    let val = (slider_damp_X.value / max) * 100 + "%";
    progress_damp_X.style.width = val;
    thumb_damp_X.style.left = val;
}

function customSliderDampY() {
    let max = slider_damp_Y.max;
    let val = (slider_damp_Y.value / max) * 100 + "%";
    progress_damp_Y.style.width = val;
    thumb_damp_Y.style.left = val;
}

function customSliderStep() {
    let max = slider_step.max;
    let val = (slider_step.value / max) * 100 + "%";
    progress_step.style.width = val;
    thumb_step.style.left = val;
}

function customSliderDelta() {
    let max = slider_delta.max;
    let val = (slider_delta.value / max) * 100 + "%";
    progress_delta.style.width = val;
    thumb_delta.style.left = val;
}

function setup() {
    frameRate(FPS);
    board_width = floor(windowWidth * 75 / 100);
    board_height = floor(windowHeight * 65 / 100);
    createCanvas(board_width, board_height);
    curve = new LissajousCurve();

    cb_rotate = document.querySelector('#rotate');

    slider_amp_X = document.querySelector('#ampX');
    thumb_amp_X = document.querySelector('#slider_thumb_ampX');
    progress_amp_X = document.querySelector('#progress_ampX');
    info_amp_X = document.querySelector('#ampX_info');

    slider_amp_Y = document.querySelector('#ampY');
    thumb_amp_Y = document.querySelector('#slider_thumb_ampY');
    progress_amp_Y = document.querySelector('#progress_ampY');
    info_amp_Y = document.querySelector('#ampY_info');

    slider_freq_X = document.querySelector('#freqX');
    thumb_freq_X = document.querySelector('#slider_thumb_freqX');
    progress_freq_X = document.querySelector('#progress_freqX');
    info_freq_X = document.querySelector('#freqX_info');

    slider_freq_Y = document.querySelector('#freqY');
    thumb_freq_Y = document.querySelector('#slider_thumb_freqY');
    progress_freq_Y = document.querySelector('#progress_freqY');
    info_freq_Y = document.querySelector('#freqY_info');

    slider_damp_X = document.querySelector('#dampingX');
    thumb_damp_X = document.querySelector('#slider_thumb_dampX');
    progress_damp_X = document.querySelector('#progress_dampX');
    info_damp_X = document.querySelector('#dampingX_info');

    slider_damp_Y = document.querySelector('#dampingY');
    thumb_damp_Y = document.querySelector('#slider_thumb_dampY');
    progress_damp_Y = document.querySelector('#progress_dampY');
    info_damp_Y = document.querySelector('#dampingY_info');

    slider_step = document.querySelector('#angle_step');
    thumb_step = document.querySelector('#slider-thumb');
    progress_step = document.querySelector('#progress');
    info_step = document.querySelector('#speed_info');

    slider_delta = document.querySelector('#delta');
    thumb_delta = document.querySelector('#slider_thumb_delta');
    progress_delta = document.querySelector('#progress_delta');
    info_delta = document.querySelector('#delta_info');

    customSliderAmpX();
    slider_amp_X.addEventListener('input', () => {
        customSliderAmpX()
    });

    customSliderAmpY();
    slider_amp_Y.addEventListener('input', () => {
        customSliderAmpY()
    });

    customSliderFreqX();
    slider_freq_X.addEventListener('input', () => {
        customSliderFreqX()
    });

    customSliderFreqY();
    slider_freq_Y.addEventListener('input', () => {
        customSliderFreqY()
    }
    );

    customSliderDampX();
    slider_damp_X.addEventListener('input', () => {
        customSliderDampX()
    }
    );

    customSliderDampY();
    slider_damp_Y.addEventListener('input', () => {
        customSliderDampY()
    }
    );

    customSliderStep();
    slider_step.addEventListener('input', () => {
        customSliderStep()
    });

    customSliderDelta();
    slider_delta.addEventListener('input', () => {
        customSliderDelta()
    }
    );

    slider_amp_X.onchange = () => {
        clear_points();
    };

    slider_amp_Y.onchange = () => {
        clear_points();
    };

    slider_freq_X.onchange = () => {
        clear_points();
    };

    slider_freq_Y.onchange = () => {
        clear_points();
    };

    slider_damp_X.onchange = () => {
        clear_points();
    };
    slider_damp_Y.onchange = () => {
        clear_points();
    };
    cb_rotate.onchange = () => {
        clear_points();
    };
    slider_step.onchange = () => {
        clear_points();
    };
    slider_delta.onchange = () => {
        clear_points();
    };
}

function update_params() {
    amp_X = slider_amp_X.value;
    amp_Y = slider_amp_Y.value;
    freq_X = slider_freq_X.value;
    freq_Y = slider_freq_Y.value;
    delta = slider_delta.value;

    if (delta == 0) {
        info_delta.innerText = `${delta}`;
    }
    else {
        info_delta.innerText = `${delta}/2 π`;
        delta = delta * (PI / 2);

    }

    if (slider_damp_X.value < 6) {
        damping_X = 1 / (pow(10, slider_damp_X.value));
    }
    else {
        damping_X = 0;
    }
    if (slider_damp_Y.value < 6) {
        damping_Y = 1 / (pow(10, slider_damp_Y.value));
    }
    else {
        damping_Y = 0;
    }

    info_amp_X.innerText = `${round(slider_amp_X.value)}`;
    info_amp_Y.innerText = `${round(slider_amp_Y.value)}`;
    info_freq_X.innerText = `${round(slider_freq_X.value)}`;
    info_freq_Y.innerText = `${round(slider_freq_Y.value)}`;
    info_damp_X.innerText = `${damping_X}`;
    info_damp_Y.innerText = `${damping_Y}`;
}



function draw() {
    background(9, 5, 28);
    noFill();


    speed_step = slider_step.value / 50;
    speed_info.innerText = `${round(TWO_PI / (speed_step), 0)}`;

    update_params();

    if (cb_rotate.checked) {
        curve = new LissajousCurve();
        damping_x = 0;
        damping_y = 0;
        delta = 0;

        slider_damp_X.value = 6;
        slider_damp_Y.value = 6;
        slider_delta.value = 0;

        slider_damp_X.disabled = true;
        slider_damp_Y.disabled = true;
        slider_delta.disabled = true;

        for (let angle = 0; angle <= TWO_PI; angle += speed_step) {
            let x = board_width / 2 + (amp_X * pixels_per_amp) * exp(-damping_X * frame_idx) * sin(sqrt(freq_X * freq_X - damping_X * damping_X) * angle + (-delta + phase));
            let y = board_height / 2 + (amp_Y * pixels_per_amp) * exp(-damping_Y * frame_idx) * sin(sqrt(freq_Y * freq_Y - damping_Y * damping_Y) * angle);
            curve.set_current_x(x);
            curve.set_current_y(y);
            curve.add_current_to_path();
        }
        curve.show_single(false);
        phase += phase_step;
    }
    else {
        let x = board_width / 2 + (amp_X * pixels_per_amp) * exp(-damping_X * frame_idx) * sin(sqrt(freq_X * freq_X - damping_X * damping_X) * angle + delta);
        let y = board_height / 2 + (amp_Y * pixels_per_amp) * exp(-damping_Y * frame_idx) * sin(sqrt(freq_Y * freq_Y - damping_Y * damping_Y) * angle);

        slider_damp_X.disabled = false;
        slider_damp_Y.disabled = false;
        slider_delta.disabled = false;

        stroke(218, 165, 32, 150);
        strokeWeight(5);
        line(board_width * 10 / 100, board_height * 5 / 100, board_width - (board_width * 10 / 100), board_height * 5 / 100);
        line(board_width * 5 / 100, board_height * 10 / 100, board_width * 5 / 100, board_height - (board_height * 10 / 100));
        strokeWeight(16);
        stroke(218, 165, 32);
        point(x, board_height * 5 / 100);
        point(board_width * 5 / 100, y);

        curve.set_current_x(x);
        curve.set_current_y(y);

        if (period_occured) {
            curve.shift_curve();
        }
        curve.add_current_to_path();
        curve.show_single(true);

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

