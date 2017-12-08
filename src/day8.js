/* Day 8: I Heard You Like Registers */
const fs = require('fs');
const _ = require('lodash');

const modifiers = {
    inc: '+',
    dec: '-',
};
const registers = {};

const instructions = fs.readFileSync('./inputs/day8.txt', 'utf-8')
    .split('\n') // split file contents into lines
    .map(line => /(\w+)\s+(\w+)\s+([-\d]+)\s+if\s+(\w+)\s+([><=!]+)\s+([-\d]+)/.exec(line).slice(1))
    .map(r => {
        registers[r[0]] = 0;
        return {register: r[0], modifier: r[1], value: r[2], condRegister: r[3], operator: r[4], condValue: r[5]}
    });

/**
 * Part 1
 *
 * You receive a signal directly from the CPU. Because of your recent assistance with jump instructions, it would like you to
 * compute the result of a series of unusual register instructions.
 *
 *  Each instruction consists of several parts: the register to modify, whether to increase or decrease that register's value,
 *  the amount by which to increase or decrease it, and a condition. If the condition fails, skip the instruction without modifying
 *  the register. The registers all start at 0. The instructions look like this:
 *
 *  b inc 5 if a > 1
 *  a inc 1 if b < 5
 *  c dec -10 if a >= 1
 *  c inc -20 if c == 10
 *  These instructions would be processed as follows:
 *
 *  Because a starts at 0, it is not greater than 1, and so b is not modified.
 *  a is increased by 1 (to 1) because b is less than 5 (it is 0).
 *  c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
 *  c is increased by -20 (to -10) because c is equal to 10.
 *  After this process, the largest value in any register is 1.
 *
 *  You might also encounter <= (less than or equal to) or != (not equal to). However, the CPU doesn't have the bandwidth to tell
 *  you what all the registers are named, and leaves that to you to determine.
 *
 *  What is the largest value in any register after completing the instructions in your puzzle input?
 *
 *  Your puzzle answer was 4448.
 *
 *****************************************************************
 * Part 2
 *
 * To be safe, the CPU also needs to know the highest value held in any register during this process so that it can decide how much
 * memory to allocate to these operations. For example, in the above instructions, the highest value ever held was 10 (in register c
 * after the third instruction was evaluated).
 *
 * Your puzzle answer was 6582.
 */
((instructions) => {
    let maxRegisterValue = 0;
    instructions.forEach(i => {
        if (eval(`${registers[i.condRegister]} ${i.operator} ${i.condValue}`)) {
            registers[i.register] = eval(`${registers[i.register]} ${modifiers[i.modifier]} ${i.value}`);
            if (registers[i.register] > maxRegisterValue) {
                maxRegisterValue = registers[i.register];
            }
        }
    });

    let largestRegisterValue = _.max(Object.values(registers));
    console.log('largest register value:', largestRegisterValue);
    console.log('max register value:', maxRegisterValue);

})(instructions.slice());