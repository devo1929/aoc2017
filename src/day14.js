const input = 'vbqugkhl';
const knotHash = require('./service/knot-hash');

const hashtobin = hash => hash.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');

const createMatrix = (key) => {
    let hashes = [];
    for (let i = 0; i < 128; i++) {
        hashes.push(knotHash.hash(`${key}-${i}`));
    }

    return hashes.map(hashtobin);
};

const matrixValue = (x, y, matrix) => (x < 0 || y < 0 || x > 127 || y > 127) ? 0 : matrix[x][y];
const clearGroup = (x, y, matrix) => {
    if (matrixValue(x, y, matrix) === 0)
        return;

    matrix[x][y] = 0;
    clearGroup(x - 1, y, matrix);
    clearGroup(x + 1, y, matrix);
    clearGroup(x, y - 1, matrix);
    clearGroup(x, y + 1, matrix);
};

((key) => {
    let matrix = createMatrix(key);

    let usedSquares = matrix.reduce((acc, binary) => acc + binary.replace(/0/g, '').length, 0);

    console.log('used squares:', usedSquares);
})(input);

((key) => {
    let matrix = createMatrix(key).map(row => row.split('').map(col => parseInt(col, 10)));

    let groups = 0;
    for (let x = 0; x < 128; x++)
        for (let y = 0; y < 128; y++)
            if (matrixValue(x, y, matrix) === 1) {
                groups++;
                clearGroup(x, y, matrix);
            }
    console.log('number of groups:', groups);
})('vbqugkhl');