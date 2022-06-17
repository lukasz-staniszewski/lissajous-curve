class Array2D {
    constructor(n_rows, n_columns) {
        this.n_rows = n_rows;
        this.n_columns = n_columns;
        this.data = new Array(n_rows);
        for (let row = 0; row < n_rows; row++) {
            this.data[row] = new Array(n_columns);
        }
    }

    get(row, col) {
        return this.data[row][col];
    }

    set(row, col, value) {
        this.data[row][col] = value;
    }

    clear() {
        for (let row = 1; row < this.n_rows; row++) {
            for (let col = 1; col < this.n_columns; col++) {
                this.data[row][col].clear()
            }
        }
    }
}