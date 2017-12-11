/* Day 11: Hex Ed */
const fs = require('fs');
const input = fs.readFileSync('./inputs/day11.txt', 'utf-8');

const getDistance = (x, y, z) => {
    return Math.max(Math.abs(-x), Math.abs(-y), Math.abs(-z));
};

/**
 * Part 1
 *
 * Crossing the bridge, you've barely reached the other side of the stream when a program comes up to you, clearly in distress. "It's my child process,"
 * she says, "he's gotten lost in an infinite grid!"
 *
 * Fortunately for her, you have plenty of experience with infinite grids.
 *
 * Unfortunately for you, it's a hex grid.
 *
 * The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the north, northeast, southeast, south, southwest, and northwest:
 *
 * \ n  /
 * nw +--+ ne
 * /    \
 * -+      +-
 * \    /
 * sw +--+ se
 * / s  \
 * You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to reach him. (A "step"
 * means to move from the hex you are in to any adjacent hex.)
 *
 * For example:
 *
 * ne,ne,ne is 3 steps away.
 * ne,ne,sw,sw is 0 steps away (back where you started).
 * ne,ne,s,s is 2 steps away (se,se).
 * se,sw,se,sw,sw is 3 steps away (s,s,sw).
 *
 * Your puzzle answer was 650.
 *
 * ************************************************************************************************
 *
 * Part 2
 *
 * How many steps away is the furthest he ever got from his starting position?
 *
 * Your puzzle answer was 1465.
 */
((input) => {
    let x = 0, y = 0, z = 0, max = 0;
    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case 'ne':
                x++;
                z--;
                break;
            case 'n':
                y++;
                z--;
                break;
            case 'nw':
                x--;
                y++;
                break;
            case 'se':
                x++;
                y--;
                break;
            case 's':
                y--;
                z++;
                break;
            case 'sw':
                x--;
                z++;
                break;
        }
        max = Math.max(getDistance(x, y, z), max)
    }
    console.log('distance:', getDistance(x, y, z));
    console.log('max:', max);

})(input.split(',').slice());