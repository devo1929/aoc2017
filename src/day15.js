const next = (previous, multiplier) => {
    return Math.round((((previous * multiplier) / 2147483647) % 1) * 2147483647);
};

let part1input = [289, 629, 16807, 48271];
let part2input = [289, 629, 16807, 48271];

((a, b, multiplierA, multiplierB) => {
    console.log('part 1');

    let preva = a, prevb = b, maxPairs = 40000000, pairs = 0;
    for (let i = 0; i < maxPairs; i++) {
        preva = next(preva, multiplierA);
        prevb = next(prevb, multiplierB);

        if (preva.toString(2).slice(-16) === prevb.toString(2).slice(-16)) {
            pairs++;
        }
    }

    console.log('pairs:', pairs);


})(...part1input);

((a, b, multiplierA, multiplierB) => {
    console.log('part 2');

    let preva = a, prevb = b, maxPairs = 5000000, pairs = 0;
    for (let i = 0; i < maxPairs; i++) {
        while(preva % 4 !== 0) {
            preva = next(preva, multiplierA);
        }
        while (prevb % 8 !== 0) {
            prevb = next(prevb, multiplierB);
        }

        if (preva.toString(2).slice(-16) === prevb.toString(2).slice(-16)) {
            pairs++;
        }
        preva = next(preva, multiplierA);
        prevb = next(prevb, multiplierB);
    }

    console.log('pairs:', pairs);


})(...part2input);