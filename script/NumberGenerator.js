class NumberGenerator {
    // class generates only odd or only even numbers
    // note: its a bit awkward but first number is 1 even though even 
    //       numbers are generated - its project purpose to show circle 
    //       for same frequencies

    constructor(n, is_even = true) {
        this.n = n;
        this.is_even = is_even;
    }

    generate() {
        let numbers = [1];
        let number = 1;
        if (this.is_even) {
            number = 2;
        }
        else {
            number = 3;
        }
        while (numbers.length < this.n) {
            numbers.push(number);
            number += 2;
        }
        return numbers;
    }
}