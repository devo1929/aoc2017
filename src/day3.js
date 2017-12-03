/* Day 3: Spiral Memory */
const input = 277678;
const directions = {left: 0, up: 1, right: 2, down: 3,};

/**
 * Calculate the largest possible value in a full 2D spiral array at the bottom right corner
 *
 * @param value base
 *
 * @returns {number}
 */
let getMaxValue = (value) => {
    for (let i = 1; ; i += 2) {
        let maxValue = i * i;
        if (maxValue >= value) {
            return maxValue;
        }
    }
};

let getNextPosition = (position, matrix) => {
    switch (position.direction) {
        case directions.right:
            position.x++;
            position.direction = matrix[position.y - 1][position.x] === null ? directions.up : position.direction;
            break;
        case directions.up:
            position.y--;
            position.direction = matrix[position.y][position.x - 1] === null ? directions.left : position.direction;
            break;
        case directions.left:
            position.x--;
            position.direction = matrix[position.y + 1][position.x] === null ? directions.down : position.direction;
            break;
        case directions.down:
            position.y++;
            position.direction = matrix[position.y][position.x + 1] === null ? directions.right : position.direction;
            break;
    }

    return position;
};

/**
 * Creates a 2D array size X size, full of null values
 *
 * @param size the size of the 2D array to create
 *
 * @returns {Array}
 */
let initializeMatrix = (size) => {
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            matrix[i].push(null);
        }
    }
    return matrix;
};

/**
 * Used for part 2, calculate the value of the position at x, y based on the values already calculated around it.
 *
 * @param x coordinate in the 2D array
 * @param y coordinate in the 2D array
 *
 * @returns {number}
 */
let getMatrixValue = (x, y, matrix) => {
    let value = 0;
    for (let _y = Math.max(y - 1, 0); _y <= Math.min(y + 1, matrix.length - 1); _y++) {
        for (let _x = Math.max(x - 1, 0); _x <= Math.min(x + 1, matrix.length - 1); _x++) {
            let _value = matrix[_y][_x]
            if (_value !== null) {
                value += _value;
            }
        }
    }
    return value;
};


/**
 * Part 1:
 *
 * You come across an experimental new kind of memory stored on an infinite two-dimensional grid.
 *
 * Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up
 * while spiraling outward. For example, the first few squares are allocated like this:
 *
 * 17  16  15  14  13
 * 18   5   4   3  12
 * 19   6   1   2  11
 * 20   7   8   9  10
 * 21  22  23---> ...
 *
 * While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1
 * (the location of the only access port for this memory system) by programs that can only move up, down, left,
 * or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.
 *
 * For example:
 *
 * Data from square 1 is carried 0 steps, since it's at the access port.
 * Data from square 12 is carried 3 steps, such as: down, left, left.
 * Data from square 23 is carried only 2 steps: up twice.
 * Data from square 1024 must be carried 31 steps.
 *
 * How many steps are required to carry the data from the square identified in your puzzle input all the way to the
 * access port?
 *
 * Your puzzle answer was 475.
 */
(() => {
    let maxValue = getMaxValue(input);
    let matrixSize = Math.sqrt(maxValue);
    let centerPoint = Math.floor(matrixSize / 2);

    let matrix = initializeMatrix(matrixSize);
    matrix[centerPoint][centerPoint] = 1;
    let position = {
        x: centerPoint,
        y: centerPoint,
        direction: directions.right,
    };

    for (let i = 1; i < input; i++) {
        position = getNextPosition(position, matrix);
        matrix[position.y][position.x] = (i + 1);
    }

    let distance = Math.abs(centerPoint - position.x) + Math.abs(centerPoint - position.y);

    console.log('input:', input, 'distance:', distance);
})();

/**
 * Part 2:
 *
 * As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1.
 * Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares,
 * including diagonals.
 *
 * So, the first few squares' values are chosen as follows:
 *
 * Square 1 starts with the value 1.
 * Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
 * Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
 * Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
 * Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
 * Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:
 *
 * 147  142  133  122   59
 * 304    5    4    2   57
 * 330   10    1    1   54
 * 351   11   23   25   26
 * 362  747  806--->   ...
 *
 * What is the first value written that is larger than your puzzle input?
 *
 * Your puzzle answer was 279138.
 */
(() => {
    let input = 277678;

    let maxValue = getMaxValue(input);
    let matrixSize = Math.sqrt(maxValue);
    let centerPoint = Math.floor(matrixSize / 2);

    let matrix = initializeMatrix(matrixSize);
    matrix[centerPoint][centerPoint] = 1;
    let position = {
        x: centerPoint,
        y: centerPoint,
        direction: directions.right,
    };

    for (let i = 1; i < input; i++) {
        position = getNextPosition(position, matrix);
        matrix[position.y][position.x] = getMatrixValue(position.x, position.y, matrix);
        if (matrix[position.y][position.x] > input) {
            break;
        }
    }

    console.log('input:', input, 'value:', matrix[position.y][position.x]);
})();