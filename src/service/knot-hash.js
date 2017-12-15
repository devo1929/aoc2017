const _createList = (size) => {
    let list = [];
    for (let i = 0; i < size; i++) {
        list.push(i);
    }
    return list;
};

const _rotate = (arr, count, reverse) => {
    for (let i = 0; i < count; i++) {
        if (reverse)
            arr.unshift(arr.pop())
        else
            arr.push(arr.shift())
    }
    return arr
};

const _reverse = (list, position, length) => {
    list = _rotate(list, position);
    Array.prototype.splice.apply(list, [0, length].concat(list.slice(0, length).reverse()));
    return _rotate(list, position, true);
};

const _xor = (array) => {
    return array.reduce((acc, cur) => acc ^ cur, 0);
};

const _toHex = (number) => {
    return number.toString(16).padStart(2, '0');
};

const _traverse = (list, lengths, currentPosition = 0, skip = 0) => {
    for (let i = 0; i < lengths.length; i++) {
        list = _reverse(list, currentPosition, lengths[i]);
        currentPosition = (currentPosition + (lengths[i] + skip)) % list.length;
        skip++;
    }
    return {
        list,
        currentPosition,
        skip,
    }
};

module.exports = {
    hash: (string, length) => {
        let list = _createList(256);
        let suffix = [17, 31, 73, 47, 23];
        string = string.split('').map(i => i.charCodeAt(0)).concat(suffix);
        let round = {
            list,
            currentPosition: 0,
            skip: 0,
        };
        for (let j = 0; j < 64; j++) {
            round = _traverse(round.list, string, round.currentPosition, round.skip);
        }
        let hash = '';
        for (let i = 0; i < 16; i++) {
            hash += _toHex(_xor(list.slice(i * 16, (i * 16) + 16)));
        }
        return hash;
    }
};