const fs = require('fs');
const input = fs.readFileSync('./inputs/day16.txt', 'utf-8')
    .split(',')
    .map(line => /([xsp]{1})(\w+)(?:\/(\w+))*/g.exec(line).slice(1))
    .map(match => {
        return {
            move: match[0],
            a: match[1],
            b: match.length > 2 ? match[2] : null,
        }
    });


const spin = (arr, count) => {
    for (let i = 0; i < count; i++) {
        arr.unshift(arr.pop());
    }
    return arr
};

const exchange = (arr, a, b) => {
    let _a = arr[a];
    arr[a] = arr[b];
    arr[b] = _a;
};

const partner = (arr, a, b) => {
    let _a = arr.indexOf(a);
    let _b = arr.indexOf(b);
    arr[_a] = b;
    arr[_b] = a;
};

let programs = 'abcdefghijklmnop';
let exPrograms = 'abcde';

let dance = (input, programs) => {
    for (let i = 0; i < input.length; i++) {
        let instr = input[i];
        switch (instr.move) {
            case 's':
                spin(programs, parseInt(instr.a, 10));
                break;
            case 'x':
                exchange(programs, parseInt(instr.a, 10), parseInt(instr.b, 10));
                break;
            case 'p':
                partner(programs, instr.a, instr.b);
                break;
        }
    }
    return programs.join('');
};

((input, programs) => {
    let output = dance(input, programs);
    console.log('part 1', output);
})(JSON.parse(JSON.stringify(input)), programs.split(''));

((input, programs) => {
    let original = programs;
    let max = 1000000000;
    let count;
    // find a repeat
    for (let i = 0; i < max; i++) {
        programs = dance(input, programs.split(''));
        if(programs === original) {
            count = max % (i + 1);
            break;
        }
    }
    // start over with the new smaller loop
    programs = original;
    for(let i = 0;  i < count; i++) {
        programs = dance(input, programs.split(''));
    }
    console.log('part 2', programs);
})(JSON.parse(JSON.stringify(input)), programs);